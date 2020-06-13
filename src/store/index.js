import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    night_mode: true
  },
  mutations: {
    setUsuario(state, usuario) {
      state.usuario = usuario
    }
  },
  actions: {
  },
  modules: {
  }
})
