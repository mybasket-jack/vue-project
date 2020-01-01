<template>
	<Tree :data="folderTree" :render="renderFunc"></Tree>
</template>
<script>
	import { putFileInFolder, transformFolderToTree, expandSpecifiedFolder } from "@/lib/util";
	import clonedeep from 'clonedeep'
	export default {
		name: 'FolderTree',
		data () {
			return {
				currentRenamingId: '',
				currentRenamingContent: '',
				folderTree: [],
				renderFunc: (h, { root, node, data }) => {
					const dropList = data.type === 'folder' ? this.folderDrop : this.fileDrop;
					const dropdownRender = dropList.map(item => {
						return (<dropdown-item name={ item.name }>{ item.title }</dropdown-item>)
					});
					const isRenaming = this.currentRenamingId === `${data.type || 'file' }_${data.id}`;
					/*jsx表达式*/
					return (
						<div class="tree-item">
							{ data.type === 'folder' ? <icon type="ios-folder" color="#2d8cf0" style="margin-right:10px;"/> : ''}
							{
								isRenaming
									? <span>
									<i-input value= { data.title } on-input={ this.handleInput } class="tree-rename-input"></i-input>
									<i-button size="small" type="text" on-click={ this.saveRename.bind(this,data ) }><icon type="md-checkmark" /></i-button>
									<i-button size="small" type="text" ><icon type="md-close"/></i-button>
								</span>
									: <span>{ data.title }</span>
							}
							{
								dropList && !isRenaming? <dropdown placement="right-start" on-on-click={ this.handleDropDownClick.bind(this,data) }>
									<i-button size="small" type="text" >
										<icon type="md-more" size={12} />
									</i-button>
									<dropdown-menu slot="list">
										{ dropdownRender }
									</dropdown-menu>
								</dropdown> : ''
							}
						</div>
					)
				}
			}
		},
		// 定义组件的属性
		props: {
			folderList: {
				type: Array,
				default: () => []
			},
			fileList: {
				type: Array,
				default: () => []
			},
			folderDrop: Array,
			fileDrop: Array,
			beforeDelete: Function
		},
		// 监听树结构中值的变化
		watch: {
			folderList () {
				this.transData();
			},
			fileList () {
				this.transData();
			}
		},
		methods: {
			// 将扁平数据转换为树状
			transData () {
				this.folderTree = transformFolderToTree(putFileInFolder(this.folderList, this.fileList));
			},
			isFolder (type) {
				return type === 'folder';
			},
			// 删除操作
			handleDelete (data) {
				const isFolder = this.isFolder(data.type);
				const folderId = data.folder_id;
				let updateListName = isFolder ? 'folderList' : 'fileList';
				let list = isFolder ? clonedeep(this.folderList) : clonedeep(this.fileList);
				list = list.filter(item => item.id !== data.id);
				this.$emit(`update:${updateListName}`,list);
				this.$nextTick(() => {
					expandSpecifiedFolder(this.folderTree,folderId);
				});
			},
			// 下拉菜单事件
			handleDropDownClick (data,name) {
				if(name === 'rename') {
					this.currentRenamingId = `${data.type || 'file'}_${data.id}`;
				} else if( name === 'delete') {
					this.$Modal.confirm({
						title: '提示',
						content: `您确认要删除${this.isFolder(data.type) ? '文件夹' : '文件'}《${data.title}》 吗?`,
						onOk: () => {
							this.beforeDelete ? this.beforeDelete().then(() => {
								this.handleDelete(data);
							}).catch(() => {
								this.$Message.error('删除失败');
							}) : this.handleDelete(data);
						}
					})
				}

			},
			// 输入值进行替换
			handleInput (value) {
				this.currentRenamingContent = value;
			},
			// 更新当前目录
			updateList (list, id) {
				let i = -1;
				let len = list.length;
				while (++i < len ) {
					let item = list[i];
					if(item.id === id) {
						item.name = this.currentRenamingContent;
						list.splice(i, 1, item);
						break;
					}
				}
				return list;
			},
			// 保存更新后的名称
			saveRename (data) {
				let id = data.id;
				const type = data.type;
				if (type === 'folder') {
					const list = this.updateList(clonedeep(this.folderList), id);
					// 更新父组件，有多个属性时 需要添加在父组件 .sync
					this.$emit('update:folderList', list);
				} else {
					const list = this.updateList(clonedeep(this.fileList), id);
					this.$emit('update:fileList', list);
				}
				this.currentRenamingId = '';
			}
		},
		mounted () {
			// 一开始有数据执行
			this.transData();
		}
	}
</script>
<style lang="less">
	.tree-item{
		display: inline-block;
		width: ~"calc(100%-50px)";
		height: 30px;
		line-height: 30px;
		& > .ivu-dropdown{
			float: right;
		}
		.tree-rename-input{
			width: ~"calc(100%-80px)"
		}
	}
</style>
