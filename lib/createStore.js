"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStore;

var _redux = require("redux");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _createReducers = _interopRequireDefault(require("./createReducers"));

var _createSagas = _interopRequireDefault(require("./createSagas"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * 创建 redux store
 * @param {Array} models model 列表
 * @param {Object} initState 初始 state
 * @param {Object} config 配置
 * @param {Array} config.middlewares 中间件
 * @param {Array} config.enhancers 增强器
 * @param {Boolean} config.enableDevTools 是否在开发环境下使用 redux 浏览器开发者工具
 */
function createStore() {
  var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var initState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // 参数检查
  if (!(0, _utils.isType)(models, 'Array')) {
    throw new Error('createStore 的 models 参数类型必须为数组(Array).');
  }

  if (!(0, _utils.isType)(initState, 'Object')) {
    throw new Error('createStore 的 initState 参数类型必须为对象(Object).');
  }

  if (!(0, _utils.isType)(config, 'Object')) {
    throw new Error('createStore 的 config 参数类型必须为对象(Object).');
  }

  var sagaMiddleware = (0, _reduxSaga.default)();
  var enableDevTools = config.enableDevTools === false ? false : true;
  var composeEnhancers = enableDevTools ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose : _redux.compose; // reducer

  var reducer = (0, _createReducers.default)(models); // sagas

  var saga = (0, _createSagas.default)(models); // 中间件

  var middlewares = [].concat([sagaMiddleware], (0, _utils.isType)(config.middlewares, 'Array') ? config.middlewares : []); // 增强器

  var enhancers = [].concat((0, _utils.isType)(config.enhancers, 'Array') ? config.enhancers : []);
  var composedEnhancers = composeEnhancers.apply(void 0, [_redux.applyMiddleware.apply(void 0, _toConsumableArray(middlewares))].concat(_toConsumableArray(enhancers)));
  var store = (0, _redux.createStore)(reducer, initState, composedEnhancers);
  sagaMiddleware.run(saga);
  return store;
}