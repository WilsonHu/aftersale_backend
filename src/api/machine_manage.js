/**
 * Created by PC-SE on 2018-07-26.
 */
import request from '@/utils/request'

export function addMachine(machine) {
	return new Promise((resolve, reject) => {
		return request({
			url: 'machine/add',
			method: 'post',
			data: machine
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function updateMachine(machine) {
	return new Promise((resolve, reject) => {
		return request({
			url: 'machine/update',
			method: 'post',
			data: machine
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function deleteMachine(id) {
    let params = new URLSearchParams();
    params.append('id', id);
    return new Promise((resolve, reject) => {
        return request({
            url: 'machine/delete',
            method: 'post',
            data: params
        }).then(response=> {
            resolve(response);
        }).catch(error=> {
            reject(error);
        })
    })
}

