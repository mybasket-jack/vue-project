import Home from '@/views/Home.vue'
// 创建路由列表
const routes = [
    {
        path: '/',
				name: 'home',
				alias: '/home_page',
				component: Home,
				props: route => ({
					food: route.query.food
				}),
				// 路由独享守卫
				beforeEnter:((to,form,next) =>{
					// if(form.name === 'login') alert("这是从登录也来的")
					// else alert('不知道从哪来的')
					next()  //不能少
				})
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/login.vue')
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
			components: {
				default: () => import('@/views/Home.vue'),
				email: () => import('@/views/email.vue'),
				tel: () => import('@/views/tel.vue')
			}
		},
		{
			path: '/main',
			redirect: to => '/'
		},
		{
			path: '/store',
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
	},
		{
			path: '*',
			component: () => import('@/views/error_404.vue')
		}
]
export default  routes
