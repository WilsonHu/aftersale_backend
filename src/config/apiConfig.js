const APIConfig = {

	request_server_url: '/api/',  // for axios ajax url

	EveryPageNum: 10, //每页显示记录数

	//机器状态
	MachineStatusList: [
		{value: 0, name: '未绑定'},
		{value: 1, name: '已绑定'},
		{value: 2, name: '待安装'},
		{value: 3, name: '正常'},
		{value: 4, name: '待保养'},
		{value: 5, name: '待修理'},
		{value: 6, name: '待审核'},
	],
}

export  {APIConfig}