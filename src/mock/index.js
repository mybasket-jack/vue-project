import Mock from 'mockjs'
import { getUserInfo } from './response/user'
const Random = Mock.Random

Mock.mock('/api/user',getUserInfo)
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
