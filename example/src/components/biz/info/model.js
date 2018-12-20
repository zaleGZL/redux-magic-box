export default {
  namespace: 'info',
  state: {},
  reducers: {
    setName: (state, { payload: { name } }) => {
      state.name = name;
    },
    setAge: (state, { payload: { age } }) => {
      state.age = age;
    },
  },
};
