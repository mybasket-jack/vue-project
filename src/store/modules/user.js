import { login, authorization} from '@/api/user'
import { setToken } from "@/lib/util";

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
	login ({commit},{userName, password}) {
		return new Promise((resolve ,reject) => {
			// 调用API的方法
			login({userName, password }).then( res => {
				if(res.data.code == 200 && res.data.token){
					// 保存token
					setToken(res.data.token)
					resolve()
				} else {
					reject(new Error('登录错误'))
				}
			}).catch( error => {
				reject(error)
			})
		})
	},
	async  authorization ({ commit },token) {
		return new Promise((resolve, reject) => {
			authorization().then(res => {
				console.log("authorization: "+res)
				if (parseInt(res.code) === 401){
					reject(new Error("token error"))
				}else{
					resolve()
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
	actions
}
