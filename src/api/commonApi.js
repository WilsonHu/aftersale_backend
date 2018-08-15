/**
 * Created by PC-SE on 2018-07-20.
 */

import request from '@/utils/request'
import store from '@/store'


//getSaledMachineInfoList
export function getSaledMachineInfoList(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, condition[key]);
		}
		return request({
			url: 'machine/getSaledMachineInfoList',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}


export function getMachineTypeList() {
	return new Promise((resolve, reject) => {
		return request({
			url: 'SinsimProcessDB/getMachineTypeList',
			method: 'post',
			data: ""
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function selectUsers(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		if (condition) {
			let keys = Object.keys(condition);
			for (let key of keys) {
				params.append(key, condition[key]);
			}
		}
		return request({
			url: 'user/list',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

//查询客户集合 -5:客户 -6:客户的联系人
export function requestCustomerList() {
	let params = new URLSearchParams();
	params.append("agentId", store.getters.user.user.agent)
	params.append("roleId", "5");
	return new Promise((resolve, reject) => {
		return request({
			url: 'user/getUsersByType',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}


//查询员工集合 type=3
export function requestEmployeeList() {
	let params = new URLSearchParams();
	params.append("agentId", store.getters.user.user.agent)
	params.append("roleId", "3");
	return new Promise((resolve, reject) => {
		return request({
			url: 'user/getUsersByType',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}