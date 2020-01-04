import { routes, routeMap } from '@/router/router'

const state = {
	routers: routes,
	hasGetRules: false
};

const mutations = {
	CONCAT_ROUTE (state, routerList) {
		state.routers = routerList.concat(routes);
		state.hasGetRules = true;
	}
};

// 定义方法
const getAccessRouterList = (routes, rules) => {
	return routes.filter(item => {
		if (rules[item.name]) {
			if (item.children) item.children = getAccessRouterList(item.children, rules);
			return true
		} else return false
	})
};
const actions = {
	concatRouters ({ commit }, rules ) {
		return new Promise((resolve, reject) => {
			try {
				let routerList = [];
				if (Object.entries(rules).every(item => item[1])) {
					routerList = routeMap;
				} else {
					routerList = getAccessRouterList(routeMap, rules);
				}
				commit('CONCAT_ROUTE',routerList);
				// 这里使用routerList 不使用store.routers,resolve中无需提供路由中已注册的不分权限的路由
				// 否则会重复挂载
				resolve(routerList)
			} catch (err) {
				reject(err)
			}
		})
	}
};
export default {
	state,
	mutations,
	actions
}
