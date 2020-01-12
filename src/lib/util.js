import Cookie from 'js-cookie'
import clonedeep from 'clonedeep'
import {doCustomTimes, objEqual} from "@/lib/tools";

export const setTitle = (title) => {
	window.document.title = title || 'admin';
};


export const setToken = (token, tokenName = 'token') => {
	Cookie.set(tokenName,token);
};

export const getToken = (tokenName = 'token') => {
	return Cookie.get(tokenName);
};

export const putFileInFolder = (folderList, fileList) => {
	const folderListCloned = clonedeep(folderList);
	const fileListCloned = clonedeep(fileList);
	return folderListCloned.map(folderItem => {
		const folderId = folderItem.id;
		let index = fileListCloned.length;
		while (--index >= 0) {
			const fileItem = fileListCloned[index];
			if (fileItem.folder_id === folderId ) {
				const file = fileListCloned.splice(index,1)[0];
				file.title = file.name;
				if (folderItem.children) folderItem.children.push(file);
				else folderItem.children = [file];
			}
		};
		folderItem.type = 'folder';
		return folderItem;
	});
};

// 扁平文件夹组装为树状
export const transformFolderToTree = folderList => {
	if (!folderList.length) return [];
	const folderListCloned = clonedeep(folderList);
	const handle = id => {
		let arr = [];
		folderListCloned.forEach(folder => {
			if (folder.folder_id === id) {
				const children = handle(folder.id);
				if (folder.children) folder.children = [].concat(folder.children,children);
				else folder.children = children;
				folder.title = folder.name;
				arr.push(folder);
			}
		});
		return arr;
	};
	return handle(0);
};
// 展开文件夹
export const expandSpecifiedFolder = (folderTree, id) => {
	return folderTree.map(item => {
		if (item.type === 'folder') {
			if (item.id === id) {
				item.expand = true;
			} else {
				if (item.children && item.children.length) {
					item.children = expandSpecifiedFolder(item.children, id);
					if (item.children.some(child => {
						return child.expand === true;
					}))  {
						item.expand = true;
					} else {
						item.expand =false;
					}
				}
			}
		}
		return item;
	})
};

// 判断路由对象是否相等
export const routeEqual = (route1,route2) => {
	const param1 = route1.params || {};
	const param2 = route2.params || {};
	const query1 = route1.query || {};
	const query2 = route2.query || {};
	return route1.name === route2.name && objEqual(param1,param2) && objEqual(query1,query2);
};

// 判断tabList中是否存在改路由
export const routeHasExist = (tabList, routeItem) => {
	let len = tabList.length;
	let res = false;
	tabList.forEach(tabItem => {
		if (routeEqual(tabItem,routeItem)) res = true;
	});
	return res;
};

// 将对象中的key与value转为数组
const getKeyValueArr = obj => {
	let arr = [];
	Object.entries(obj).sort((a,b) => {
		return a[0] - b[0];
	}).forEach(([ _key, _val ]) => {
		arr.push(_key,_val);
	});
	return arr;
};

// 获取当前路由的名称  params:name_jack&a=1&b=2
export const getTableNameByRoute = route => {
	const {name, params, query} = route;
	let res = name;
	if (params && Object.keys(params).length) res += ':'+ getKeyValueArr(params).join("_");
	if (query && Object.keys(query).length)  res += '&'+ getKeyValueArr(query).join("_");
	return res;
};

// 根据切割数组获取对象  &a=11&b=22 => {a:11,b:22}
const getObjBySplitStr = (id, splitStr) => {
	let splitArr = id.split(splitStr);
	// 去右边的
	let str = splitArr[splitArr.length-1];
	// [a,11,b,22]
	let keyValArr = str.split("_");
	let res = {};
	let i = 0;
	let len = keyValArr.length;
	while (i<len) {
		res[keyValArr[i]] =keyValArr[i+1];
		i += 2;
	}
	return res;
};
// 根据路由名称获取路由对象
export const getRouteObjById = id => {
	let res = {};
	if (id.includes('&')) {
		res.query = getObjBySplitStr(id, '&');
		// 去左边的param参数
		id = id.split('&')[0];
	}
	if (id.includes(':')) {
		res.params = getObjBySplitStr(id, ':');
		// 去左边的参数
		id = id.split(':')[0];
	}
	res.name = id;
	return res;
};

// 根据名称获取打开的路由数组
export const getOpenArrayByName = (name, routerList) => {
	let arr = [];
	routerList.some(item => {
		if (item.name === name) {
			arr.push(item.name);
			return true
		}
		if (item.children && item.children.length ) {
			let childArr = getOpenArrayByName(name, item.children);
			if (childArr.length){
				arr = arr.concat(item.name, childArr);
				return true
			}
		}
	});
	return arr;
};

// 保存本地对象
export const localSave = (name, value) => {
	localStorage.setItem(name, value);
};

// 读取本地对象
export const localRead = (name) => {
	return localStorage.getItem(name);
}

