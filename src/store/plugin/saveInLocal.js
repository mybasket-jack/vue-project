export default store => {
	if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))
	store.subscribe((mutation, state) => {
		// 持久化保存
		localStorage.state = JSON.stringify(state)
	})
}
