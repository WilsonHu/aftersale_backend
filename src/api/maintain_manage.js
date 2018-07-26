/**
 * Created by PC-SE on 2018-07-26.
 */
import request from '@/utils/request'

//maintain_type
export function getMaintainTypeList() {
	let params = new URLSearchParams();
	return new Promise((resolve, reject) => {
		return request({
			url: 'maintain/type/list',
			method: 'post',
			data: ''
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function addMaintainType(maintainType) {
	let params = new URLSearchParams();
	params.append('maintainType', JSON.stringify(maintainType));
	return new Promise((resolve, reject) => {
		return request({
			url: 'maintain/type/add',
			method: 'post',
			data: params
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
			data: params
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
	params.append('page', condition.page);
	params.append('size', condition.size);
	params.append('maintainType', condition.maintainType);
	params.append('maintainLibName', condition.maintainLibName);
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
			data: params
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
			data: params
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