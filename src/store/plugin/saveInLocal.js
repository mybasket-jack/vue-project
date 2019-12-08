export default store => {
	console.log('插件初始化了')
	store.subscribe((mutation, state) => {
		console.log('提交mutation')
	})
}
