export default {
  namespace: 'todo',
  state: {
    list: [],
  },
  reducers: {
    add: (state, { payload }) => {
      return {
        ...state,
        list: [].concat(state.list, payload.todo),
      };
    },
  },
  effects: {
    throttleAdd: [
      function*(action, { put }) {
        yield put({ type: 'todo/add', payload: action.payload });
      },
      { type: 'throttle', throttleTime: 6000 },
    ],
  },
};
