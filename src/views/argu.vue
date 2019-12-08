<template>
    <div>
        hello {{name }}
    </div>
</template>
<script>
export default {
  props: {
		name: {
			type: String,
			default: 'jack006'
		}
	}
}
</script>
