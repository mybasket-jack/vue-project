import Mock from 'mockjs'
export const getUserInfo = (options) => {
	const template =  {
		'str|2-4': 'ok'
	}
	Mock.mock(template)
}
