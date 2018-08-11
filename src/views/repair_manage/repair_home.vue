<template >
  <div class="root_div" >
      <div >
	     <el-col class="well well-lg" style="background-color: white;" >
                <el-form :model="condition" label-position="right" label-width="90px" >
                    <el-row >
                        <el-col :span="5" >
                            <el-form-item label="机器编号:" >
                                <el-input v-model="condition.nameplate"
                                          placeholder="机器编号" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >
                        <el-col :span="5" >
                            <el-form-item label="订单编号:" >
                                <el-input v-model="condition.orderNum"
                                          placeholder="订单编号" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >
	                     <el-col :span="5" >
                            <el-form-item label="状态:" >
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
	                    <el-col :span="2" :offset="1" >
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
                            <el-form-item label="范围:" >
                                <el-select v-model="condition.scope" clearable >
                                    <el-option
		                                    v-for="item in statusList"
		                                    :value="item.value"
		                                    :label="item.name" >
                                    </el-option >
                                </el-select >
                            </el-form-item >
                        </el-col >
	                    <el-col :span="5" >
                            <el-form-item label="代理商:" >
                                 <el-input v-model="condition.agent"
                                           placeholder="代理商" clearable
                                           auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >

	                    <el-col :span="5" >
                            <el-form-item label="代理商改派:" >
                                 <el-select v-model="condition.isAgentOrder" clearable >
                                    <el-option
		                                    v-for="item in agentOrderList"
		                                    :value="item.value"
		                                    :label="item.text" >
                                    </el-option >
                                </el-select >
                            </el-form-item >
                        </el-col >
	                    <el-col :span="5" >
                            <el-form-item label="维修员:" >
                                  <el-select v-model="condition.repairChargePersonName" clearable >
                                    <el-option
		                                    v-for="item in employeeList"
		                                    :value="item.id"
		                                    :label="item.name" >
                                    </el-option >
                                </el-select >
                            </el-form-item >
                        </el-col >
	                    <el-col :span="5" >
                            <el-form-item label="故障部位:" >
	                            <el-input v-model="condition.issuePositionName"
	                                      placeholder="故障部位" clearable
	                                      auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >
	                    <el-col :span="5" >
                            <el-form-item label="保修期内:" >
                                  <el-select v-model="condition.inWarrantyPeriod" clearable >
                                    <el-option
		                                    v-for="item in inWarrantyPeriodList"
		                                    :value="item.value"
		                                    :label="item.name" >
                                    </el-option >
                                </el-select >
                            </el-form-item >
                        </el-col >
	                    <el-col :span="4" >
		                    <el-form-item label="" >
				                    <el-select v-model="condition.dateType" placeholder="请选择" >
									      <el-option label="报修日期" value="0" ></el-option >
									      <el-option label="完成日期" value="1" ></el-option >
				                    </el-select >
		                    </el-form-item >

	                    </el-col >
	                    <el-col :span="8" >
	                    <el-form-item label=":" >
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
                            {{scope.$index+startRow}}
                        </template >
                    </el-table-column >

                    <el-table-column
		                    align="center"
		                    prop="machineNameplate"
		                    label="机器编号" >
                    </el-table-column >
	                <!--<el-table-column-->
	                <!--align="center"-->
	                <!--prop="machineType"-->
	                <!--label="机型" >-->
	                <!--<template scope="scope" >-->
	                <!--<div >-->
	                <!--{{scope.row.machineType}}-->
	                <!--</div >-->
	                <!--</template >-->
	                <!--</el-table-column >-->
                    <el-table-column label="订单号"
                                     sortable
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
		                    sortable
		                    prop="machineCustomerName"
		                    label="客户" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="machineAgentName"
		                    label="代理商" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="status"
		                    sortable
		                    label="状态" >
                        <template scope="scope" >
                            <div v-if="scope.row.status==0"
                                 style="color: #686868" >
                                {{scope.row.status|filterStatus}}
                            </div >
                            <div v-if="scope.row.status==1"
                                 style="color: #8b6c0e" >
                                {{scope.row.status|filterStatus}}
                            </div >
                            <div v-if="scope.row.status==2"
                                 style="color: #13678b" >
                                {{scope.row.status|filterStatus}}
                            </div >
                            <div v-if="scope.row.status==3"
                                 style="color: #198b57" >
                                {{scope.row.status|filterStatus}}
                            </div >
                            <div v-if="scope.row.status==4"
                                 style="color: darkred" >
                                {{scope.row.status|filterStatus}}
                            </div >
                            <div v-if="scope.row.status==5"
                                 style="color: indianred" >
                                {{scope.row.status|filterStatus}}
                            </div >
                            <div v-if="scope.row.status==6"
                                 style="color: darkred" >
                                {{scope.row.status|filterStatus}}
                            </div >
                            <div v-if="scope.row.status==7"
                                 style="color: red" >
                                {{scope.row.status|filterStatus}}
                            </div >
                        </template >
                    </el-table-column >
	                <el-table-column label="故障部位"
	                                 align="center"
	                                 prop="issuePositionName" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.issuePositionName}}
                            </div >
                        </template >
                    </el-table-column >
	                <el-table-column label="保修期内"
	                                 sortable
	                                 align="center"
	                                 prop="inWarrantyPeriod" >
                        <template scope="scope" >

	                        <div v-if="scope.row.inWarrantyPeriod==1"
	                             style="color: green" >
                                 {{scope.row.inWarrantyPeriod|filterInWarrantyPeriod}}
                            </div >
	                        <div v-else style="color: red" >
                                {{scope.row.inWarrantyPeriod|filterInWarrantyPeriod}}
                            </div >
                        </template >
                    </el-table-column >
	                <el-table-column label="维修员"
	                                 sortable
	                                 align="center"
	                                 prop="repairChargePersonName" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.repairChargePersonName}}
                            </div >
                        </template >
                    </el-table-column >
	                <el-table-column label="代理商改派"
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
		                    label="报修日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.createTime)|filterDateString}}
                        </span >
                        </template >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="processCreateTime"
		                    label="完成日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.repairEndTime)|filterDateString}}
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
                <el-dialog title="查看" :visible.sync="showDetailDialog" append-to-body fullscreen >
                    <RepairDetail :repairRecorderInfo="selectedItem"
                                  ref="repairDetail" v-if="showDetailDialog"
                    ></RepairDetail >
                    <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
                        <el-button @click="showDetailDialog = false" icon="el-icon-back" >关闭</el-button >
                    </div >
                </el-dialog >
		     <el-dialog title="派单" :visible.sync="showAssignTaskDialog" append-to-body width="75%" >
                    <AssignTask :showType="1" ref="assignTask" v-if="showAssignTaskDialog"
                                :machineInfo="machineInfo"
                                :dataChanged="dataChanged" ></AssignTask >
                    <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
                        <el-button type="primary" @click="onConfirmAssign" icon="el-icon-check"
                                   :disabled="isDisableOK" >确定
                        </el-button >
                        <el-button @click="showAssignTaskDialog = false" icon="el-icon-back" >关闭</el-button >
                    </div >
		     </el-dialog >
		      <el-dialog title="提示" :visible.sync="showConfirmAssign"
		                 append-to-body width="30%" >
                    <span >当前任务状态是<span style="font-weight: bold;font-size: 18px;color: #1c8de0;" > {{selectedItem.status|filterStatus}}</span >, 确定需要再次派单吗？</span >
                    <span slot="footer" class="dialog-footer" >
		              <el-button @click="showConfirmAssign = false" icon="el-icon-close" >取 消</el-button >
		              <el-button type="primary" @click="onConShowAssign" icon="el-icon-check" >确 定</el-button >
		            </span >
                </el-dialog >
	     </el-col >
      </div >
  </div >
</template >

<script >
import {APIConfig} from '@/config/apiConfig'
import {Loading} from 'element-ui';
import {getRepairRecordInfoList, assignTaskToSubmit} from '@/api/repair_manage';
import {requestEmployeeList} from '@/api/commonApi';
import RepairDetail from '@/views/repair_manage/repair_detail';
import AssignTask from '@/views/common_component/assign_task';

var _this;
export default {
	name: 'repair_home',
	components: {
		RepairDetail,
		AssignTask
	},
	data() {
		_this = this;
		return {
			//detail info
			formData: {},
			machineNameplate: '',
			selectedItem: {},
			machineInfo: {},
			activeTabId: '0',
			//detail info

			tableData: [],
			//分页
			pageSize: APIConfig.EveryPageNum,//每一页的num
			currentPage: 1,
			startRow: 0,
			totalRecords: 0,
			statusList: APIConfig.RepairStatusList,
			inWarrantyPeriodList: APIConfig.InWarrantyPeriodList,
			agentOrderList: APIConfig.YESORNOList,
			employeeList: [],
			condition: {
				nameplate: '',
				orderNum: '',
				machineType: '',
				customer: '',
				isAgent: true,
				agent: '',
				status: '',
				inWarrantyPeriod: '',
				dateType: '',
				selectDate: '',
			},
			allMachineType: [],
			allRoles: [],
			loadingUI: false,
			showDetailDialog: false,
			showAssignTaskDialog: false,
			showConfirmAssign: false,
			assignTaskData: {
				formData: {
					planDate: '',
					customerName: '',
				},
				workerList: [],
			},
			isDisableOK: false,
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
		filterMachineType(id)
		{
			let result = '';
			for (let i = 0; i < _this.allMachineType.length; i++) {
				if (id == _this.allMachineType[i].id) {
					result = _this.allMachineType[i].name;
					break;
				}
			}
			return result;
		},

		filterInWarrantyPeriod(id)
		{
			let result = '';
			for (let i = 0; i < _this.inWarrantyPeriodList.length; i++) {
				if (id == _this.inWarrantyPeriodList[i].value) {
					result = _this.inWarrantyPeriodList[i].name;
					break;
				}
			}
			return result;
		},
	},
	methods: {
		onConShowAssign()
		{
			_this.showConfirmAssign = false;
			_this.showAssignTaskDialog = true;
			if (this.$refs.assignTask) {
				_this.$refs.assignTask.loadData();//方法1
			}
		},
		dataChanged(val){
			_this.assignTaskData = Object.assign({}, val)
		},

		assignTask(row)
		{
			_this.machineInfo = {
				factoryDate: DateMinus(_this.selectedItem.facoryDate),
			};
			_this.selectedItem = copyObject(row);
			if (_this.selectedItem.status > 0) {//当前还在进行.
				_this.showConfirmAssign = true;
			}
			else {
				_this.onConShowAssign();
			}

		},

		//Submit OK
		onConfirmAssign()
		{
			if (this.$refs.assignTask) {
				_this.assignTaskData = _this.$refs.assignTask.getCurrentData();
			}
			if (_this.assignTaskData == null || _this.assignTaskData.length < 0) {
				showMessage(_this, "请填写完整的派单数据！")
				return;
			}
			if (_this.assignTaskData.formData.chargePersonId == 0) {
				showMessage(_this, "请选择负责人！")
				return;
			}

			if (isStringEmpty(_this.assignTaskData.formData.planDate)) {
				showMessage(_this, "请选择上门日期！")
				return;
			}


			if (isStringEmpty(_this.assignTaskData.formData.customerName)) {
				showMessage(_this, "请选择客户联系人！")
				return;
			}

			if (isStringEmpty(_this.assignTaskData.workerList)) {
				showMessage(_this, "请选择要派出的工人！")
				return;
			}

			_this.showAssignTaskDialog = false;
			let memberList = [];
			_this.assignTaskData.workerList.forEach(item=> {
				memberList.push({
					userId: item.id,
					repairRecordId: _this.selectedItem.id,
				});
			});
			let submitData = {
				repairRecord: {
					id: _this.selectedItem.id,
					repairChargePerson: _this.assignTaskData.formData.chargePersonId,
					customer: _this.assignTaskData.formData.customerId,
					repairPlanDate: _this.assignTaskData.formData.planDate,
					inWarrantyPeriod: _this.assignTaskData.formData.inWarrantyPeriod,
				},
				repairMembers: memberList,
			};
			assignTaskToSubmit(submitData).then(response=> {
				if (responseIsOK(response)) {
					showMSG(_this, "分配任务成功！", 1)
					_this.onSearchDetailData();
				}
				else {
					showMSG(_this, isStringEmpty(response.data.message) ? "分配任务失败！" : response.data.message)

				}
			})
		},

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
				queryStartRepairCreateTime: '',
				queryFinishRepairCreateTime: '',
				queryStartRepairEndTime: '',
				queryFinishRepairEndTime: '',
				agent: this.condition.agent,
				repairRecordCustomerName: this.condition.customer,
				repairStatus: this.condition.status,
				partsStatus: '',
				repairChargePersonName: '',
				inWarrantyPeriod: this.condition.inWarrantyPeriod,
				issuePositionName: '',
				page: this.currentPage,
				size: this.pageSize,
				isFuzzy: true,
			};
			if (this.condition.selectDate != null && this.condition.selectDate.length > 0) {
				if (condition.dateType == 0) {//报修日期
					condition.queryStartRepairCreateTime = this.condition.selectDate[0].format("yyyy-MM-dd");
					condition.queryFinishRepairCreateTime = this.condition.selectDate[1].format("yyyy-MM-dd");
				} else {//完成日期
					condition.queryStartRepairEndTime = this.condition.selectDate[0].format("yyyy-MM-dd");
					condition.queryFinishRepairEndTime = this.condition.selectDate[1].format("yyyy-MM-dd");
				}
			}
			getRepairRecordInfoList(condition).then(response => {
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
			_this.selectedItem = copyObject(item);
			_this.showDetailDialog = true;
			if (this.$refs.repairDetail) {
				_this.$refs.repairDetail.loadData();//方法1
			}
		},

		tabContentClick(tab)
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

			//employeeList
			requestEmployeeList().then(response => {
				if (responseIsOK(response)) {
					_this.employeeList = response.data.data.list;
				}
			})
		},
	},

	created()
	{
		this.initData();
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
