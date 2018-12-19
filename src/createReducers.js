import { combineReducers } from 'redux';
import { isType } from './utils';
import { NAMESPACE_SEP } from './constants';

/**
 * 创建 reducer
 * @param {Array} models model 列表
 */
export default function createReducers(models = []) {
  // 已经定义的 namespace
  const existentNamespace = {};
  // 根 reducers
  const rootReducers = {};

  for (let model of models) {
    const { namespace, reducers = {}, state: modelInitState = null } = model;
    // 该 model 的 reducers
    const modelReducers = [];

    // 检测 namespace 是否有定义
    if (!namespace) {
      throw new Error('namespace 未定义或为空字符串.');
    }

    // 检测 namespace 是否重复定义(必须全局唯一)
    if (existentNamespace[namespace]) {
      throw new Error(`namespace: ${namespace} 重复定义.`);
    }

    // 检查 reducers 类型
    if (!isType(reducers, 'Object')) {
      throw new Error(`reducers 数据类型必须为对象.`);
    }

    // 获取定义的 reducer
    Object.keys(reducers).forEach(name => {
      const reducerName = `${namespace}${NAMESPACE_SEP}${name}`;
      const reducer = reducers[name];
      modelReducers.push({
        type: reducerName,
        reducer,
      });
    });

    // 生成该 model 的 根 reducer
    const modelRootReducer = (state = modelInitState, action) => {
      return modelReducers.reduce((prevState, { type, reducer }) => {
        if (action.type === type) {
          return reducer(prevState, action);
        } else {
          return prevState;
        }
      }, state);
    };

    rootReducers[namespace] = modelRootReducer;
  }

  return combineReducers(rootReducers);
}
