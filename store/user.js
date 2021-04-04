export default {
  state: () => ({
    users: {}
  }),
  mutations: {
    SET_USERS (state, users) {
      state.users = users
    },
    UPDATE_USER (state, { uid, key, value }) {
      state.users[uid][key] = value
      state.users = { ...state.users }
    }
  },
  actions: {
    async right ({ commit, dispatch }, { uid, key, value }) {
      try {
        const status = await this.$fire.database.ref(`users/${uid}/`).child(key).set(value)
        commit('user/UPDATE_USER', { uid, key, value }, { root: true })
        dispatch('message/setMessage', { message: 'Rights changed' }, { root: true })
        return status
      } catch (error) {
        dispatch('message/setMessage', { error: error.message }, { root: true })
      }
    },
    async refresh ({ commit, dispatch }) {
      try {
        const snapshot = await this.$fire.database.ref('/users').once('value')
        commit('user/SET_USERS', {}, { root: true })
        if (snapshot.exists()) {
          const data = snapshot.val()
          commit('user/SET_USERS', data, { root: true })
        }
        return snapshot
      } catch (error) {
        dispatch('message/setMessage', { error }, { root: true })
      }
    }
  },
  getters: {
    getUsers: (state) => {
      return state.users
    },
    length (state) {
      return Object.keys(state.users).length
    }
  }
}
