<template>
	<div>
		<input v-model="userName"/>
		<input type="password" v-model="password"/>
		<button @click="handleSubmit">登录</button>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
	export default {
		name: 'login_page',
		data () {
			return {
				userName: '',
				password: ''
			}
		},
		methods: {
			...mapActions([
				'login'
			]),
			handleSubmit () {
				const param = {
					userName:this.userName,
					password: this.password
				}
				this.login(param).then( () => {
					console.log('success login')
					this.$router.push({
						name: 'home'
					})
				}).catch( error => {
					console.log(error)
				})
			}
		}
	}
</script>
