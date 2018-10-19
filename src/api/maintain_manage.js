/**
 * Created by PC-SE on 2018-07-26.
 */
import request from '@/utils/request'

//maintain
export function getMaintainRecordInfoList(condition) {
	let params = new URLSearchParams();
	let keys = Object.keys(condition);
	for (let key of keys) {
		params.append(key, condition[key]);
	}
	return new Promise((resolve, reject) => {
		return request({
			url: 'maintain/record/getMaintainRecordInfoList',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}


//maintain_type
export function getMaintainTypeList(condition) {
	let params = new URLSearchParams();
	let keys = Object.keys(condition);
	for (let key of keys) {
		params.append(key, condition[key]);
	}
	return new Promise((resolve, reject) => {
		return request({
			url: 'maintain/type/list',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function addMaintainType(maintainType) {
	// let params = new URLSearchParams();
	// params.append('maintainType', JSON.stringify(maintainType));
	return new Promise((resolve, reject) => {
		return request({
			url: 'maintain/type/add',
			method: 'post',
			data: maintainType
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function updateMaintainType(maintainType) {
	let params = new URLSearchParams();
	params.append('maintainType', JSON.stringify(maintainType));
	return new Promise((resolve, reject) => {
		return request({
			url: 'maintain/type/update',
			method: 'post',
			data: maintainType
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function deleteMaintainType(id) {
	let params = new URLSearchParams();
	params.append('id', id);
	return new Promise((resolve, reject) => {
		return request({
			url: 'maintain/type/delete',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}


export function selectLibList(condition) {
	let params = new URLSearchParams();
	let keys = Object.keys(condition);
	for (let key of keys) {
		params.append(key, condition[key]);
	}
	return request({
		url: 'maintain/lib/selectLibList',
		method: 'post',
		data: params
	})
}

export function addMaintainLib(maintainLib) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		params.append('maintainLib', JSON.stringify(maintainLib));
		return request({
			url: 'maintain/lib/add',
			method: 'post',
			data: maintainLib
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function updateMaintainLib(maintainLib) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		params.append('maintainLib', JSON.stringify(maintainLib));
		return request({
			url: 'maintain/lib/update',
			method: 'post',
			data: maintainLib
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function deleteMaintainLib(id) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		params.append('id', id);
		return request({
			url: 'maintain/lib/delete',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function deleteMaintainLibByCondition(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		params.append('maintainType', condition.maintainType);
		params.append('maintainLibName', condition.maintainLibName);
		return request({
			url: 'maintain/lib/deleteByName',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function assignTaskToSubmit(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, JSON.stringify(condition[key]));
		}
		return request({
			url: 'maintain/record/AssignTask',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

// /add
export function addMainTainRecorder(submitData) {
	let params = new URLSearchParams();
	let keys = Object.keys(submitData);
	for (let key of keys) {
		params.append(key, submitData[key]);
	}
	return new Promise((resolve, reject) => {
		return request({
			url: 'maintain/record/addList',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function updateMaintainInfo(submitData) {
	return new Promise((resolve, reject) => {
		return request({
			url: 'maintain/record/updateMaintainInfo',
			method: 'post',
			data: submitData
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function getMaintainDetail(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, condition[key]);
		}
		return request({
			url: 'maintain/record/getMaintainRecordInfoList',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}


export function getMaintainMembers(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, condition[key]);
		}
		return request({
			url: 'maintain/members/getMembersByMaintainRecordId',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

