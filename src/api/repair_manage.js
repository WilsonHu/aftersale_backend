/**
 * Created by PC-SE on 2018-08-06.
 */
import request from '@/utils/request'

export function getRepairRecordInfoList(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, condition[key]);
		}
		return request({
			url: 'repair/record/getRepairRecordInfoList',
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
			url: 'repair/record/AssignTask',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function assignTaskAgain(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, JSON.stringify(condition[key]));
		}
		return request({
			url: 'repair/record/AssignTaskAgain',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function assignTaskForward(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, JSON.stringify(condition[key]));
		}
		return request({
			url: 'repair/record/AssignTaskForward',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function getIssuePositionList(condition) {
	let params = new URLSearchParams();
	let keys = Object.keys(condition);
	for (let key of keys) {
		params.append(key, JSON.stringify(condition[key]));
	}
	return new Promise((resolve, reject) => {
		return request({
			url: 'issue/position/list/list',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function addIssuePosition(data) {
	return new Promise((resolve, reject) => {
		return request({
			url: 'issue/position/list/add',
			method: 'post',
			data: data
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function updateIssuePosition(data) {
	return new Promise((resolve, reject) => {
		return request({
			url: 'issue/position/list/update',
			method: 'post',
			data: data
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function deleteIssuePosition(id) {
	let params = new URLSearchParams();
	params.append('id', id);
	return new Promise((resolve, reject) => {
		return request({
			url: 'issue/position/list/delete',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function getRepairMembers(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, condition[key]);
		}
		return request({
			url: 'repair/members/getMembersByRepairRecordId',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function getPartsInfoList(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, condition[key]);
		}
		return request({
			url: 'parts/info/getPartsInfoList',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function updatePartsInfo(data) {
	// let params = new URLSearchParams();
	// params.append("partsInfo", data);
	return new Promise((resolve, reject) => {
		return request({
			url: 'parts/info/updateStatus',
			method: 'post',
			data: data
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}