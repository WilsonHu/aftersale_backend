import request from '@/utils/request'

export function loginByAccount(account, password) {
	const params = new URLSearchParams();
	params.append('account', account);
	params.append('password', password);
	const data = {
		"account": account,
		"password": password,
	}
	return request({
		url: 'login',
		method: 'post',
		data: params
	})
}

export function logout() {
	return request({
		url: '/login/logout',
		method: 'post'
	})
}

export function getUserInfo(token) {
	return request({
		url: '/user/info',
		method: 'get',
		params: {token}
	})
}

export function getAgentInfo(id) {
	const params = new URLSearchParams();
	params.append('id', id);
	return request({
		url: '/agent/detail',
		method: 'post',
		data: params,
	})
}
