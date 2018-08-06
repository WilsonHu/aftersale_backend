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