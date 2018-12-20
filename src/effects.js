import { delay, CANCEL, detach } from 'redux-saga';
import { actionCreator } from './createDispatcher';
import * as sagaEffects from 'redux-saga/effects';

/**
 * 简易版触发 action
 * @param {String} type action 类型
 * @param {*} payload 数据载体
 * @param {*} meta 元信息
 * @param {Object} data 其它数据
 */
const dispatch = (type, payload, meta, data) => {
  const action = actionCreator(type, payload, meta, data);
  return sagaEffects.put(action);
};

export default {
  delay,
  CANCEL,
  detach,
  ...sagaEffects,
  dispatch,
};
