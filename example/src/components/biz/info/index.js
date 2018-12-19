import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';

class Info extends React.PureComponent {
  render() {
    const { info, dispatch } = this.props;
    const { name, age } = info;
    return (
      <div className="info">
        <h3>info</h3>
        <div>
          <h5>name: {name}</h5>
          <input
            onChange={event => {
              dispatch({
                type: 'info/setName',
                payload: { name: event.target.value },
              });
            }}
          />
        </div>
        <div>
          <h5>age: {age}</h5>
          <input
            onChange={event => {
              dispatch({
                type: 'info/setAge',
                payload: { age: Number(event.target.value) },
              });
            }}
          />
        </div>
      </div>
    );
  }
}

Info.propTypes = {
  info: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Info.defaultProps = {};

const mapStateToProps = state => {
  return {
    info: state.info,
  };
};

export default connect(mapStateToProps)(Info);
