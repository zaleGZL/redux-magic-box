/**
 * 创建 action
 * @param {String} type action 类型
 * @param {*} payload 数据载体
 * @param {*} meta 元信息
 * @param {Object} data 其它数据
 */
export const actionCreator = (type, payload, meta, data = {}) => {
  const action = { type, payload, ...data };
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
export default function createDispatcher(dispatch) {
  return (type, payload, returnPromise = false, meta) => {
    if (!returnPromise) {
      dispatch(actionCreator(type, payload, meta));
    } else {
      return new Promise((resolve, reject) => {
        dispatch(actionCreator(type, payload, meta, { resolve, reject }));
      });
    }
  };
}
