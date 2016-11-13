import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { state, mutations } from './mutations'
import plugins from './plugins'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state,
  mutations,
  plugins
})
