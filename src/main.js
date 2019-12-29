import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'  //引入vuex
import Bus from './lib/bus'
import CountTo from '_c/count-to'
if(process.env.NODE_ENV === 'development')  require('./mock')
Vue.config.productionTip = false
Vue.prototype.$bus = Bus

//
new Vue({
  router,
  store,
	// render: h => h('div', [
	// 	h('ul', {
	// 		on: {
	// 			'click': event => {
	// 				console.log(event)
	// 			}
	// 		}
	// 	}, getEleArr(h))
	// ])
	render: h => h(App)
}).$mount('#app')

