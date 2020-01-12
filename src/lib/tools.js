export const doCustomTimes = (times, callback) => {
	let i = -1;
	while (++i < times) {
		callback(i)
	}
};

// 判断两个对象是否相等
export  const objEqual = (obj1, obj2) => {
	const keysArray1 = Object.keys(obj1);
	const keyArray2 = Object.keys(obj2);
	if (keysArray1.length !== keyArray2.length) return false;
	else if (keysArray1.length === 0 && keyArray2.length === 0) return true;
	else return !keysArray1.some(key => obj1[key] !== obj2[key]);
};


