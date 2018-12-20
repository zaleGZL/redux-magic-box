import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createDispatcher } from 'redux-magic-box';

import './style.css';

class Todo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '', // 用户输入的值
    };
    this.action = createDispatcher(props.dispatch);
  }

  render() {
    const { action } = this;
    const { todo, dispatch } = this.props;
    const { value } = this.state;
    const { list } = todo;

    return (
      <div className="todo">
        <h3>Todo</h3>
        <div>
          <input
            value={value}
            onChange={event => {
              this.setState({ value: event.target.value });
            }}
          />{' '}
          <button
            onClick={() => {
              value && action('todo/add', { todo: value }); // equal to next line
              // value && dispatch({ type: 'todo/add', payload: { todo: value } });
            }}
          >
            add
          </button>{' '}
          <button
            onClick={() => {
              value &&
                dispatch({
                  type: 'todo/throttleAdd',
                  payload: { todo: value },
                });
            }}
          >
            throttle 6s add
          </button>{' '}
          <button
            onClick={() => {
              value &&
                dispatch({
                  type: 'todo/latestAdd',
                  payload: { todo: value },
                });
            }}
          >
            use latest add (5s)
          </button>{' '}
          <button
            onClick={() => {
              dispatch({ type: 'todo/clearAll' });
            }}
          >
            clear all
          </button>{' '}
          <button
            onClick={() => {
              dispatch({ type: 'todo/addAndThrowError' });
            }}
          >
            add and throw error(redux-magic-box catch)
          </button>{' '}
          <button
            onClick={() => {
              dispatch({ type: 'todo/addAndCatchError' });
            }}
          >
            add and throw error(use catch)
          </button>{' '}
          <button
            onClick={() => {
              value &&
                action('todo/addWithPromise', { todo: value }, true).then(() => {
                  console.log('addWithPromise success');
                });
            }}
          >
            add with promise
          </button>{' '}
        </div>
        <ul>
          {list.map((item, index) => {
            return (
              <li key={index}>
                {item}{' '}
                <span
                  className="todo__delete-description"
                  onClick={() => {
                    dispatch({ type: 'todo/delete', payload: { index } });
                  }}
                >
                  delete
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Todo.defaultProps = {};

const mapStateToProps = state => {
  return {
    todo: state.todo,
  };
};

export default connect(mapStateToProps)(Todo);
