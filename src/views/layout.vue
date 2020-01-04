<template>
	<div class="layout-wrapper">
		<Layout class="layout-outer">
			<Sider  breakpoint="sm"  hide-trigger collapsible  v-model="isCollapsed"></Sider>
			<Layout>
				<Header class="header-wrapper">
					<Icon :class="triggerClasses" @click.native="handleCollapsed" type="md-menu" :size="32"/>
				</Header>
				<Content class="content-con">
					<Card shadow class="page-card">
						<router-view/>
					</Card>
				</Content>
			</Layout>
		</Layout>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				isCollapsed: false
			}
		},
		computed: {
			triggerClasses () {
				return [
					'trigger-icon',
					this.isCollapsed ? 'rotate' : ''
				]
			}
		},
		methods: {
			handleCollapsed () {
				this.isCollapsed = !this.isCollapsed
			}
		}
	}
</script>
<style lang="less">
	.layout-wrapper, .layout-outer{
		height: 100%;
		.header-wrapper{
			background: #ffffff;
			box-shadow: 0 1px 1px 1px rgba(0,0,0, .1);
			padding: 0 10px;
			//margin-right: 1100px;
			float: left;
			.trigger-icon{
				cursor: pointer;
				&.rotate{
					transform: rotateZ(-90 deg);
					transition: transform .3s;
				}
			}
		}
		.content-con{
			padding: 10px;
		}
		.page-card{
			min-height: ~"calc(100vh - 84px)";
		}
	}
</style>
