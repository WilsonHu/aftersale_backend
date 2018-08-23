/**
 * Created by PC-SE on 2018-07-20.
 */

import request from '@/utils/request'
import store from '@/store'


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
//注意agentId参数，是机器的代理商，如果是sinsim则为0
export function requestCustomerList(condition) {
	let params = new URLSearchParams();
	if (condition) {
		let keys = Object.keys(condition);
		for (let key of keys) {
			params.append(key, condition[key]);
		}
	}
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


//查询员工集合 type=3
//员工跟登录的角色相关代理商只能查代理商的员工。sinsim查sinsim的员工
export function requestEmployeeList() {
	let params = new URLSearchParams();
	params.append("agentId", store.getters.user.user.agent)
	return new Promise((resolve, reject) => {
		return request({
			url: 'user/getStaffByParam',
			method: 'post',
			data: params
		}).then(response=> {
			resolve(response);
		}).catch(error=> {
			reject(error);
		})
	})
}

var DEFAULTSCORE = 5;
export function loadServerScore(scoreData) {
	if (scoreData == "" || scoreData == null) {
		scoreData = 0;
	}
	var scores = Number(scoreData);
	var list = [];
	for (let i = 0; i < DEFAULTSCORE; i++) {
		list.push({
			score: i + 1,
			starMode: 0,
		})
	}
	var allStar = 0;
	var halfStar = 0;
	var defaultStar = 0;

	if (isInteger(scores)) {
		allStar = scores;
		defaultStar = DEFAULTSCORE - allStar;
		halfStar = 0;
	} else {
		allStar = Math.floor(scores);
		defaultStar = DEFAULTSCORE - (allStar + 1);
		halfStar = 1;
	}
	for (let i = 0; i < allStar; i++) {
		list[i].starMode = 2;//全星
	}
	for (let i = 0; i < halfStar; i++) {
		list[allStar + i].starMode = 1;//半星
	}
	for (let i = 0; i < defaultStar; i++) {
		list[allStar + halfStar].starMode = 0;//默认星
	}
	return list;
}

export function getStarMode(mode)
{
	if (mode == 1) {
		return "star_half";
	}
	if (mode == 2) {
		return "star_full";
	}
	return "star_none";
}