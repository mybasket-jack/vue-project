import Mock from 'mockjs'
import { getUserInfo } from './response/user'
import { getTableData } from './response/data'
const Random = Mock.Random

Mock.mock('/api/user',getUserInfo)
Mock.mock('/getTableData',getTableData)
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
