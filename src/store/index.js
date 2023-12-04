import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import alert from "./alert";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors: false,
    search: "",
    page: 1,
    off_page: 1,
    token: null,
  },

  getters: {
    errors: (state) => {
      return state.errors;
    },
    getSearch(state) {
      return state.search;
    },
    getPage(state) {
      return state.page;
    },
    getOffPage(state) {
      return state.off_page;
    },
  },

  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  modules: {
    auth,
    alert,
  },
});
