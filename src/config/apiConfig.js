const APIConfig = {

	request_server_url: '/api/',  // for axios ajax url

	EveryPageNum: 10, //每页显示记录数

	//机器状态
	MachineStatusList: [
		{value: 0, name: '待分配'},
		{value: 2, name: '待调试'},
		{value: 1, name: '已安装'},
	],
}

export  {APIConfig}