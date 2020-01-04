import Home from '@/views/Home.vue'
import Layout from '@/views/layout.vue'
// 创建路由列表
export const routeMap = [
    {
        path: '/',
				name: 'home',
				component: Layout,
				children: [
					{
						path: 'home',
						name: 'home_index',
						component: Home
					}
				]
		},
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
				component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
				props: {
					food: 'banana'
				},
				meta: {
					title: '关于'
				}
		},
		{
			// 动态路由
			path: '/argu/:name',
			name: 'argu',
			component: () => import('@/views/argu.vue'),
			props: true
		},
		{
			// 可编辑表格
			path: '/table',
			name: 'table',
			component: Layout,
			children: [
				{
					path: 'table_page',
					name: 'table_page',
					component: () => import('@/views/table')
				}
			]
		},
		{
			// 树组件
			path: '/tree',
			name: 'tree',
			component: Layout,
			children: [
				{
					path: '/folder-tree',
					name: 'folder-tree',
					component: () => import('@/views/folder-tree/folder-tree.vue')
				}
			]
		},
		{
			// 自定义icon
			path: '/icon',
			name: 'icon',
			component: Layout,
			children: [
				{
					path: '/icon_page',
					name: 'icon_page',
					component: () => import('@/views/icon_page.vue')
				}
			]
		},
		{
			// 可编辑表格
			path: '/form',
			name: 'form',
			component: Layout,
			children: [
				{
					path: '/form_page',
					name: 'form_page',
					component: () => import('@/views/form.vue')
				}
			]
		},
		{
			// 嵌套路由
			path:	'/parent',
			name: 'parent',
			component: () => import('@/views/parent.vue'),
			children: [
				{
					path: 'child',
					name: 'child',
					component: () => import('@/views/child.vue')
				}
			]
		},
		{
			// 命名视图
			path: '/name_view',
			name: 'name_view',
			components: {
				default: () => import('@/views/Home.vue'),
				email: () => import('@/views/email.vue'),
				tel: () => import('@/views/tel.vue')
			}
		},
		{
			path: '/main',
			name: 'main',
			redirect: to => '/'
		},
		{
			path: '/store',
			name: 'store',
			component: () => import('@/views/store.vue')
		},
		{
			path: '/split-pane',
			name: 'split-pane',
			component: () => import('@/views/split-pane.vue')
		},
		{
			path: '/render_page',
			name: 'render_page',
			component: () => import('@/views/render_page.vue')
		},
	{
		path: '/menu_page',
		name: 'menu_page',
		component: () => import('@/views/menu_page.vue')
	}
]
export const  routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login.vue')
	},
	{
		path: '*',
		component: () => import('@/views/error_404.vue')
	}
]
