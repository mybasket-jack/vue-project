import Mock from 'mockjs'
import { getUserInfo } from './response/user'
import { getTableData, getFolderList, getFileList } from './response/data'
const Random = Mock.Random

Mock.mock('/api/user',getUserInfo)
Mock.mock('/getTableData',getTableData)
Mock.mock('/getFolderList',getFolderList)
Mock.mock('/getFileList',getFileList)
Mock.setup({
	timeout: 0
})
Random.extend({
	fruit () {
		const fruit = ['apple', 'peach', 'banana', 'orange']
		return Random.pick(fruit)
	}
})
export default Mock
