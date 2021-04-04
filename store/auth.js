export default {
  state: () => ({
    user: {}
  }),
  mutations: {
    SET_USER (state, user) {
      state.user = user ? { ...state.user, ...user } : {}
    }
  },
  actions: {
    async register ({ commit, dispatch }, { email, password, name }) {
      try {
        const { user } = await this.$fire.auth.createUserWithEmailAndPassword(email, password)
        const newUser = { name, email, uid: user.uid, create: { '.sv': 'timestamp' } }
        await this.$fire.database.ref(`users/${user.uid}/`).update(newUser)
        return true
      } catch (error) {
        dispatch('message/setMessage', { error: error.message }, { root: true })
        return false
      }
    },
    async login ({ commit, dispatch }, { email, password }) {
      try {
        return await this.$fire.auth.signInWithEmailAndPassword(email, password)
      } catch (error) {
        dispatch('message/setMessage', { error: 'Incorrect email or password' }, { root: true })
        return false
      }
    },
    async resetPass ({ commit, dispatch }, { email }) {
      try {
        const status = await this.$fire.auth.sendPasswordResetEmail(email)
        dispatch('message/setMessage', { message: 'Request sent, check your mail' }, { root: true })
        return status
      } catch (error) {
        dispatch('message/setMessage', { error: 'Invalid email' }, { root: true })
      }
    },
    async logout ({ commit }) {
      await this.$fire.auth.signOut()
    },
    async update ({ commit, dispatch }, { uid, image, user }) {
      try {
        if (image.name) {
          const snapshot = await this.$fire.storage.ref().child('images').child(`avatars/${uid}.${image.name.split('.').pop()}`).put(image)
          const url = await snapshot.ref.getDownloadURL()
          user.avatar = url
        }
        const status = await this.$fire.database.ref(`users/${uid}`).update(user)
        commit('auth/SET_USER', user, { root: true })
        dispatch('message/setMessage', { message: 'Profile changed' }, { root: true })
        return status
      } catch (error) {
        dispatch('message/setMessage', { error: error.message }, { root: true })
      }
    },
    onAuthStateChanged ({ commit, dispatch }, { authUser }) {
      if (!authUser) {
        commit('auth/SET_USER', null, { root: true })
        return
      }
      this.$fire.database.ref(`/users/${authUser.uid}`).get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            const user = snapshot.val()
            commit('auth/SET_USER', user, { root: true })
            this.$fire.database.ref(`/users/${authUser.uid}`).update({ lastLogin: { '.sv': 'timestamp' } })
          } else {
            dispatch('message/setMessage', { error: 'The user is not in the database' }, { root: true })
          }
        })
        .catch((error) => {
          dispatch('message/setMessage', { error: error.message }, { root: true })
        })
    }
  },
  getters: {
    getUser: state => state.user,
    getFullName: state => `${state.user.name || ''} ${state.user.surname || ''}`,
    isUser: state => (Object.keys(state.user).length)
  }
}
