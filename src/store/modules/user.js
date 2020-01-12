import { login, authorization} from '@/api/user'
import { setToken } from "@/lib/util";

const state = {
	userName: 'jack',
	componentRules: ''
};
const getters = {
	firstLetter: (state) => {
		return state.userName.substr(0,1)
	}
}
const mutations = {
	SET_USER_NAME (state,params) {
		state.userName = params;
	},
	SET_COMPONENT_RULES (state, rules) {
		state.componentRules = rules;
	}
};
const actions = {
	updateUserName ({ commit, state, rootState, dispatch}) {
		// rootState.appName
		//dispatch('XXX', '')
	},
	login ({ commit },{ userName, password }) {
		return new Promise((resolve ,reject) => {
			// 调用API的方法
			login({userName, password }).then( res => {
				if(res.code == 200 && res.data.token){
					// 保存token
					setToken(res.data.token);
					resolve()
				} else {
					reject(new Error('登录错误'))
				}
			}).catch( error => {
				reject(error)
			})
		})
	},
	authorization ({ commit },token) {
		return new Promise((resolve, reject) => {
			authorization().then(res => {
				if (parseInt(res.code) === 401){
					reject(new Error("token error"))
				}else{
					setToken(res.data.token);
					// 将页面权限传到route
					resolve(res.data.rules.page);
					// 触发组件权限控制方法
					commit('SET_COMPONENT_RULES',res.data.rules.component);
				}
			}).catch(error => {
				reject(error)
			})
		})
	}
}
export default  {
//	namespaced: true,  //利于模块更加密闭
	state,
	getters,
	mutations,
	actions,
	modules: {

	}
}
