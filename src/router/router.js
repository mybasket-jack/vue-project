import Home from '@/views/Home.vue'
import Layout from '@/views/layout.vue'
// 创建路由列表
export const routeMap = [
    {
        path: '/',
				name: 'home',
				component: Layout,
				meta: {
					title: 'home'
				},
				children: [
					{
						path: 'home_index',
						name: 'home_index',
						meta: {
							title: '首页'
						},
						component: Home
					}
				]
		},
		{
			// 可编辑表格
			path: '/component',
			name: 'component',
			meta: {
				title: '表格'
			},
			component: Layout,
			children: [
				{
					path: 'table',
					name: 'table_page',
					meta: {
						title: '表格'
					},
					component: () => import('@/views/table.vue')
				},
				{
					path: 'folder_tree',
					name: 'folder_tree',
					meta: {
						title: '文件夹'
					},
					component: () => import('@/views/folder-tree/folder-tree.vue')
				},
				{
					// 动态路由
					path: 'params/:name',
					name: 'params',
					meta: {
						title: '参数'
					},
					component: () => import('@/views/argu.vue'),
					props: true
				},
				{
					path: '/about',
					name: 'about',
					// route level code-splitting
					// this generates a separate chunk (about.[hash].js) for this route
					// which is lazy-loaded when the route is visited.
					component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
					props: {
						food: 'banana'
					},
					meta: {
						title: '关于'
					}
				},
				{
					path: '/count-to',
					name: 'count-to',
					component: () => import('@/views/count-to.vue'),
					meta: {
						title: '计数'
					}
				},
			]
		},
		{
			path: '/form',
			name: 'form',
			meta: {
				title: '大数据表单'
			},
			component: () => import('@/views/form.vue')
		},
		{
			// 大数据性能优化
			path: '/optimize',
			name: 'optimize',
			meta: {
				title: '大数据组件'
			},
			component: () => import('@/views/optimize.vue')
		},
		{
			// 嵌套路由
			path:	'/parent',
			name: 'parent',
			meta: {
				title: '父页面'
			},
			component: () => import('@/views/parent.vue'),
			children: [
				{
					path: 'child',
					name: 'child',
					meta: {
						title: '子页面'
					},
					component: () => import('@/views/child.vue')
				}
			]
		},
		{
			// 命名视图
			path: '/name_view',
			name: 'name_view',
			meta: {
				title: '命名路由'
			},
			components: {
				default: () => import('@/views/Home.vue'),
				email: () => import('@/views/email.vue'),
				tel: () => import('@/views/tel.vue')
			}
		},
		{
			path: '/main',
			name: 'main',
			meta: {
				title: '主页重定向'
			},
			redirect: to => '/'
		},
		{
			path: '/store',
			name: 'store',
			meta: {
				title: 'store'
			},
			component: () => import('@/views/store.vue')
		},
		{
			path: '/split_pane',
			name: 'split_pane',
			meta: {
				title: '可分割面板'
			},
			component: () => import('@/views/split-pane.vue')
		},
		{
			path: '/render_page',
			name: 'render_page',
			meta: {
				title: 'render_page'
			},
			component: () => import('@/views/render_page.vue')
		},
		{
			path: '/menu_page',
			name: 'menu_page',
			meta: {
				title: 'menu_page'
			},
			component: () => import('@/views/menu_page.vue')
		}
];
export const  routes = [
	{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录页面'
		},
		component: () => import('@/views/login.vue')
	},
	{
		path: '/icon_page',
		name: 'icon_page',
		meta: {
			title: '自定义图标'
		},
		component: () => import('@/views/icon_page.vue')
	},
	{
		path: '*',
		meta: {
			title: '404'
		},
		component: () => import('@/views/error_404.vue')
	}
]
