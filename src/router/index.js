import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './router'
import store from "@/store";
import { setTitle, setToken, getToken} from '@/lib/util'

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
  routes
});

// 前置守卫
router.beforeEach((to,from,next) => {
	to.meta  && setTitle(to.meta.title);

	//获取token 判断是否登录
	/*const token = getToken();
	if(token){
		// 判断是否有效
		store.dispatch('authorization',token).then(() => {
			if (to.name === 'login') next({ name: 'home' });
			else next()
		}).catch(() => {
			// token 情况
			setToken('');
			next({ name: 'login' })
		})
	} else {
		if(to.name === 'login' ) next();
		else next({name: 'login'})
	}*/

	// 权限判断
	const token = getToken();
	debugger;
	if (token) {
		console.log(store.state.router.hasGetRules);
		if(!store.state.router.hasGetRules){
			// 没有获取过路由列表
			store.dispatch("authorization").then( rules => {
				store.dispatch('concatRouters',rules).then(routers => {
					// 这里routes 不使用深拷贝，会导致嵌套路由的一级组件不能复用
					// 建议不使用深拷贝，把vuex的严格模式设为false
					router.addRoutes(routers); //动态添加路由
					// 确保addRoutes已完成,路由列表加载完,
					// set the replace: true so the navigation will not leave a history record
					next({...to, replace: true})
				}).catch(() => {
					next({name: 'login'})
				});
			}).catch( () => {
				// 校验不成功登出
				setToken('');
				next({name: 'login'})
			})
		} else{
			// 再次登录即登出
			if (to.name === 'login'){
				setToken('');
			}
		 next();
		}
	} else {
		if (to.name === 'login') next();
		else next({name: 'login'})
	}
});
// 导航被确认之前
//router.beforeResolve()
// 后置钩子
router.afterEach((to,form,next) => {
	//loging = false
});

/**
 * 导航解析流程
 * 1、在导航被触发
 * 2、在失活的组件（即将离开的页面组件）里面条用离开守卫 beforeRouteLeave
 * 3、调用全局的前置守卫 beforeEach
 * 4、在重用的组件里调用 beforeRouteUpdate
 * 5、调用路由的独享守卫 beforeEnter
 * 6、异步解析路由组件
 * 7、在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter（this还不能用）
 * 8、调用全局的解析守卫 beforeResolve
 * 9、导航被确认
 * 10、调用全局的后置守卫 afterEach
 * 11、触发DOM更新
 * 12、用创建好的实例调用 beforeRouteEnter 守卫里传给next的回调函数
 */
export default router
