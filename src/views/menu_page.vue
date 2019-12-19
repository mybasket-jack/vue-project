<template>
	<div class="menu-box">
<!--		<a-menu>-->
<!--			<a-menu-item>111</a-menu-item>-->
<!--			<a-menu-item>222</a-menu-item>-->
<!--			<a-sub-menu>-->
<!--				<div slot="title">333</div>-->
<!--				<a-menu-item>333-11</a-menu-item>-->
<!--				<a-sub-menu>-->
<!--					<div slot="title">333-22</div>-->
<!--					<a-menu-item>333-22-11</a-menu-item>-->
<!--					<a-menu-item>333-22-22</a-menu-item>-->
<!--				</a-sub-menu>-->
<!--			</a-sub-menu>-->
<!--		</a-menu>-->
		<a-menu>
			<template v-for="(item, index) in list">
				<a-menu-item v-if="!item.children" :key="`menu_item_${index}`"> {{ item.title }} </a-menu-item>
				<re-submenu v-else :key="`menu_item_${index}`" :parent="item" :index="index"></re-submenu>
			</template>
		</a-menu>
	</div>
</template>
<script>
	import menuConponents from '_c/menu'
	import reSubmenu from './re-submenu'
	const { AMenu, AMenuItem, ASubMenu } = menuConponents
	export default {
		name: 'menu_page',
		components: {
			AMenu,
			AMenuItem,
			ASubMenu,
			reSubmenu
		},
		data () {
			return {
				list: [
					{
						title: '1111'
					},
					{
						title: '2222'
					},
					{
						title:	'3333',
						children:	[
							{
								title:	'3333-1'
							},
							{
								title: '3333-2',
								children:	[
									{
										title:	'3333-2-1'
									},
									{
										title:	'3333-2-2'
									}
								]
							}
						]
					}
				]
			}
		}
	}
</script>
<style lang="less">
	.menu-box{
		width: 300px;
		height: 400px;
	}
</style>
