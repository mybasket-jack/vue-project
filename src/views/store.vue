<template>
	<div>
		<!-- v-model 是一个语法糖 相当于 :value="inputValue" @input="handleInput" -->
		<a-input v-model="stateValue"/>
		<p>{{ stateValue }}</p>
		<!-- <a-show :content="inputValue"/> -->
		<p>appName: {{ appName  }},
			appNameWithVersion: {{ appNameWithVersion }},
			</p>
		<p>userName: {{ userName }}, firstLetter is : {{ firstLetter }}</p>
		<button @click="handleChangeAppName">修改appName</button>
		<p>{{ appVersion }}</p>
		<button @click="handleChangeUserName">修改userName</button>
		<button @click="registerModule">动态注册模块</button>
		<p v-for="(li, index) in todoList" :key="index">{{ li }}</p>
	</div>

</template>
<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
import {mapState, mapGetters,mapMutations,mapActions} from 'vuex'
export default {
	name: 'store',
	data () {
		return {
			inputValue: ''
		}
	},
	components: {
		AInput,
		AShow
	},
	computed: {
		appName () {
			return this.$store.state.appName
		},

		appNameWithVersion () {
			return this.$store.getters.appNameWithVersion
		},
		...mapGetters([
			'firstLetter'
		]),
		...mapState({
			userName: state => state.user.userName,
			appVersion: state => state.appVeVrsion,
			todoList: state => state.user.todo ? state.user.todo.todoList : [],
		}),
		stateValue: {
			get () {
				return this.$store.state.stateValue
			},
			set (value) {
					this.SET_STATE_VALUE(value)
			}
		}
	},
	methods: {
		...mapMutations ([
			'SET_APP_NAME',
			'SET_USER_NAME',
			'SET_STATE_VALUE'
		]),
		...mapActions([
			'updateAppName'
		]),
		handleChangeAppName () {
			// 提交的函数名称，新的值
			//this.$store.commit('SET_APP_NAME','MyAppName'),
			//this.SET_APP_NAME('jackson006')
			this.updateAppName('')
			//this.$store.commit('SET_APP_VERSION')
		},
		handleChangeUserName () {
			this.SET_USER_NAME('你好')
			//this.$store.dispatch('updateAppName','123')
		},
		registerModule () {
			this.$store.registerModule(['user','todo'], {
				state: {
					todoList: [
						'学习mutations',
						'学习actions'
					]
				}
			})
		},
		handleStateValueChange (value) {
			this.SET_STATE_VALUE(value)
		}
	}
}
</script>
