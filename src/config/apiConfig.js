const APIConfig = {

	request_server_url: '/api',  // for axios ajax url

	WEBURL: 'https://eservice-tech.cn/',

	FilterUrl: '/home/sinsim/output/aftersale/',

	EveryPageNum: 10, //每页显示记录数

	USER_TYPE_STAFF: 1,

	USER_TYPE_CUSTOMER: 2,

	DateRangeOptions: {
		shortcuts: [{
			text: '最近一周',
			onClick(picker) {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
				picker.$emit('pick', [start, end]);
			}
		}, {
			text: '最近一个月',
			onClick(picker) {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				picker.$emit('pick', [start, end]);
			}
		}, {
			text: '最近三个月',
			onClick(picker) {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
				picker.$emit('pick', [start, end]);
			}
		}]
	},
	DateOptions: {
		shortcuts: [{
			text: '今天',
			onClick(picker) {
				picker.$emit('pick', new Date());
			}
		}, {
			text: '昨天',
			onClick(picker) {
				const date = new Date();
				date.setTime(date.getTime() - 3600 * 1000 * 24);
				picker.$emit('pick', date);
			}
		}, {
			text: '一周前',
			onClick(picker) {
				const date = new Date();
				date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
				picker.$emit('pick', date);
			}
		}]
	},

	AssignTaskType: {
		INSTALL: 0,
		MAINTAIN: 1,
		REPAIR: 2,
	},

	UserType: {
		SuperAdmin: 1,
		Admin: 2,
		Staff: 3,
		Agent: 4,
		Customer: 5,
		CustomerContacter: 6
	},

	UserRole: [
		{
			name: "Unknown",
			value: 0,
			title: "未知用户",
		},
		{
			name: "SuperAdmin",
			value: 1,
			title: "超级管理员",
		},
		{
			name: "Admin",
			value: 2,
			title: "管理员",

		},
		{
			name: "Agent",
			value: 4,
			title: "代理商",
		},
	],

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
		{value: 0, name: '待派单'},
		{value: 1, name: '已派单'},
		{value: 2, name: '已接受'},
		{value: 3, name: '完成待确认'},
		{value: 4, name: '已确认'},
	],

	//保养状态 0：待分配，1：已分配(但未接单）2：已接受任务，3：保养完成(客户未确认)，4：客户已确认保养结果
	InstallStatusList: [
		{value: 0, name: '待派单'},
		{value: 1, name: '已派单'},
		{value: 2, name: '已接受'},
		{value: 3, name: '完成待确认'},
		{value: 4, name: '已确认'},
	],

	/**
	 * 维修状态
	 * 0：未派单，
	 * 1：已派单（但未接单）,
	 * 2： 已接受任务，
	 * 3：维修成功(客户未确认)，
	 * 4：无法维修，维修被转派（不需要客户确认），
	 * 5.客户已确认（维修成功）。
	 * 转派后，前面的维修记录要保留，但是客户只需要看到成功的最后那次记录。
	 */
	RepairStatusList: [
		{value: 0, name: '报修中'},
		{value: 1, name: '未派单'},
		{value: 2, name: '已派单'},
		{value: 3, name: '已接受'},
		{value: 4, name: '失败'},
		{value: 5, name: '已再派'},
		{value: 6, name: '已转派'},
		{value: 7, name: '完成待确认'},
		{value: 8, name: '客户确认'},
	],

	/**
	 * 0：保修期已过，1：在保修期内
	 */
	InWarrantyPeriodList: [
		{value: 0, name: '已过保'},
		{value: 1, name: '保修期内'},
	],

	/**
	 * 0：生产部，1：客户， 2: 售后
	 */
	MachineSourceList: [
		{value: 0, name: '生产部'},
		{value: 1, name: '客户'},
		{value: 2, name: '售后'},
	],
	MachineCheckStatusList: [
		{value: 0, name: '未通过'},
		{value: 1, name: '通过'},
	],

	// 	* 1: 无需回寄，其他表示需要寄回
	// * 2：未寄回，
	// * 3：已寄回（待售后确认）
	// * 4：售后已确认
	SendBackStatusList: [
		{value: 1, name: '无'},
		{value: 2, name: '待寄回'},
		{value: 3, name: '已寄回'},
		{value: 4, name: '已确认'},

	],
}

export {APIConfig}