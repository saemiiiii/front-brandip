export default {
  namespaced: true,

  state: {
    active: false,
    message: "",
    type: "",
  },

  getters: {
    alertActive(state) {
      return state.active;
    },

    alertMessage(state) {
      return state.message;
    },

    alertType(state) {
      return state.type;
    },
  },

  mutations: {
    showAlertMsg(state, payload) {
      state.message = payload.message;
      state.type = payload.type;
      state.active = true;

      setTimeout(() => {
        state.message = "";
        state.type = "";
        state.active = false;
      }, 2500);
    },

    closeAlertMsg(state) {
      state.message = "";
      state.type = "";
      state.active = false;
    },
  },
};
