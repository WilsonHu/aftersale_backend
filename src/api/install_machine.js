/**
 * Created by PC-SE on 2018-07-19.
 */
import request from '@/utils/request'

export function getNotInstallMachineList(condition) {
    let params = new URLSearchParams();
    params.append('page', condition.page);
    params.append('size', condition.size);
    return request({
        url: 'SinsimProcessDB/getMachineList',
        method: 'post',
        data: params
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
    let params = new URLSearchParams();
    params.append('id', id);
    return request({
        url: 'install/lib/delete',
        method: 'post',
        data: params
    })
}