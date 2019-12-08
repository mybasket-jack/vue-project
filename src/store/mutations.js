 import vue from 'vue'
 const mutations = {
	 // state 同级的state
	SET_APP_NAME (state,params) {
		state.appName = params
	},
	SET_APP_VERSION (state) {
		vue.set(state,'appVersion','v2.0')
	}
 }
 export default mutations
