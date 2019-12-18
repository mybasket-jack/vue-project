import axios from './index'
const getUserInfo = () => {
	return axios.request({
		url: '/api/user',
		method: 'get'
	})
}
const login = ({ name}) => {
	console.log('name: ',name)
	return axios.request({
		url: '/api/user/login',
		method: 'post',
		data: {
			name,
			age: 23
		}
	})
}
export { getUserInfo }
export  { login}
