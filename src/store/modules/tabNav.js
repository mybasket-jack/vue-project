import { routeHasExist, getRouteObjById, routeEqual, localRead, localSave } from "@/lib/util";

const state = {
	tabList: JSON.parse(localRead('tabList') || '[]')
};

// 获取一个能够存到本地local的路由列表
const getTableListToLocal = tabList => {
	return tabList.map( item => {
		return {
			name: item.name,
			path: item.path,
			meta: item.meta,
			params: item.params,
			query: item.query
		}
	})
}

const mutations = {
	UPDATE_ROUTER (state, route) {
		if (!routeHasExist(state.tabList, route) && route.name !== 'login') state.tabList.push(route);
		// 保存
		localSave('tabList',JSON.stringify(getTableListToLocal(state.tabList)));
	},
	// 删除tableList中的tab项
	REMOVE_TAB (state, index) {
		state.tabList.splice(index,1);
		localSave('tabList',JSON.stringify(getTableListToLocal(state.tabList)));
	}
};

const actions = {
	handleRemove ({commit}, {id, $route}) {
		return new Promise((resolve) => {
			let route = getRouteObjById(id);
			let index = state.tabList.findIndex(item => {
				return routeEqual(route,item)
			});
			let len = state.tabList.length;
			let nextRoute = {};
			// 判断关闭的route对象是否当前的路由
			if (routeEqual($route, state.tabList[index])) {
				// 右边还有tab标签, 取下一个
				if (index < len-1 ) nextRoute = state.tabList[index + 1];
				//关闭的tabList是最后一个，取前一个
				else if (index === len-1 ) nextRoute = state.tabList[index - 1];
			}
			// 判断空 newRoute 删完后跳转到首页
			const { name, params, query } = nextRoute || { name: 'home_index'};
			commit('REMOVE_TAB',index);
			// 返回route对象
			resolve({
				name,
				params,
				query
			})
		})
	}
};

export default {
	state,
	mutations,
	actions
}
