/**
 * Created by HT on 2018-07-19.
 */
import request from '@/utils/request'

export function getAllRole() {
	let params = new URLSearchParams();
	return request({
		url: 'role/list',
		method: 'post',
		data: params
	})
}

export function selectUsers(condition) {
    let params = new URLSearchParams();
    let keys = Object.keys(condition);
    for (let key of keys) {
        params.append(key, condition[key]);
    }
    return request({
        url: 'user/selectUsers',
        method: 'post',
        data: params
    })
}

export function addStaff(condition) {
    return request({
        url: 'user/addStaff',
        method: 'post',
        data: condition
    })
}


export function updateUser(condition) {
    return request({
        url: 'user/update',
        method: 'post',
        data: condition
    })
}

export function addAgent(condition) {
	return request({
		url: 'agent/add',
		method: 'post',
		data: condition
	})
}

export function updateAgent(condition) {
	return request({
		url: 'agent/update',
		method: 'post',
		data: condition
	})
}

export function deleteAgent(id) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		params.append('id', id);
		return request({
			url: 'agent/delete',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function deleteUser(id) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		params.append('id', id);
		return request({
			url: 'user/delete',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function getAgentList(condition) {
	return request({
		url: 'agent/list',
		method: 'post',
		data: condition
	})
}

export function findByName(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, condition[key]);
		}
		return request({
			url: 'agent/findByName',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}
