import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';

class Todo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '', // 用户输入的值
    };
  }

  render() {
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
          />
          <button
            onClick={() => {
              value && dispatch({ type: 'todo/add', payload: { todo: value } });
            }}
          >
            add
          </button>
          <button
            onClick={() => {
              value &&
                dispatch({
                  type: 'todo/throttleAdd',
                  payload: { todo: value },
                });
            }}
          >
            throttle 3s add
          </button>
        </div>
        <ul>
          {list.map((item, index) => {
            return <li key={index}>{item}</li>;
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
