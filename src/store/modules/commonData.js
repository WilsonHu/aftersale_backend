/**
 * Created by PC-SE on 2018-07-20.
 */
import {getMachineTypeList} from '@/api/commonApi'

const commonData = {
	state: {
		machineTypeList: [],
	},
	mutations: {
		SET_MachineTypeList: (state, machineTypeList) => {
			sessionStorage.setItem("machineTypeList", JSON.stringify(machineTypeList));
			state.machineTypeList = machineTypeList;
		},
	},
	actions: {
		// 用户名登录
		getAllMachineType({commit}) {
			if (commonData.state.machineTypeList != null && commonData.state.machineTypeList.length > 0) {
				resolve()
				return;
			}
			return new Promise((resolve, reject) => {
					getMachineTypeList().then(response => {
						if (response.status == 200) {
							let data = response.data.data.list;
							commit('SET_MachineTypeList', data)
							resolve()
						}
						else {
							reject("get MachineTypeList failed!")
						}
					}).catch(error => {
						reject(error)
					})
				}
			)
		},
	}
}

export default commonData;