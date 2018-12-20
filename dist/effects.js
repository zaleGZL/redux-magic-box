"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxSaga = require("redux-saga");

var _createDispatcher = require("./createDispatcher");

var sagaEffects = _interopRequireWildcard(require("redux-saga/effects"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 简易版触发 action
 * @param {String} type action 类型
 * @param {*} payload 数据载体
 * @param {*} meta 元信息
 * @param {Object} data 其它数据
 */
var dispatch = function dispatch(type, payload, meta, data) {
  var action = (0, _createDispatcher.actionCreator)(type, payload, meta, data);
  return sagaEffects.put(action);
};

var _default = _objectSpread({
  delay: _reduxSaga.delay,
  CANCEL: _reduxSaga.CANCEL,
  detach: _reduxSaga.detach
}, sagaEffects, {
  dispatch: dispatch
});

exports.default = _default;