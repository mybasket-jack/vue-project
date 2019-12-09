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
	strict: process.env.NODE_ENV === 'development', // 生产环境打开严格模式，上线关闭
	state,
	getters,
  mutations,
  actions,
  modules: {
		user
	},
	//plugins: [ saveInLocal ]
})
