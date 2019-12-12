import Mock from 'mockjs'
import { getUserInfo } from './response/user'

Mock.mock('/api/file/user',getUserInfo)

export default Mock
