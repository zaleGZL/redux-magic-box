/**
 * 使用 Object.prototype.toString 方法判断变量的类型
 * @param {*} value 变量的值
 * @param {String} type 期望的类型
 */
export const isType = (value, type) => {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
};
