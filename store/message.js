export default {
  state: () => ({
    color: 'primary',
    snackbar: false,
    message: ''
  }),
  mutations: {
    SET_COLOR (state, color) {
      state.color = color
    },
    SET_MESSAGE (state, message) {
      state.message = message
    },
    SET_SNACKBAR (state, value) {
      state.snackbar = value
    }
  },
  actions: {
    setMessage ({ commit }, { error, message }) {
      commit('message/SET_COLOR', error ? 'red lighten-2' : 'primary lighten-1', { root: true })
      commit('message/SET_MESSAGE', error || message, { root: true })
      commit('message/SET_SNACKBAR', true, { root: true })
    },
    setSnackbar ({ commit }, value) {
      commit('message/SET_SNACKBAR', value, { root: true })
    }
  },
  getters: {
    getMessage: state => state.message,
    getSnackbar: state => state.snackbar,
    getColor: state => state.color
  }
}
