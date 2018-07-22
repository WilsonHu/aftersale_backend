/**
 * Created by PC-SE on 2018-07-19.
 */
import request from '@/utils/request'

export function getNotInstallMachineList(condition) {
    return new Promise((resolve, reject) => {
        let params = new URLSearchParams();
        let keys = Object.keys(condition);
        for (let key of keys) {
            params.append(key, condition[key]);
        }
        return request({
            url: 'SinsimProcessDB/getMachineList',
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
    params.append('isBaseLib', condition.isBaseLib);
    params.append('installLibName', condition.installLibName);
    return request({
        url: 'install/lib/selectLibList',
        method: 'post',
        data: params
    })
}

export function addInstallItem(installLib) {
    let params = new URLSearchParams();
    params.append('installLib', JSON.stringify(installLib));
    return request({
        url: 'install/lib/add',
        method: 'post',
        data: params
    })
}

export function updateInstallItem(installLib) {
    let params = new URLSearchParams();
    params.append('installLib', JSON.stringify(installLib));
    return request({
        url: 'install/lib/update',
        method: 'post',
        data: params
    })
}

export function deleteInstallItem(id) {
    return new Promise((resolve, reject) => {
        let params = new URLSearchParams();
        params.append('id', id);
        return request({
            url: 'install/lib/delete',
            method: 'post',
            data: params
        }).then(response=> {
            resolve(response);
        }).catch(error=> {
            reject(error);
        })
    })
}

export function deleteInstallItemByCondition(condition) {
    return new Promise((resolve, reject) => {
        let params = new URLSearchParams();
        params.append('isBaseLib', condition.isBaseLib);
        params.append('installLibName', condition.installLibName);
        return request({
            url: 'install/lib/deleteByName',
            method: 'post',
            data: params
        }).then(response=> {
            resolve(response);
        }).catch(error=> {
            reject(error);
        })
    })
}

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

//requestCustomerList
export function requestCustomerList() {
    return new Promise((resolve, reject) => {
        return request({
            url: 'user/list',
            method: 'post',
            data: {}
        }).then(response=> {
            resolve(response);
        }).catch(error=> {
            reject(error);
        })
    })
}