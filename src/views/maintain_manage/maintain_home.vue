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
                                <el-select v-model="condition.isfinishByAgent" clearable >
                                    <el-option
		                                    v-for="item in finishList"
		                                    :value="item.value"
		                                    :label="item.text" >
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
                <div align="right" style="margin-bottom: 16px" >
                    <el-tooltip placement="right" >
                        <div slot="content" >添加保养</div >
                        <el-button
		                        icon="el-icon-plus"
		                        size="small"
		                        type="primary"
		                        @click="handleAddMaintain" ></el-button >
                    </el-tooltip >
                </div >
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
		                    prop="machineCustomerName"
		                    label="客户" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="customerNameInMaintainRecord"
		                    label="客户联系人" >
                    </el-table-column >
                    <el-table-column
		                    v-if="isShowAgent"
		                    align="center"
		                    prop="machineAgentName"
		                    label="代理商" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="maintainLibName"
		                    label="保养项" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="maintainStatus"
		                    sortable
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
                <el-dialog title="添加保养" :visible.sync="showAddDialog" append-to-body width="50%" >
                    <el-form :model="formData" label-position="right" label-width="90px" >
                        <el-row >
                            <el-col :span="12" >
                                <el-form-item label="机器编号:" >
                                    <el-input placeholder="选择机器" v-model="formData.machineNameplate"
                                              class="input-with-select" >
                                        <el-button slot="append" icon="el-icon-search"
                                                   @click="onShowSelectMachine" ></el-button >
                                    </el-input >
                                </el-form-item >
                            </el-col >
                            <el-col :span="12" >
                                <el-form-item label="保养项:" >
                                    <el-select v-model="formData.maintainLibName" clearable >
                                        <el-option
		                                        v-for="item in mainTainLibList"
		                                        :value="item.maintainLibName"
		                                        :label="item.maintainLibName" >
                                        </el-option >
                                    </el-select >
                                </el-form-item >
                            </el-col >
                        </el-row >
                    </el-form >
                    <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
                        <el-button type="primary" @click="onAddOK" icon="el-icon-check"
                        >确定
                        </el-button >
                        <el-button @click="showAddDialog = false" icon="el-icon-back" >关闭</el-button >
                    </div >
                </el-dialog >
                <el-dialog title="选择机器" :visible.sync="showSelectMachineDialog" append-to-body width="50%" >
                    <SelectAssignMachine ref="selectMachineControl" v-if="showSelectMachineDialog"
                                         :dataChanged="onSelectMachineChanged" >
                    </SelectAssignMachine >
                    <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
                        <el-button type="primary" @click="onSelectMachineOK" icon="el-icon-check"
                        >确定
                        </el-button >
                        <el-button @click="showSelectMachineDialog = false" icon="el-icon-back" >关闭</el-button >
                    </div >
                </el-dialog >
                <el-dialog title="保养详情" :visible.sync="showDetailDialog" append-to-body fullscreen >
                    <MaintainDetail ref="maintainDetail" v-if="showDetailDialog"
                                    :machineNameplate="machineNameplate"
                                    :maintainRecorderInfo="selectedItem"
                    ></MaintainDetail >
                    <div slot="footer" class="dialog-footer" style="margin-top: 100px;" >
                        <el-button @click="showDetailDialog = false" icon="el-icon-back" >关闭</el-button >
                    </div >
                </el-dialog >
                <el-dialog title="派单" :visible.sync="showAssignTaskDialog" append-to-body width="75%" >
                    <AssignTask :showType="0" ref="assignTask" v-if="showAssignTaskDialog"
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
                    <span >当前任务状态是<span style="font-weight: bold;font-size: 18px;color: #1c8de0;" > {{selectedItem.maintainStatus|filterStatus}}</span >, 确定需要再次派单吗？</span >
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
    import {
		    getMaintainRecordInfoList,
		    assignTaskToSubmit,
		    selectLibList,
		    addMainTainRecorder
    } from '@/api/maintain_manage';
    import MaintainDetail from '@/views/maintain_manage/maintain_detail';
    import AssignTask from '@/views/common_component/assign_task';
    import SelectAssignMachine from '@/views/common_component/select_assign_machine';
    import {resetObject} from '@/utils'
    var _this;
    export default {
	    name: 'maintain_home',
	    components: {
		    AssignTask,
		    SelectAssignMachine,
		    MaintainDetail
	    },
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
			    finishList: APIConfig.YESORNOList,

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
			    isShowAgent: true,
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
			    showAddDialog: false,
			    formData: {},
			    showSelectMachineDialog: false,
			    selectedMachine: {},
			    mainTainLibList: [],

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

	    computed: {
		    isDisableOK: {//property
			    get: function () {//getter
				    if (_this.assignTaskData.formData.planDate == "" || _this.assignTaskData.formData.customerName == "" || _this.assignTaskData.workerList.length < 1) {
					    return true;
				    }
				    return false;
			    },
		    },
	    },
	    methods: {
		    onSelectMachineChanged(val)
		    {
			    _this.selectedMachine = Object.assign({}, val);
		    },
		    onShowSelectMachine()
		    {
			    _this.selectedMachine = null;
			    _this.showSelectMachineDialog = true;
		    },
		    onSelectMachineOK()
		    {
			    _this.showSelectMachineDialog = false;
			    if (this.$refs.selectMachineControl) {
				    _this.selectedMachine = _this.$refs.selectMachineControl.getCurrentData();
			    }
			    if (_this.selectedMachine != null) {
				    _this.formData.machineNameplate = _this.selectedMachine.nameplate;
			    }
		    },
		    onAddOK()
		    {
			    if (isStringEmpty(_this.formData.machineNameplate)) {
				    showMessage(_this, "请选择要保养的机器！")
				    return;
			    }
			    if (isStringEmpty(_this.formData.machineNameplate)) {
				    showMessage(_this, "请选择保养项！")
				    return;
			    }
			    _this.showAddDialog = false;
			    let submitData = {
				    machineNameplate: _this.formData.machineNameplate,
				    maintainLibName: _this.formData.maintainLibName,
				    createTime: new Date().format("yyyy-MM-dd"),
				    maintainStatus: 0,
			    };
			    addMainTainRecorder(submitData).then(response=> {
				    if (responseIsOK(response)) {
					    showMSG(_this, "提交保养数据成功！", 1)
					    _this.onSearchDetailData();
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "提交保养数据失败！" : response.data.message)
				    }
			    })
		    },

		    handleAddMaintain(){
			    resetObject(_this.formData);
			    if (_this.mainTainLibList.length == 0) {
				    let condition = {
					    maintainType: "",
					    maintainLibName: '',
				    };
				    selectLibList(condition).then(response=> {
					    if (responseIsOK(response)) {
						    _this.mainTainLibList = response.data.data.list;
						    _this.showAddDialog = true;
					    }
					    else {
						    showMSG(_this, isStringEmpty(response.data.message) ? "获取保养项数据失败！" : response.data.message)

					    }
				    })
			    }
			    else {
				    _this.showAddDialog = true;
			    }
		    },
		    onConShowAssign()
		    {
			    _this.showConfirmAssign = false;
			    _this.showAssignTaskDialog = true;
			    if (this.$refs.assignTask) {
				    _this.$refs.assignTask.loadData();//方法1
				    //this.$refs.AssignTask.$emit('onShowDetail') // 方法2，子控件需要注册相应的事件
			    }
		    },
		    dataChanged(val){
			    _this.assignTaskData = Object.assign({}, val)
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
					    _this.isShowAgent = _this.condition.isAgent;
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)

				    }
			    })
		    },
		    assignTask(row)
		    {
			    _this.selectedItem = copyObject(row);
			    if (_this.selectedItem.maintainStatus > 0) {//当前有保养还在进行.
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
					    maintainRecordId: _this.selectedItem.id,
				    });
			    });
			    let submitData = {
				    maintainRecord: {
					    id: _this.selectedItem.id,
					    maintainChargePerson: _this.assignTaskData.formData.chargePersonId,
					    customer: _this.assignTaskData.formData.customerId,
					    maintainDatePlan: _this.assignTaskData.formData.planDate,

				    },
				    maintainMembers: memberList,
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

		    editWithItem(item)
		    {
			    _this.selectedItem = item;
			    _this.machineNameplate = item.machineNameplate;
			    _this.showDetailDialog = true;
			    // 注意：UI中子组件也绑定了v-if="showDetailDialog",这样可以让组件重新初始化，否则数据不能刷新。
			    //注意：当此子组件没有show出来之前，ref是取不到此子组件的
			    if (this.$refs.maintainDetail) {
				    _this.$refs.maintainDetail.loadData();//方法1
				    //this.$refs.installDetail.$emit('onShowDetail') // 方法2，子控件需要注册相应的事件
			    }
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

    .input-with-select .el-input-group__prepend {
	    background-color: #fff;
    }

    .el-select {
	    width: 100%;
    }
</style >
