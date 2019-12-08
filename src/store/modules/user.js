const state = {
	userName: 'jack'
}
const getters = {
	firstLetter: (state) => {
		return state.userName.substr(0,1)
	}
}
const mutations = {
	SET_USER_NAME (state,params) {
		state.userName = params
	}
}
const actions = {
	updateUserName ({ commit, state, rootState, dispatch}) {
		// rootState.appName
		dispatch('XXX', '')
	},
	xxx () {
		//
	}
}
export default  {
//	namespaced: true,  //利于模块更加密闭
	state,
	getters,
	mutations,
	actions
}
