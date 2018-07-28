<template >
    <div class="root_div" >
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
                        <el-col :span="5" >
                            <el-form-item label="代理商完成:" >
                                <el-select v-model="condition.status" clearable >
                                    <el-option
		                                    v-for="item in statusList"
		                                    :value="item.value"
		                                    :label="item.name" >
                                    </el-option >
                                </el-select >
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
                    <el-row >
	                     <el-col :span="5" >
                            <el-form-item label="订单编号:" >
                                <el-input v-model="condition.orderNum"
                                          placeholder="订单号" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >
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
                        <el-col :span="4" >
                            <el-form-item label="保养员:" >
                               <el-input v-model="condition.agent"
                                         placeholder="保养员" clearable
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

                    </el-row >
                </el-form >
                <el-table
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
                            {{scope.$index+startRow}}
                        </template >
                    </el-table-column >

                    <el-table-column
		                    align="center"
		                    prop="machineNameplate"
		                    label="机器编号" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="machineType"
		                    label="机型" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.machineType}}
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
		                    prop="customerName"
		                    label="客户" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="agent"
		                    label="代理商" >
                    </el-table-column >
	                 <el-table-column
			                 align="center"
			                 prop="maintainLibName"
			                 label="保养项" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    label="保养状态" >
                        <template scope="scope" >
                            <div v-if="scope.row.maintainStatus==0"
                                 style="color: #686868" >
                                {{scope.row.maintainStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.maintainStatus==1"
                                 style="color: #8b6c0e" >
                                {{scope.row.maintainStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.maintainStatus==2"
                                 style="color: #13678b" >
                                {{scope.row.maintainStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.maintainStatus==3"
                                 style="color: #198b57" >
                                {{scope.row.maintainStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.maintainStatus==4"
                                 style="color: darkred" >
                                {{scope.row.maintainStatus|filterStatus}}
                            </div >
                        </template >
                    </el-table-column >
	                <el-table-column
			                align="center"
			                label="计划日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.maintainDatePlan)|filterDateString}}
                        </span >
                        </template >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    label="完成日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.maintainDateActual)|filterDateString}}
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
                <el-dialog title="保养详情" :visible.sync="showDetailDialog" append-to-body width="75%" >
                    <!--<install-detail :tabSwitchClick="tabContentClick" :formData="formData"-->
                    <!--:activeTabId="activeTabId"></install-detail>-->
                    <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
                        <el-button @click="showDetailDialog = false" icon="el-icon-back" >关闭</el-button >
                    </div >
                </el-dialog >
	            <el-dialog title="派单" :visible.sync="showAssignTaskDialog" append-to-body width="50%" >
					<AssignTask :showType="0" ref="assignTask"  v-if="showAssignTaskDialog"></AssignTask >
                    <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
	                    <el-button type="primary" @click="onConfirmAssign" icon="el-icon-check" >确定</el-button >
                        <el-button @click="showAssignTaskDialog = false" icon="el-icon-back" >关闭</el-button >
                    </div >
                </el-dialog >
            </el-col >

        </div >
    </div >
</template >

<script >
    import {APIConfig} from '@/config/apiConfig'
    import {Loading} from 'element-ui';
    import {getMaintainRecordInfoList} from '@/api/maintain_manage';
    import AssignTask from '@/views/common_component/assign_task';
    var _this;
    export default {
	    name: 'maintain_home',
	    components: {AssignTask},
	    data() {
		    _this = this;
		    return {

			    //detail info
			    machineNameplate: '',
			    selectedItem: {},
			    //detail info

			    tableData: [],
			    //分页
			    pageSize: APIConfig.EveryPageNum,//每一页的num
			    currentPage: 1,
			    startRow: 0,
			    totalRecords: 0,
			    statusList: APIConfig.MaintainStatusList,
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
			    showDetailDialog: false,
			    showAssignTaskDialog: false,
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
			    if (isUndefined(strDate) || isNull(strDate) || strDate.length == 0) {
				    return '';
			    }
			    let resDate = new Date(strDate);
			    return resDate.format("yyyy-MM-dd");
		    },

		    filterStatus(id)
		    {
			    let result = _this.statusList[0].name;
			    for (let i = 0; i < _this.statusList.length; i++) {
				    if (id == _this.statusList[i].value) {
					    result = _this.statusList[i].name;
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
				    machineType: this.condition.machineType,
				    agent: this.condition.agent,
				    customerName: this.condition.customer,
				    status: this.condition.status,
				    page: this.currentPage,
				    size: this.pageSize,
				    isFuzzy: true,
			    };
			    getMaintainRecordInfoList(condition).then(response=> {
				    if (responseIsOK(response)) {
					    _this.tableData = response.data.data.list;
					    _this.totalRecords = response.data.data.total;
					    _this.startRow = response.data.data.startRow;
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)

				    }
			    })
		    },
		    assignTask(row)
		    {
			    _this.showAssignTaskDialog = true;
			    if (this.$refs.assignTask) {
				    _this.$refs.assignTask.loadData();//方法1
				    //this.$refs.AssignTask.$emit('onShowDetail') // 方法2，子控件需要注册相应的事件
			    }
		    },
		    onConfirmAssign()
		    {
			    _this.showAssignTaskDialog = false;
		    },

		    editWithItem(row)
		    {

		    }

	    },
	    created()
	    {
		    this.search();
	    }
    }

</script >

<style scoped >
    .root_div {
	    position: relative;
	    padding: 20px;
	    width: 100%;
	    height: 85vh;
    }

    .el-select {
	    width: 100%;
    }
</style >
