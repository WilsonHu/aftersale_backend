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
        url: 'user/requestLogin',
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

export function getUserList(account) {
    return request({
        url: 'user/selectByAccount',
        method: 'post',
        params: {token}
    })
}
