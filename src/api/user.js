import axios from './index'
import qs from 'qs'
export const getUserInfo = () => {
	return axios.request({
		url: '/api/file/user',
		method: 'get'
	})
}
export const login = (param) => {
	console.log(JSON.stringify(param))
	return axios.request({
		url: '/api/file/user/login',
		method: 'post',
		data: qs.stringify({param: JSON.stringify(param)})
	})
}

export const authorization = () => {
	return axios.request({
		url: '/api/file/user/authorization',
		method: 'get'
	})
}

