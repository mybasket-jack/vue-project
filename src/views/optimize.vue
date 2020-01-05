<template>
	<div >
		<CheckboxGroup v-model="checkedArr">
			<virtual-list :size="30" :remain="10">
				<p v-for="item in list " :key="`${item.value}`" style="height:30px;">
					<Checkbox label="item.value">
						<Icon type="logo-twitter"></Icon>
						<span>{{ item.label }}</span>
					</Checkbox>
				</p>
			</virtual-list>
		</CheckboxGroup>
	</div>
</template>
<script>
	import { doCustomTimes } from "@/lib/tools";
	import VirtualList from 'vue-virtual-scroll-list'
	export default {
		component: {
			VirtualList
		},
		data () {
			return {
				list: [],
				selectData: 0,
				checkedArr: []
			}
		},
		mounted () {
			let list = [];
			doCustomTimes(15000,(index) => {
				list.push({
					value: index,
					label: `select${index}`
				})
			})
			this.list = list
		}
	}
</script>

