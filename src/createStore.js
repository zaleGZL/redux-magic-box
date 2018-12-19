import { createStore as storeCreator, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducers from './createReducers';
import createSagas from './createSagas';
import { isType } from './utils';

/**
 * 创建 redux store
 * @param {Array} models model 列表
 * @param {Object} initState 初始 state
 * @param {Object} config 配置
 * @param {Array} config.middlewares 中间件
 * @param {Array} config.enhancers 增强器
 * @param {Boolean} config.enableDevToolsInDev 是否在开发环境下使用 redux 浏览器开发者工具
 * @param {Boolean} config.enableDevToolsInProd 是否在生产环境下使用 redux 浏览器开发者工具
 */
export default function createStore(models = [], initState = {}, config = {}) {
  // 参数检查
  if (!isType(models, 'Array')) {
    throw new Error('createStore 的 models 参数类型必须为数组(Array).');
  }
  if (!isType(initState, 'Object')) {
    throw new Error('createStore 的 initState 参数类型必须为对象(Object).');
  }
  if (!isType(config, 'Object')) {
    throw new Error('createStore 的 config 参数类型必须为对象(Object).');
  }

  const sagaMiddleware = createSagaMiddleware();
  let composeEnhancers = compose;
  const enableDevToolsInDev =
    config.enableDevToolsInDev === false ? false : true;
  const enableDevToolsInProd =
    config.enableDevToolsInProd === true ? true : false;

  if (process.env.NODE_ENV === `development`) {
    if (enableDevToolsInDev) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }
  } else {
    if (enableDevToolsInProd) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }
  }

  // reducer
  const reducer = createReducers(models);
  // sagas
  const saga = createSagas(models);
  // 中间件
  const middlewares = [].concat(
    [sagaMiddleware],
    isType(config.middlewares, 'Array') ? config.middlewares : []
  );
  // 增强器
  const enhancers = [].concat(
    isType(config.enhancers, 'Array') ? config.enhancers : []
  );

  const composedEnhancers = composeEnhancers(
    applyMiddleware(...middlewares),
    ...enhancers
  );

  const store = storeCreator(reducer, initState, composedEnhancers);

  sagaMiddleware.run(saga);

  return store;
}
