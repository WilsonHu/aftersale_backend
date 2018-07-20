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