export default {
  state: () => ({
    drawerMenu: false
  }),
  mutations: {
    SET_DRAWER_MENU (state, value) {
      state.drawerMenu = value
    }
  },
  actions: {
    setDrawerMenu ({ commit, state }, value) {
      commit('settings/SET_DRAWER_MENU', value, { root: true })
    }
  },
  getters: {
    getDrawerMenu: state => state.drawerMenu
  }
}
