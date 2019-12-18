export default  {
	functional: true,  // true时没有状态
	props: {
		name: Number,
		renderFunc: Function // 用户自定义的函数
	},
	render: (h, ctx) => {
		return ctx.props.renderFunc(h, ctx.props.name)
	}
}
