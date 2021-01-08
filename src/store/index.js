import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectCity: []
  },
  mutations: {
    changeSelect(state, payload) {
      state.selectCity = payload;
    }
  }
})