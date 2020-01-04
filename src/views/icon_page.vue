<template>
	<div>
		<!--使用iview的icon组件-->
		<Icon :size="40" type="md-menu" color="green"/>
		<!--使用iview的icon组件自定义样式，采用font-class-->
		<Icon custom="iconfont icon-icon-test"/>
		<!--使用icon-font的unicode图标-->
		<i class="iconfont " style="color: dodgerblue">&#xe638;</i>
		<!--使用icon-font的Symbol图标-->
		<svg class="icon" aria-hidden="true" style="font-size: 30px;">
			<use xlink:href="#icon-BaseballHat"></use>
		</svg>
		<!--使用icon-font的font-class图标-->
		<i class="iconfont icon-icon-test" style="font-size: 30px;"></i>

		<!--自定义单色图标组件-->
		<!--:size=30 或 :size="30" 不能size="30" size需要为 Number-->
		<icon-font icon="test2" :size="30" color="pink"/>
		<!--自定义多色图标组件-->
		<icon-svg icon="BaseballDiamond" :size="50"/>
	</div>
</template>

<script>
    export default {
        name: "icon_page"
    }
</script>

