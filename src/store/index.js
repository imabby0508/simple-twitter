import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from '../apis/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      avatar: '',
      backgroundImage: '',
      email: '',
      introduction: '',
      name: '',
    },
    isAuthenticated: false,
    token: '',
    role: '',

  },
  getters: {
  },
  mutations: {
    setCurrentUser(state, currentUser) {

      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
      state.role = currentUser.role
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.token = ''
      state.isAuthenticated = false
      state.role = ''
      localStorage.removeItem('token')
    }
  },
  actions: {

    async fetchCurrentUser({ commit }) {

      try {
        const response = await userAPI.getCurrentUser()
        const { id, account, avatar, backgroundImage, email, introduction, name, role } = response.data

        commit('setCurrentUser', {
          id, account, avatar, backgroundImage, email, introduction, name, role
        })

        return true

      } catch (error) {
        console.error(error.message)
        commit('revokeAuthentication')
        return false
      }

    }
  },
  modules: {
  }
})
