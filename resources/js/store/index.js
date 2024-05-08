// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      token: null,
      user: null,
    };
  },
  mutations: {
    initStore(state) {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      state.user = storedUser ? JSON.parse(storedUser) : null;
      state.token = storedToken ? JSON.parse(storedToken) : null;
    },
    login(state, data) {
      state.user = data.user;
      state.token = data.token;
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', JSON.stringify(state.token));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getLoginState: (state) => (state.user != null),
  }
});

export default store;
