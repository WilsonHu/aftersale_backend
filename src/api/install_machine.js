/**
 * Created by PC-SE on 2018-07-19.
 */
import request from '@/utils/request'

export function getNotInstallMachineList(condition) {
	let params = new URLSearchParams();
	params.append('page', condition.page);
	params.append('size', condition.size);
	const data = {
		"page": condition.page,
		"size": condition.size,
	}
	return request({
		url: 'SinsimProcessDB/getMachineList',
		method: 'post',
		data: params
	})
}