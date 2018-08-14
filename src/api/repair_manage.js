/**
 * Created by PC-SE on 2018-08-06.
 */
import request from '@/utils/request'

export function getRepairRecordInfoList(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, condition[key]);
		}
		return request({
			url: 'repair/record/getRepairRecordInfoList',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function assignTaskToSubmit(condition) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams();
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, JSON.stringify(condition[key]));
		}
		return request({
			url: 'repair/record/AssignTask',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function getIssuePositionList() {
	return new Promise((resolve, reject) => {
		return request({
			url: 'issue/position/list/list',
			method: 'post',
			data: {}
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function addIssuePosition(data) {
	return new Promise((resolve, reject) => {
		return request({
			url: 'issue/position/list/add',
			method: 'post',
			data: data
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function updateIssuePosition(data) {
	return new Promise((resolve, reject) => {
		return request({
			url: 'issue/position/list/update',
			method: 'post',
			data: data
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

export function deleteIssuePosition(id) {
	let params = new URLSearchParams();
	params.append('id', id);
	return new Promise((resolve, reject) => {
		return request({
			url: 'issue/position/list/delete',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}
