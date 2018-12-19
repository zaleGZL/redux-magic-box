"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isType = void 0;

/**
 * 使用 Object.prototype.toString 方法判断变量的类型
 * @param {*} value 变量的值
 * @param {String} type 期望的类型
 */
var isType = function isType(value, type) {
  return Object.prototype.toString.call(value) === "[object ".concat(type, "]");
};

exports.isType = isType;