export default {
  namespace: 'todo',
  state: {
    list: [],
  },
  reducers: {
    // add todo
    add: (state, { payload }) => {
      return {
        ...state,
        list: [].concat(state.list, payload.todo),
      };
    },
    // delete todo
    delete: (state, { payload }) => {
      const list = state.list.slice();
      list.splice(payload.index, 1);
      return {
        ...state,
        list,
      };
    },
    clearAll: state => {
      return {
        ...state,
        list: [],
      };
    },
  },
  effects: {
    // throttle add todo (6000ms)
    throttleAdd: [
      function*(action, { put }) {
        yield put({ type: 'todo/add', payload: action.payload });
      },
      { type: 'throttle', throttleTime: 6000 },
    ],
    latestAdd: [
      function*(action, { delay, call, put }) {
        yield call(delay, 5000);
        yield put({ type: 'todo/add', payload: action.payload });
      },
      { type: 'takeLatest' },
    ],
    addWatcher: [
      function*({ take, put }) {
        while (true) {
          yield take('todo/add');
          yield take('todo/add');
          yield take('todo/add');
          yield put({
            type: 'todo/add',
            payload: { todo: 'watcher auto add(per add three times todo)' },
          });
        }
      },
      { type: 'watcher' },
    ],
    *addAndThrowError(action, { put }) {
      yield put({
        type: 'todo/add',
        payload: {
          todo:
            'the console has a error message(the redux-magic-box catch the error)',
        },
      });
      throw new Error('I throw error');
    },
    *addAndCatchError(action, { put }) {
      try {
        throw new Error('I throw error');
      } catch (error) {
        yield put({
          type: 'todo/add',
          payload: {
            todo: 'the console has a error message(use catch the error)',
          },
        });
        console.log(error);
      }
    },
    *addWithPromise(action, { dispatch }) {
      yield dispatch('todo/add', { todo: 'addWithPromise' }); // equal to next line
      // yield put({ type: 'todo/add', payload: { todo: 'addWithPromise' } });
      action.resolve && action.resolve();
    },
  },
};
