import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'  //引入vuex
import Bus from './lib/bus'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
// 引入阿里巴巴的icon样式
import '@/assets/font/iconfont.js'
import '@/assets/font/iconfont.css'

// 自定义icon组件
import IconFont from '_c/icon-font'
import IconSvg from '_c/icon-svg'

import CountTo from '_c/count-to'
if(process.env.NODE_ENV === 'development')  require('./mock');
Vue.config.productionTip = false;
Vue.prototype.$bus = Bus;

// 全局注册组件
Vue.component('icon-font',IconFont);
Vue.component('icon-svg',IconSvg);

Vue.use(ViewUI);
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
}).$mount('#app');

