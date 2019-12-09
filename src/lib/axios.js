import axios from 'axios'
import { baseURL } from '@/config'
import { springgreen } from 'color-name'
class HttpRequest {
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
	}
	interceptors (instance, url) {
		// 请求拦截器
		instance.interceptors.request.use(config => {
			// 添加全局的loading...
		  if (!Object.keys(this.queue).length) {
				// Spin.show()
			}
			this.queue[url] = true
			return config
		}, error => {
			return Promise.reject(error)
		})
		//响应拦截器
		instance.interceptors.response.use(res => {
			delete this.queue[url]
			// 取res的data和status
			const { data, status } = res
			return { data, status }
		}, error => {
			delete this.queue[url]
			return Promise.reject(error)
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
