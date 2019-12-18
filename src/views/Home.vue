<template>
  <div class="home">
		<b>my favorite food is {{food}}</b>
		<button @click="handClick('back')">返回上一个</button>
		<button @click="handClick('push')">跳转到parent页</button>
		<button @click="handClick('replace')">替换到parent页</button>
		<button @click="getInfo" :style="{background: bgColor}">请求数据</button>
		<br>
		<input v-model="inputValue"/>
		<button @click="login">登录</button>
		<p>结果：{{ resultValue }}</p>
		<img :src="url">
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {getUserInfo,login} from '@/api/user'
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'home',
  // components: {
  //   HelloWorld
	// },
	props: {
		food: {
			name: String,
			default: 'apple'
		}
	},
	data () {
		return {
			inputValue: '',
			url: '',
			bgColor
		}
	},
	computed: {
		...mapState({
			resultValue: state => state.resultValue,
		}),
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
		...mapMutations ([
			'SET_LOGIN_RESULT'
		]),
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
		},
		getInfo () {
			getUserInfo().then(res => {
				this.SET_LOGIN_RESULT(res.data)
				this.url = res.data.img
				this.bgColor = res.data.bgColor
			})
		},
		login () {
			login({name: this.inputValue}).then(res => {
				this.SET_LOGIN_RESULT(res.data.result)

			})
		}
	}

}
</script>
