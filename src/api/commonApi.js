/**
 * Created by PC-SE on 2018-07-20.
 */

import request from '@/utils/request'

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
	params.append("type", "5");
	return new Promise((resolve, reject) => {
		return request({
			url: 'user/getUsersByType',
			method: 'post',
			data: {}
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
	params.append("type", "3");
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