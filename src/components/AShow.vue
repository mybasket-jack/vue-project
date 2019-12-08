<template>
	<div>
		<p>AShow：{{ content }}</p>
	</div>
</template>
<script>
export default {
	props: {
		content: [String,Number],
		default: ''
	}
}
</script>
