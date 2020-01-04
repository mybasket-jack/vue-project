import Mock, { Random } from 'mockjs'
export const getUserInfo = (options) => {
	const template =  {
		'str|2-4': 'jack',
		'name|3': 'ok',
		'age|+2': 8, //初始8,循环模板加2
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
		},
		'arr|1': [1,2,3],
		'function': () => {
			return "this is created by function"
		},
		'reg': /[1-9][a-z]/,
		email: Mock.mock('@email'),
		range: Random.range(1,9,2),
		rfloat: Random.float(2,3,0,2),
		date: Random.date('yyyy'),
		time: Random.time('HH:mm:ss'),
		datetime: Random.datetime('yyyy-MM-dd'),
		now: Random.now('hour','yyyy-MM-dd a hh:mm'),
		img: Random.image('100x200','#00ff00','#000','png','jack006.com'),
		base64Img: Random.dataImage(),
		bgColor: Random.color(),
		cword: Random.cword('北京欢迎你',2,5),
		ctitle: Random.ctitle(5,10),
		csentence: Random.csentence(2,20),
		cname: Random.cname(),
		ip: Random.ip(),
		email1: Random.email('jack006.com'),
		address: Random.city(),
		uperFirstLetter : Random.capitalize('good'),
		pick: Random.pick( [1,5,6,7]),
		shuffle: Random.shuffle([1,2,3,4,5]),
		guid: Random.guid(),
		id: Random.id(),
		incrementID: Random.increment(2),
		define: Random.fruit() // 自定义方法
	}
	return Mock.mock(template)
}


