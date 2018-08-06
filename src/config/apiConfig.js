const APIConfig = {

    request_server_url: '/api/',  // for axios ajax url

    EveryPageNum: 10, //每页显示记录数

    YESORNOList: [
        {
            value: 0,
            text: "否",
        },
        {
            value: 1,
            text: "是",
        }
    ],

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

    //保养状态 0：待分配，1：已分配(但未接单）2：已接受任务，3：保养完成(客户未确认)，4：客户已确认保养结果
    MaintainStatusList: [
        {value: 0, name: '未开始'},
        {value: 1, name: '已分配'},
        {value: 2, name: '进行中'},
        {value: 3, name: '完成待确认'},
        {value: 4, name: '已确认'},
    ],

    //保养状态 0：待分配，1：已分配(但未接单）2：已接受任务，3：保养完成(客户未确认)，4：客户已确认保养结果
    InstallStatusList: [
        {value: 0, name: '未开始'},
        {value: 1, name: '已分配'},
        {value: 2, name: '进行中'},
        {value: 3, name: '完成待确认'},
        {value: 4, name: '已确认'},
    ]
}

export  {APIConfig}