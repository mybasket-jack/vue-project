import Mock from 'mockjs'
import { getUserInfo } from './response/user'

Mock.mock('/\/user/','get',getUserInfo)

export default Mock
