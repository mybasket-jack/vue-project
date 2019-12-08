import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import user from './modules/user'
import saveInLocal from './plugin/saveInLocal'

// 加载Vuex
Vue.use(Vuex)
// 创建vuex实例
export default new Vuex.Store({
	state,
	getters,
  mutations,
  actions,
  modules: {
		user
	},
	plugins: [ saveInLocal ]
})
