export default {
  state: () => ({
    ratings: {}
  }),
  mutations: {
    SET_RATINGS (state, ratings) {
      state.ratings = ratings
    },
    SET_RATING (state, { uid, value }) {
      state.ratings[uid] = value
      state.ratings = { ...state.ratings }
    }
  },
  actions: {
    send ({ commit, dispatch, rootState }, { title, value }) {
      const { uid } = rootState.auth.user
      if (!uid) {
        dispatch('message/setMessage', { error: 'You need login' }, { root: true })
        return
      }
      this.$fire.database.ref(`ratings/${title}/${uid}`).set(value)
        .then(() => {
          dispatch('message/setMessage', { message: 'Voice accepted' }, { root: true })
          commit('rating/SET_RATING', { uid, value }, { root: true })
        })
        .catch((error) => {
          dispatch('message/setMessage', { error: error.message }, { root: true })
        })
    },
    async get ({ commit, dispatch }, { title }) {
      commit('rating/SET_RATINGS', {}, { root: true })
      await this.$fire.database.ref(`/ratings/${title}`).once('value').then(function (snapshot) {
        if (snapshot.exists()) {
          const ratings = snapshot.val()
          commit('rating/SET_RATINGS', ratings, { root: true })
        }
      }).catch(function (error) {
        dispatch('message/setMessage', { error }, { root: true })
      })
    }
  },
  getters: {
    getUserRating: state => ({ uid }) => {
      return state.ratings[uid] || 0
    },
    getTotalRating: (state) => {
      return Object.keys(state.ratings).length
    },
    getSumRating: (state) => {
      const sum = Object.values(state.ratings).reduce((sum, value) => {
        return sum + value
      }, 0)
      return sum ? (sum / Object.keys(state.ratings).length) : 0
    }
  }
}
