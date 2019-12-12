import Mock from 'mockjs'
export const getUserInfo = (options) => {
	const template =  {
		'str|2-4': 'jack',
		'name|3': 'ok',
		'age|+2': 8, //初始8,循环加2
		'num|2-5': 0,
		'float|3-10.2-5': 0,
		'bool1|1': false,
		'bool2|3-7': true,
		'object1|2': {
			'a': 'aa',
			'b': 'bb',
			'c': 'cc'
		},
		'object2|1-2': {
			'a': 'aa',
			'b': 'bb',
			'c': 'cc'
		}
	}
	return Mock.mock(template)
}
// export const getUserInfo = (options) => {
// 	return {
// 		name: 'ok'
// 	}
// }
