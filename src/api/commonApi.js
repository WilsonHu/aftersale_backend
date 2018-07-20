/**
 * Created by PC-SE on 2018-07-20.
 */

import request from '@/utils/request'

export function getMachineTypeList() {
	return request({
		url: 'SinsimProcessDB/getMachineTypeList',
		method: 'post',
		data: ""
	})
}
