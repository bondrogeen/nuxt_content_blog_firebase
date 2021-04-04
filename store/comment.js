export default {
  state: () => ({
    comments: {}
  }),
  mutations: {
    SET_COMMENTS (state, comments) {
      state.comments = comments
    },
    ADD_COMMENT (state, { key, comments }) {
      state.comments = { ...state.comments, ...{ [key]: comments } }
    },
    UPDATE_COMMENT (state, { key, value }) {
      state.comments[key].verified = value
      state.comments = { ...state.comments }
    },
    REMOVE_COMMENT (state, { key }) {
      delete state.comments[key]
      state.comments = { ...state.comments }
    }
  },
  actions: {
    async send ({ commit, dispatch, rootState }, { comment, reply, title }) {
      try {
        const user = rootState.auth.user
        const data = {
          name: user.name,
          uid: user.uid,
          timestamp: { '.sv': 'timestamp' },
          avatar: (user.avatar || '/img/avatar-0.png'),
          title,
          comment,
          reply
        }
        if (user.verified || user.admin) { data.verified = true }
        const key = this.$fire.database.ref('comments/').push().key
        const status = await this.$fire.database.ref(`comments/${key}`).update(data)
        data.timestamp = +new Date()
        if (user.verified || user.admin) { commit('comment/ADD_COMMENT', { key, comments: data }, { root: true }) }
        dispatch('message/setMessage', { message: 'Comment sent' }, { root: true })
        return status
      } catch (error) {
        dispatch('message/setMessage', error, { root: true })
      }
    },
    async approved ({ commit, dispatch }, { key, value }) {
      try {
        const status = await this.$fire.database.ref(`comments/${key}/`).child('verified').set(value)
        commit('comment/UPDATE_COMMENT', { key, value }, { root: true })
        dispatch('message/setMessage', { message: 'Comment approved' }, { root: true })
        return status
      } catch (error) {
        dispatch('message/setMessage', error, { root: true })
      }
    },
    async remove ({ commit, dispatch }, { key }) {
      try {
        const status = await this.$fire.database.ref(`comments/${key}/`).remove()
        commit('comment/REMOVE_COMMENT', { key }, { root: true })
        dispatch('message/setMessage', { message: 'Comment has been deleted' }, { root: true })
        return status
      } catch (error) {
        dispatch('message/setMessage', error, { root: true })
      }
    },
    async get ({ commit, dispatch, rootState }, { title }) {
      try {
        commit('comment/SET_COMMENTS', {}, { root: true })
        const snapshot = await this.$fire.database.ref('comments/').orderByChild('title').equalTo(title).once('value')
        if (snapshot.exists()) {
          const result = {}
          snapshot.forEach((comment) => {
            const key = comment.key
            const value = comment.val()
            if (value.verified || rootState.auth.user.admin) {
              result[key] = value
            }
          })
          commit('comment/SET_COMMENTS', result, { root: true })
        }
        return true
      } catch (error) {
        dispatch('message/setMessage', { error }, { root: true })
      }
    },
    async getAll ({ commit, dispatch }) {
      try {
        commit('comment/SET_COMMENTS', {}, { root: true })
        const comments = await this.$fire.database.ref('comments/').get()
        commit('comment/SET_COMMENTS', comments.val(), { root: true })
        return true
      } catch (error) {
        dispatch('message/setMessage', { error }, { root: true })
      }
    }
  },
  getters: {
    getComments: (state) => {
      return state.comments
    }
  }
}
