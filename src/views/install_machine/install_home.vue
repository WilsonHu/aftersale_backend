<template >
    <div class="install_home_div" >
        <div >
            <el-col class="well well-lg" style="background-color: white;" >
                <el-form :model="condition" label-position="right" label-width="90px" >
                    <el-row >
                        <el-col :span="5" >
                            <el-form-item label="机器编号:" >
                                <el-input v-model="condition.nameplate"
                                          placeholder="订单号" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >
                        <el-col :span="5" >
                            <el-form-item label="订单编号:" >
                                <el-input v-model="condition.orderNum"
                                          placeholder="订单号" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >
                        <el-col :span="5" >
                            <el-form-item label="机型:" >
                                <el-select v-model="condition.machineType" clearable >
                                    <el-option
		                                    v-for="item in allMachineType"
		                                    :value="item.value"
		                                    :label="item.name" >
                                    </el-option >
                                </el-select >
                            </el-form-item >
                        </el-col >
                        <el-col :span="3" :offset="1" >
                            <el-form-item label="显示代理商:" >
                                <el-switch
		                                v-model="condition.isAgent"
		                                active-text="是"
		                                inactive-text="否" >
                                </el-switch >
                            </el-form-item >
                        </el-col >
                        <el-col :span="5" v-show="condition.isAgent" >
                            <el-form-item label="" >
                                <el-input v-model="condition.agent"
                                          placeholder="代理商" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >
                    </el-row >
                    <el-row >
                        <el-col :span="5" >
                            <el-form-item label="完成状态:" >
                                <el-select v-model="condition.status" clearable >
                                    <el-option
		                                    v-for="item in statusList"
		                                    :value="item.value"
		                                    :label="item.name" >
                                    </el-option >
                                </el-select >
                            </el-form-item >
                        </el-col >
                        <el-col :span="5" >
                            <el-form-item label="客户:" >
                                <el-input v-model="condition.customer"
                                          placeholder="客户" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >

                        <el-col :span="8" >
                            <el-form-item label="日期:" >
                                <el-date-picker
		                                v-model="condition.selectDate"
		                                type="daterange"
		                                align="left"
		                                unlink-panels
		                                range-separator="—"
		                                start-placeholder="开始日期"
		                                end-placeholder="结束日期"
		                                :picker-options="pickerOptions" >
                                </el-date-picker >
                            </el-form-item >
                        </el-col >
                        <el-col :span="2" :offset="3" >
                            <el-button
		                            icon="el-icon-search"
		                            size="normal"
		                            type="primary"
		                            @click="search" >查询
                            </el-button >
                        </el-col >
                    </el-row >
                </el-form >
                <el-table
		                v-loading="loadingUI"
		                element-loading-text="获取数据中..."
		                :data="tableData"
		                border
		                empty-text="暂无数据..."
		                ref="singleTable"
		                highlight-current-row
		                show-overflow-tooltip="true"
		                style="width: 100%; " >
                    <el-table-column
		                    width="75"
		                    align="center"
		                    label="序号" >
                        <template scope="scope" >
                            {{scope.$index+startRow+1}}
                        </template >
                    </el-table-column >

                    <el-table-column
		                    align="center"
		                    prop="nameplate"
		                    label="机器编号" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="machineType"
		                    label="机型" >
                    <template scope="scope" >
                    <div >
                    {{scope.row.machineType|filterMachineType}}
                    </div >
                    </template >
                    </el-table-column >
                    <el-table-column label="订单号"
                                     align="center"
                                     prop="orderNum" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.orderNum}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="customer"
		                    label="客户" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="customer"
		                    label="代理商" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    label="安装状态" >
                        <template scope="scope" >
                            <div v-if="scope.row.status==0"
                                 style="color: #686868" >
                                {{scope.row.status}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    label="交货日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.shipTime)|filterDateString}}
                        </span >
                        </template >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="processCreateTime"
		                    label="出厂日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.processCreateTime)|filterDateString}}
                        </span >
                        </template >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="processCreateTime"
		                    label="完成日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.processCreateTime)|filterDateString}}
                        </span >
                        </template >
                    </el-table-column >

                    <el-table-column width="150"
                                     label="操作" align="center" >
                        <template scope="scope" style="text-align: center" >
                            <el-tooltip placement="top" content="详情" >
                                <el-button
		                                size="mini"
		                                type="primary"
		                                icon="el-icon-view"
		                                @click="editWithItem(scope.row)" >
                                </el-button >
                            </el-tooltip >
                            <el-tooltip placement="top" content="派单" >
                                <el-button
		                                size="mini"
		                                type="primary"
		                                icon="el-icon-news"
		                                @click="assignTask(scope.row)" >
                                </el-button >
                            </el-tooltip >
                        </template >
                    </el-table-column >
                </el-table >
                <div class="block" style="text-align: center; margin-top: 20px" >
                    <el-pagination
		                    background
		                    @current-change="handleCurrentChange"
		                    :current-page="currentPage"
		                    :page-size="pageSize"
		                    layout="total, prev, pager, next, jumper"
		                    :total="totalRecords" >
                    </el-pagination >
                </div >
	            <el-dialog title="查看" :visible.sync="showDetailDialog" append-to-body width="75%" >
	                <install-detail :tabSwitchClick="tabContentClick" :formData="formData" :activeTabId="activeTabId"></install-detail >
		            <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
                        <el-button @click="showDetailDialog = false" icon="el-icon-back" >关闭</el-button >
                    </div >
	            </el-dialog >
            </el-col >

        </div >
    </div >
</template >

<script >
    import {APIConfig} from '@/config/apiConfig'
    import {Loading} from 'element-ui';
    import {getNotInstallMachineList} from '@/api/install_machine';
    import InstallDetail from '@/views/install_machine/install_detail';
    var _this;
    export default {
	    name: 'install_home',
	    components: {InstallDetail},
	    data() {
		    _this = this;
		    return {

		    	//detail info
			    formData: {},
			    machineNameplate: '',
			    selectedItem: {},
			    activeTabId: '0',
			    //detail info

			    tableData: [],
			    //分页
			    pageSize: APIConfig.EveryPageNum,//每一页的num
			    currentPage: 1,
			    startRow: 0,
			    totalRecords: 0,
			    statusList: APIConfig.MachineStatusList,
			    condition: {
				    nameplate: '',
				    orderNum: '',
				    machineType: '',
				    customer: '',
				    isAgent: true,
				    agent: '',
				    status: '',
				    selectDate: '',
			    },
			    allMachineType: [],
			    allRoles: [],
			    loadingUI: false,
			    showDetailDialog: false,
			    pickerOptions: {
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
		    }
	    },

	    filters: {
		    filterDateString(strDate)
		    {
			    var resDate = new Date(strDate);
			    return resDate.format("yyyy-MM-dd");
		    },

		    filterStatus(id)
		    {
			    var result = _this.statusList[0].name;
			    for (var i = 0; i < _this.statusList.length; i++) {
				    if (id == _this.statusList[i].value) {
					    result = _this.statusList[i].name;
					    break;
				    }
			    }
			    return result;
		    },
		    filterMachineType(id)
		    {
			    var result = '';
			    for (var i = 0; i < _this.allMachineType.length; i++) {
				    if (id == _this.allMachineType[i].id) {
					    result = _this.allMachineType[i].name;
					    break;
				    }
			    }
			    return result;
		    },
	    },
	    methods: {
		    handleCurrentChange(val) {
			    this.currentPage = val;
			    this.search();
		    },
		    search() {
			    this.onSearchDetailData();
		    },
		    onSearchDetailData()
		    {
			    var condition = {
				    orderNum: this.condition.orderNum.trim(),
				    nameplate: this.condition.nameplate.trim(),
				    query_start_time: '',
				    query_finish_time: '',
				    status: this.condition.status,
				    is_fuzzy: true,
				    page: this.currentPage,
				    size: this.pageSize
			    };
			    if (this.condition.selectDate != null && this.condition.selectDate.length > 0) {
				    condition.query_start_time = this.condition.selectDate[0].format("yyyy-MM-dd");
				    condition.query_finish_time = this.condition.selectDate[1].format("yyyy-MM-dd");
			    }
			    getNotInstallMachineList(condition).then(response => {
				    if (responseIsOK(response)) {
					    _this.tableData = response.data.data.list;
					    _this.totalRecords = response.data.data.total;
					    _this.startRow = response.data.data.startRow;
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "加载数据失败！" : response.data.message)
				    }
			    })
		    },
		    editWithItem(item)//详情
		    {
			    _this.selectedItem = item;
			    _this.machineNameplate = item.nameplate;
			    _this.formData = {
				    customer: 'aaaa',
				    customerPhone: '1367898765',
				    agnet: 'bbbb'
			    };
			    _this.activeTabId = '0';
			    _this.showDetailDialog = true;
		    },

		    tabContentClick(tab)
		    {

		    },

		    assignTask(item)//派单
		    {

		    },

		    initData()
		    {
			    if (_this.$store.getters.commonData.machineTypeList.length > 0) {
				    _this.allMachineType = _this.$store.getters.commonData.machineTypeList;
			    }
			    else {
				    _this.$store.dispatch("getAllMachineType")
						    .then(() => {
							    _this.allMachineType = _this.$store.getters.commonData.machineTypeList;
						    })
						    .catch((e) => {
							    showMSG(_this, "getAllMachineType failed!");
						    });
			    }
		    },
	    },
	    created()
	    {
		    this.search();
		    this.initData();
	    }

    }
</script >

<style scoped >
    .install_home_div {
	    position: relative;
	    padding: 20px;
	    width: 100%;
	    height: 85vh;
    }

    .el-select {
	    width: 100%;
    }
</style >
