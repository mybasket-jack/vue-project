import axios from './index'
const getUserInfo = () => {
	return axios.request({
		url: '/file/user',
		method: 'get'
	})
}
const login = ({ name}) => {
	console.log('name: ',name)
	return axios.request({
		url: '/file/user/login',
		method: 'post',
		data: {
			name
		}
	})
}
export { getUserInfo }
export  { login}
