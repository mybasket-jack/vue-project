<template>
	<div style="margin-top: 20px;">
		<input v-model="userName"/>
		<input type="password" v-model="password"/>
		<button @click="handleSubmit" style="margin-left: 10px;">登录</button>
		<button @click="handleQuit" style="margin-left: 10px;" >登出</button>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
import { setToken } from "@/lib/util";
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
						name: 'folder-tree'
					})
				}).catch( error => {
					console.log(error)
				})
			},
			handleQuit () {
				setToken('');
			}
		}
	}
</script>
