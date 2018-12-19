export default {
  namespace: 'info',
  state: {},
  reducers: {
    setName: (state, { payload: { name } }) => {
      return {
        ...state,
        name,
      };
    },
    setAge: (state, { payload: { age } }) => {
      return {
        ...state,
        age,
      };
    },
  },
};
