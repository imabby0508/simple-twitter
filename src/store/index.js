import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from '../apis/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      email: '',
      name: '',
      role: '',
      avatar: ''
    },
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }

      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  },
  actions: {

    async fetchCurrentUser ({commit}) {

      try {
        const response = await userAPI.getCurrentUser({
          account: 'user1',
          password: '12345678'
        })

        const { data } = response
        const { id, account, email, name, role } = data.data.user

        commit('setCurrentUser', {
          id, account, email, name, role
        })
        
      } catch (error) {
        console.error(error.message)
      }

    }
  },
  modules: {
  }
})
