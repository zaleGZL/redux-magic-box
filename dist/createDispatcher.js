"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDispatcher;
exports.actionCreator = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 创建 action
 * @param {String} type action 类型
 * @param {*} payload 数据载体
 * @param {*} meta 元信息
 * @param {Object} data 其它数据
 */
var actionCreator = function actionCreator(type, payload, meta) {
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var action = _objectSpread({
    type: type,
    payload: payload
  }, data);

  if (payload instanceof Error) {
    action.error = true;
  }

  if (meta) {
    action.meta = meta;
  }

  return action;
};
/**
 * dispatch 创建器
 * @param {Function} dispatch redux 的 dispatch
 */


exports.actionCreator = actionCreator;

function createDispatcher(dispatch) {
  return function (type, payload) {
    var returnPromise = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var meta = arguments.length > 3 ? arguments[3] : undefined;

    if (!returnPromise) {
      dispatch(actionCreator(type, payload, meta));
    } else {
      return new Promise(function (resolve, reject) {
        dispatch(actionCreator(type, payload, meta, {
          resolve: resolve,
          reject: reject
        }));
      });
    }
  };
}