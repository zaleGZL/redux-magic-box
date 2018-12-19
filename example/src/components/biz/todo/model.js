export default {
  namespace: "todo",
  state: {
    list: []
  },
  reducers: {
    // add todo
    add: (state, { payload }) => {
      return {
        ...state,
        list: [].concat(state.list, payload.todo)
      };
    },
    // delete todo
    delete: (state, { payload }) => {
      const list = state.list.slice();
      list.splice(payload.index, 1);
      return {
        ...state,
        list
      };
    },
    clearAll: state => {
      return {
        ...state,
        list: []
      };
    }
  },
  effects: {
    // throttle add todo (6000ms)
    throttleAdd: [
      function*(action, { put }) {
        yield put({ type: "todo/add", payload: action.payload });
      },
      { type: "throttle", throttleTime: 6000 }
    ],
    latestAdd: [
      function*(action, { delay, call, put }) {
        yield call(delay, 5000);
        yield put({ type: "todo/add", payload: action.payload });
      },
      { type: "takeLatest" }
    ],
    addWatcher: [
      function*({ take, put }) {
        while (true) {
          yield take("todo/add");
          yield take("todo/add");
          yield take("todo/add");
          yield put({
            type: "todo/add",
            payload: { todo: "watcher auto add(per add three times todo)" }
          });
        }
      },
      { type: "watcher" }
    ]
  }
};
