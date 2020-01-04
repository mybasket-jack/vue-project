<template>
	<div class="form-wrapper">
		<form-group :list="formList" :url="url"> </form-group>
	</div>
</template>
<script>
	import FormGroup from "_c/form-group/form-group";
	export default {
		components: {
			FormGroup
		},
		data () {
			return {
				url: '/api/file/user/setFormData',
				formList: [
					{
						name: 'name',
						type: 'i-input',
						value: '',
						label: '姓名',
						rule: [
							{ required: true, message: 'The name cannot be empty', trigger: 'blur' }
						]
					},
					{
						name: 'range',
						type: 'slider',
						value: [ 10, 40],
						range: true,
						label: '范围'
					},
					{
						name: 'sex',
						type: 'i-select',
						value: '',
						label: '性别',
						children: {
							type: 'i-option',
							list: [
								{ value: 'woman', title: '女'},
								{ value: 'man', title: '男'},
							]
						}
					},
					{
						name: 'education',
						type: 'radio-group',
						value: 1,
						label: '学历',
						children: {
							type: 'radio',
							list: [
								{ label: 1, title: '本科'},
								{ label: 2, title: '研究生'},
								{ label: 3, title: '博士'},
							]
						}
					},
					{
						name: 'skill',
						type: 'checkbox-group',
						value: [],
						label: '技能',
						children: {
							type: 'checkbox',
							list: [
								{ label: 1, title: 'Vue'},
								{ label: 2, title: 'NodeJs'},
								{ label: 3, title: 'Mysql'},
							]
						}
					},
					{
						name: 'is-work',
						type: 'i-switch',
						value: true,
						label: '是否在职'
					},
					{
						name: 'start-time',
						type: 'date-picker',
						value: '',
						placeholder:'请选择时间',
						label: '开始时间'
					},
					{
						name: 'submit',
						type: 'i-button',
						value: '',
						icon: 'logo-facebook',
						label: '提交'
					}
				]
			}
		},
		methods: {
			//
		}
	}
</script>
<style lang="less">
	.form-wrapper{
		padding: 20px;
	}
</style>
