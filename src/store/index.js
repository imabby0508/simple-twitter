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
      role: '',
    },
    isAuthenticated: false,
    token: ''
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
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.token = ''
      state.isAuthenticated = false
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
