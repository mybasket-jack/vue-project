<template>
	<div class="folder-wrapper">

	</div>
</template>
<script>
	import { getFolderList, getFileList } from "@/api/data";
	import { putFileInFolder } from "@/lib/util";
	export default {
		data () {
			return {
				folderList: [],
				fileList: []
			}
		},
		mounted () {
			Promise.all([getFolderList(), getFileList()]).then(res => {
				console.log(putFileInFolder(res[0], res[1]));
			})
		}
	}
</script>
<style lang="less">
	.folder-wrapper{
		width: 300px;
	}
</style>
