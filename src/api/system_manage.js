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