<template>
  <div class="home">
<!--		<button @click="handClick('back')">返回上一个</button>-->
<!--		<button @click="handClick('push')">跳转到parent页</button>-->
<!--		<button @click="handClick('replace')">替换到parent页</button>-->
<!--		<button @click="getInfo" :style="{background: bgColor}">请求数据</button>-->
<!--		<br>-->
<!--		<input v-model="inputValue"/>-->
<!--		<button @click="login">登录</button>-->
<!--		<p>结果：{{ resultValue }}</p>-->
<!--		<img :src="url">-->
		<Row>
			<i-col>layout 学习</i-col>
		</Row>
		<Row :gutter="10">
			<i-col span="12">{{ componentRules }}</i-col>
			<i-col span="12"></i-col>
		</Row>
		<Row :gutter="10">
			<i-col span="8"></i-col>
			<i-col span="8"></i-col>
			<i-col span="8"></i-col>
		</Row>
		<Row :gutter="10" class="blue">
			<i-col :sm="12" :md="6" :lg="8"></i-col>
			<i-col :sm="12" :md="6" :lg="8"></i-col>
			<i-col :sm="12" :md="6" :lg="8"></i-col>
			<i-col :sm="12" :md="6" :lg="8"></i-col>
		</Row>
		<Button v-if="componentRules.edit_button">编辑</Button>
		<Button v-if="componentRules.publish_button">发布</Button>
  </div>
</template>

<script>
import {getUserInfo} from '@/api/user'
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'home',
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
			bgColor:'',
		}
	},
	computed: {
		...mapState({
			resultValue: state => state.resultValue,
			componentRules: state => state.user.componentRules
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
					path: `/params/${name}`
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
		}
	}

}
</script>
<style lang="less">
	.home{
		.ivu-col{
			height: 50px;
			background: pink;
			background-clip: content-box;
			margin-top: 10px;
		}
	}
	.blue{
		.ivu-col{
			background: #42b983;
			background-clip: content-box;
		}
	}
</style>
