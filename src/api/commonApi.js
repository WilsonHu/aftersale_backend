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