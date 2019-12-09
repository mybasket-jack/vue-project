<template>
  <div class="home">
		<b>my favorite food is {{food}}</b>
		<button @click="handClick('back')">返回上一个</button>
		<button @click="handClick('push')">跳转到parent页</button>
		<button @click="handClick('replace')">替换到parent页</button>
		<button @click="getInfo">请求数据</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    HelloWorld
	},
	props: {
		food: {
			name: String,
			default: 'apple'
		}
	},
	beforeRouteEnter (to,form,next){
		// this在此无法获取组件实例，但可以在next中获取
		next(vm =>{
			//vm 为当前组件
			//console.log(vm)
		})
	},
	beforeRouteLeave (to,form,next) {
		// const leave = confirm('您确定要离开吗？')
		// if (leave) next()
		// else next(false)
		next()
	},
	methods: {
		handClick (type) {
			if (type === 'back') this.$router.back()
			else if (type === 'push') {
				const name = 'jack'
				this.$router.push({
					path: `/argu/${name}`
					// name: 'argu',
					// params: {
					// 	name: 'jack'
					// }
					// query: {
					// 	name: 'jack'
					// }
				})
			} else if(type === 'replace') {
				this.$router.replace({
					name: 'child'
				})
			}
		}
	},
	getInfo () {
		axios.post('http://localhost:3000/getUserInfo',{userId: 22}).then(res => {
			console.log(res)
		})
	}
}
</script>
