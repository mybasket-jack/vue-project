import axios from './index'
import qs from 'qs'
export const getUserInfo = () => {
	return axios.request({
		url: '/index/getUserInfo',
		method: 'get'
	})
}
export const login = (param) => {
	return axios.request({
		url: '/index/login',
		method: 'post',
		data: param
	})
}

export const authorization = () => {
	return axios.request({
		url: '/users/authorization',
		method: 'get'
	})
}

