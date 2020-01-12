import axios from 'axios'
import { baseURL } from '@/config'
import { getToken } from "@/lib/util";
class HttpRequest {
	// 判断开发环境还是生产环境
	constructor (baseUrl = baseURL) {
		this.baseUrl = baseUrl //this要创建的实例
		this.queue = {}
	}
	getInsideConfig () {
		const config = {
			// 全局配置
			baseUrl: this.baseUrl,
			headers: {
				//
			}
		}
		return config
	}
	destory (url) {
		delete  this.queue[url]
		if(!Object.keys(this.queue).length){
			// Spin.hide()
		}
	}
	interceptors (instance, url) {
		// 请求拦截器
		instance.interceptors.request.use(config => {
			// 添加全局的loading...
		  if (!Object.keys(this.queue).length) {
				// Spin.show()
			}
			this.queue[url] = true
			config.headers['Authorization'] = getToken()
			return config
		}, error => {
			return Promise.reject(error)
		})
		//响应拦截器
		instance.interceptors.response.use(res => {
			this.destory(url)
			// 取res的data和status
			const { data } = res
			return data
		}, error => {
			this.destory(url)
			return Promise.reject(error.response.data)
		})
	}
	request (options) {
		const instance = axios.create()
		options = Object.assign(this.getInsideConfig, options)
		this.interceptors(instance,options.url)
		return instance(options)
	}
}
export default HttpRequest
