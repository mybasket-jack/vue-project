<template>
	<div>
		<!-- slot 是插槽，根据防止的位置，插入内容-->
		<slot name="left"></slot>
		<span  ref="number" :class="countClass" :id="eleId"></span>
		<slot name="right"></slot>
	</div>
</template>
<script>
import CountUp from 'countup'
import './count-to.less'
export default {
	name: 'CountTo',
	computed: {
		// 计算属性
		eleId () {
			return `count_up_${this._uid}`
		},
		countClass () {
			return [
				'count-to-number',
				this.className
			]
		}
	},
	data () {
		return {
			counter: {}
		}
	},
	props: {
		/**
		 * @description 起始值
		 */
		startVal: {
			type: Number,
			default: 0
		},
		/**
		 * @description 目标值 必填
		 */
		endVal: {
			type: Number,
			required: true
		},
		/**
		 * @description 小数点保留几位小数
		 */
		decimals: {
			type: Number,
			default: 0
		},
		/**
		 * @description 动画延迟时间 单位为毫秒（自定义属性）
		 */
		delay: {
			type: Number,
			default: 0
		},
		/**
		 * 渐变时长，单位为毫秒
		 */
		duration: {
			type: Number,
			default: 1
		},
		/**
		 * @description 是否使用变速效果
		 */
		useEasing: {
			type: Boolean,
			default: false
		},
		/**
		 * @description 是否使用分组
		 */
		useGroup: {
			type: Boolean,
			default: true
		},
		/**
		 * @description 分组分割符号
		 */
		separator: {
			type: String,
			default: ','
		},
		/**
		 * @description 整数与小数分割符号
		 */
		decimal: {
			type: String,
			default: '.'
		},
		className: {
			type: String,
			default: ""
		}
	},
	methods: {
		getCount () {
			return this.$refs.number.innerText
		},
		emitEndEvent () {
			setTimeout(() => {
				this.$nextTick( () => {
					this.$emit('on-animation-end',Number(this.getCount()))
				})
			}, this.duration * 1000 + 5)
		}
	},// 监听器
	watch: {
		endVal (newVal, oldVal){
			this.counter.update(newVal)
			this.emitEndEvent()
		}
	},
	mounted () {
		this.$nextTick(() => {
			this.counter = new CountUp(
				this.eleId,
				this.startVal,
				this.endVal,
				this.decimals,
				this.duration,{
					useEasing: this.useEasing,
					useGroup: this.useGroup,
					separator: this.separator,
					decimal: this.decimal
				})
				setTimeout(() => {
					this.counter.start()
					this.emitEndEvent()
				}, this.delay)
		})
	}
}
</script>
