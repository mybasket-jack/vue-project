<template>
	<div class="split-pane-wrapper" ref="outer">
		<div class=" pane pane-left" :style="{width: leftOffsetPercent, paddingright: `${this.triggerWidth / 2}px`}" >
			<slot name="left"></slot>
		</div>
		<div class="pane-trigger-com" @mousedown="handleMousedown" :style="{left: triggerLeft,width: `${triggerWidth}px`}"></div>
		<div class="pane pane-right" :style="{left: leftOffsetPercent, paddingleft: `${this.triggerWidth / 2}px`}">
			<slot name="right"></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: 'SplitPane',
	data () {
		return {
			//leftOffset: 0.3,
			canMove: false,
			initOffset: 0
		}
	},
	props:{
		value: {
			type: Number,
			default: 0.5
		},
		triggerWidth: {
			type: Number,
			default: 8
		},
		min: {
			type: Number,
			default: 0.1
		},
		max: {
			type: Number,
			default: 0.9
		}
	},
	computed: {
		leftOffsetPercent () {
			return `${this.value * 100}%`
		},
		triggerLeft () {
			return `calc(${this.value * 100 }% - ${this.triggerWidth / 2 }px)`
		}
	},
	methods: {
		handleClick () {
			this.value -=0.02
		},
		handleMousedown () {
			document.addEventListener('mousemove',this.handleMousemove)
			document.addEventListener('mouseup',this.handleMouseup)
			this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left
			this.canMove = true
		},
		handleMousemove (event) {
			if (!this.canMove) return
			const outerRect = this.$refs.outer.getBoundingClientRect()
			let offsetPercent = (event.pageX - this.initOffset + this.triggerWidth / 2 -  outerRect.left) / (outerRect.width)
			if (offsetPercent < this.min) offsetPercent = this.min
			if (offsetPercent > this.max) offsetPercent = this.max
			this.$emit('update:value',offsetPercent)

		},
		handleMouseup () {
			this.canMove = false
		}
	}
}
</script>
<style lang="less">
.split-pane-wrapper{
	height: 100%;
	width: 100%;
	position: relative;
	.pane{
		height: 100%; // 和父容器一样
		position: absolute;
		top: 0;
		&-left{
			background: palevioletred;
		}
		&-right{
			right: 0;
			bottom: 0;
			background: paleturquoise;
		}
		&-trigger-com{
			width: 8px;
			height: 100%;
			background: red;
			position: absolute;
			top: 0;
			z-index: 10;
			user-select: none;  // 防止鼠标选中
			cursor: col-resize;
		}
	}
}

</style>
