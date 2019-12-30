import Cookie from 'js-cookie'
import clonedeep from 'clonedeep'

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
		while (--index > 0) {
			const fileItem = fileListCloned[index];
			if (fileItem.folder_id === folderId ) {
				const file = fileListCloned.splice(index,1);
				file.title = file.name;
				if (folderItem.children) folderItem.children.push(file);
				else folderItem.children = [file];
			}
		};
		folderItem.type = 'folder';
		return folderItem;
	});
};
