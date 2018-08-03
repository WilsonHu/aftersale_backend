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
    return request({
        url: 'user/list',
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