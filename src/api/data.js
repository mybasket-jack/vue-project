import axios from './index'
import qs from 'qs'
export const getTableData = () => {
	return axios.request({
		url: '/getTableData',
		method: 'get'
	})
};

export const getFolderList = () => {
	return axios.request({
		url: '/getFolderList',
		method: 'get'
	})
};

export const getFileList = () => {
	return axios.request({
		url: '/getFileList',
		method: 'get'
	})
};

export const sendFormData = ({ url, data }) => {
	return axios.request({
		url: url,
		data: qs.stringify({formData: JSON.stringify(data)}),
		method: 'post'
	})
};
