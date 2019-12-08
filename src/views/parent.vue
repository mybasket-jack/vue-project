<template>
	<div>
		I am parent
			<router-view :to="{name: 'child'}"/>
	</div>
</template>
<script>
export default {
  //
}
</script>
