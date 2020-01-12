<template>
	<div class="layout-wrapper">
		<Layout class="layout-outer">
			<Sider  :width="200"  hide-trigger collapsible reverse-arrow v-model="isCollapsed" class="side-outer">
				<side-menu :collasped="isCollapsed" :list="routers"></side-menu>
			</Sider>
			<Layout>
				<Header class="header-wrapper">
					<Icon :class="triggerClasses" @click.native="handleCollapsed" type="md-menu" :size="32"/>
				</Header>
				<Content class="content-con">
					<div>
						<Tabs type="card" @on-click="handleClickTab" :value="getTableNameByRoute($route)">
							<tabPane :label="labelRender(item)"  :name="getTableNameByRoute(item)" v-for="(item, index) in tabList" :key="`tabNav${index}`"></tabPane>
						</Tabs>
					</div>
					<div class="view-box">
						<Card shadow class="page-card">
							<router-view/>
						</Card>
					</div>
				</Content>
			</Layout>
		</Layout>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import SideMenu from "_c/side-menu";
	import { getTableNameByRoute, getRouteObjById } from "@/lib/util";
	export default {
		components: {SideMenu},
		data () {
			return {
				isCollapsed: false,
				getTableNameByRoute
			}
		},
		computed: {
			triggerClasses () {
				return [
					'trigger-icon',
					this.isCollapsed ? 'rotate' : ''
				]
			},
			...mapState({
				tabList: state => state.tabNav.tabList,
				routers: state => state.router.routers.filter(item => {
					/*过滤 登录和404菜单*/
					return item.path !== '*' && item.name !== 'login'
				})
			})
		},
		methods: {
			...mapActions([
				'handleRemove'
			]),
			handleCollapsed () {
				this.isCollapsed = !this.isCollapsed
			},
			handleClickTab (id) {
				let route = getRouteObjById(id);
				this.$router.push(route);
			},
			handleTabRemove (id,event) {
				if(event != undefined){
				//事件冒泡阶段，该事件执行完毕后，调用stopPropagation阻止事件的分发。不会再执行父容器及以上容器中元素的事件。
					event.stopPropagation();
				}
				this.handleRemove({
					id,
					$route: this.$route
				}).then( nextRoute => {
					this.$router.push(nextRoute);
				});
			},
			labelRender (item) {
				return h => {
					return (
						<div>
							<span>{item.meta.title}</span>
							<icon nativeOn-click={this.handleTabRemove.bind(this, getTableNameByRoute(item))} type="md-close-circle" style="margin-left:2px;" />
						</div>
					)
				}
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
		.side-outer{
			height: 100%;
			overflow: hidden;
			.ivu-layout-sider-children{
				//margin-right: -20px;
				overflow-y: scroll;
				overflow-x: hidden;
			}
		}
		.content-con{
			padding: 0;
			.ivu-tabs-bar{
				margin-bottom: 0;
			}
			.view-box{
				padding: 0;
			}
		}
		.page-card{
			min-height: ~"calc(100vh - 84px)";
		}
	}
</style>
