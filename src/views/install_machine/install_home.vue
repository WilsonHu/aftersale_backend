<template >
    <div class="install_home_div" >
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
                                          placeholder="订单号" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >
                        <el-col :span="5" >
                            <el-form-item label="机型:" >
                                <el-select v-model="condition.machineType" clearable >
                                    <el-option
		                                    v-for="item in allMachineType"
		                                    :value="item.name"
		                                    :label="item.name" >
                                    </el-option >
                                </el-select >
                            </el-form-item >
                        </el-col >
                        <el-col :span="3" :offset="1" v-show="!isAgentLogin()" >
                            <el-form-item label="显示代理商:" >
                                <el-switch
		                                v-model="condition.isAgent"
		                                active-text="是"
		                                inactive-text="否" >
                                </el-switch >
                            </el-form-item >
                        </el-col >
                        <el-col :span="5" v-show="!isAgentLogin()&&condition.isAgent" >
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

                <div >
                    <el-steps simple >
                        <el-step title="设置安装项" status="finish" icon="el-icon-setting" ></el-step >
                        <el-step title="安装调试派单" status="success" ></el-step >
                    </el-steps >
                </div >
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
		                    sortable
		                    prop="machineCustomerName"
		                    label="客户" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="customerInInstallRecord"
		                    label="客户联系人" >
                    </el-table-column >
                    <el-table-column
		                    v-if="!isAgentLogin()"
		                    align="center"
		                    prop="machineAgentName"
		                    label="代理商" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    width="200"
		                    prop="installInfo"
		                    label="安装项" >
                        <template scope="scope" >
                            <div :disabled="scope.row.installStatus>2"
                                 @click="editInstall(scope.row)"
                                 style="font-weight: bold;"
                                 class="btn btn-link" >
	                              <span style="color: red"
	                                    v-if="scope.row.installInfo==''||scope.row.installInfo==null" >
                                      点击设置
                                  </span >
                                <div v-else >
                                    <el-tag class="tagClass" type="success"
                                            v-for="item in filterInstallInfo(scope.row.installInfo)"
                                            :key="item" >
                                        {{item}}
                                    </el-tag >
                                </div >
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="installStatus"
		                    sortable
		                    label="安装状态" >
                        <template scope="scope" >
                            <div v-if="scope.row.installStatus==0"
                                 style="color: #686868" >
                                {{scope.row.installStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.installStatus==1"
                                 style="color: #8b6c0e" >
                                {{scope.row.installStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.installStatus==2"
                                 style="color: #13678b" >
                                {{scope.row.installStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.installStatus==3"
                                 style="color: #198b57" >
                                {{scope.row.installStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.installStatus==4"
                                 style="color: darkred" >
                                {{scope.row.installStatus|filterStatus}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    label="计划日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.installPlanDate)|filterDateString}}
                        </span >
                        </template >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="facoryDate"
		                    label="出厂日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.facoryDate)|filterDateString}}
                        </span >
                        </template >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="installActualTime"
		                    label="完成日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.installActualTime)|filterDateString}}
                        </span >
                        </template >
                    </el-table-column >

                    <el-table-column width="200"
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
		                                type="success"
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
                <el-dialog title="安装项选择" :visible.sync="showInstallDialog" append-to-body >
                    <el-form label-position="right" label-width="90px" >
                        <el-row >
                            <el-col :span="12" >
                                <el-checkbox-group v-model="checkedList" >
                                    <el-checkbox
		                                    :disabled="item=='基础项'"
		                                    :label="item"
		                                    :key="item"
		                                    v-for="item in filterInstallInfo(installLibList)" ></el-checkbox >
                                </el-checkbox-group >
                            </el-col >
                        </el-row >
                    </el-form >
                    <div slot="footer" class="dialog-footer" style="margin-top: 100px" >
                        <el-button @click="showInstallDialog = false" icon="el-icon-close" >取 消</el-button >
                        <el-button type="primary" @click="onConInstall" icon="el-icon-check" >确 定</el-button >
                    </div >
                </el-dialog >
                <el-dialog title="安装详情" :visible.sync="showDetailDialog" append-to-body fullscreen >
                    <InstallDetail ref="installDetail" v-if="showDetailDialog"
                                   :machineNameplate="machineNameplate"
                    ></InstallDetail >
                    <div slot="footer" class="dialog-footer" style="margin-top: 100px" >
                        <el-button @click="showDetailDialog = false" icon="el-icon-back" >关闭</el-button >
                    </div >
                </el-dialog >

                <el-dialog title="派单" :visible.sync="showAssignTaskDialog" append-to-body width="70%" >
                    <AssignTask :showType="assignTaskType" ref="assignTask" v-if="showAssignTaskDialog"
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
		    getInstallRecordInfoList,
		    assignTaskToSubmit,
		    updateInstallInfo,
		    selectLibAll
    } from '@/api/install_machine';
    import InstallDetail from '@/views/install_machine/install_detail';
    import AssignTask from '@/views/common_component/assign_task';
    import {resetObject} from '@/utils'

    var _this;
    export default {
	    name: 'install_home',
	    components: {
		    InstallDetail,
		    AssignTask
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
			    statusList: APIConfig.InstallStatusList,
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

			    showAssignTaskDialog: false,
			    showConfirmAssign: false,
			    assignTaskData: {
				    formData: {
					    planDate: '',
					    customerName: '',
				    },
				    workerList: [],
			    },
			    installLibList: [],
			    installLib: '',
			    showInstallDialog: false,
			    machineInfo: {},
			    assignTaskType: APIConfig.AssignTaskType.INSTALL,
			    pickerOptions: APIConfig.DateRangeOptions,
			    checkedList: [],
		    }
	    },

	    filters: {

		    filterDateString(strDate) {
			    if (isUndefined(strDate) || isNull(strDate) || strDate.length == 0) {
				    return '';
			    }
			    let resDate = new Date(strDate);
			    return resDate.format("yyyy-MM-dd");
		    },

		    filterStatus(id) {
			    let result = _this.statusList[0].name;
			    for (let i = 0; i < _this.statusList.length; i++) {
				    if (id == _this.statusList[i].value) {
					    result = _this.statusList[i].name;
					    break;
				    }
			    }
			    return result;
		    },
		    filterMachineType(id) {
			    let result = '';
			    for (let i = 0; i < _this.allMachineType.length; i++) {
				    if (id == _this.allMachineType[i].id) {
					    result = _this.allMachineType[i].name;
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

		    isAgentLogin() {
			    return _this.$store.getters.user.user.agent != "0" && _this.$store.getters.user.user.agent != "";
		    },
		    filterInstallInfo(info) {
			    let installNameList = [];
			    let strInfoList = [];
			    if (isStringEmpty(info)) {
				    return [];
			    }
			    if (IsJsonString(info)) {
				    strInfoList = JSON.parse(info);
			    }
			    else {
				    strInfoList = info;
			    }

			    if (strInfoList.length == 0) {
				    return [];
			    }

			    for (let i = 0; i < strInfoList.length; i++) {
				    let isExist = false;
				    for (let item of installNameList) {
					    if (item == strInfoList[i].installLibName || item == strInfoList[i].install_lib_name) {
						    isExist = true;
						    break;
					    }
				    }
				    if (!isExist) {
					    if (strInfoList[i].installLibName) {
						    installNameList.push(strInfoList[i].installLibName);
					    }
					    else {
						    installNameList.push(strInfoList[i].install_lib_name);
					    }
				    }
			    }
			    return installNameList;
		    },
		    onConInstall() {
			    if (isStringEmpty(_this.checkedList)) {
				    showMSG(_this, "请选择安装项！")
				    return;
			    }
			    _this.showInstallDialog = false;
			    let resList = [];
			    for (let item of _this.checkedList) {
				    for (let detailItem of _this.installLibList) {
					    if (item == detailItem.installLibName && detailItem.isBaseLib != 0) {
						    resList.push(detailItem);//内容是空的大项不需要加入
					    }
				    }
			    }
			    let data = {
				    installRecord: JSON.stringify(_this.selectedItem),
				    installLibList: JSON.stringify(resList),
			    }
			    updateInstallInfo(data).then(response => {
				    if (responseIsOK(response)) {
					    showMSG(_this, "设置安装项成功！", 1)
					    _this.onSearchDetailData();
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "设置安装项失败！" : response.data.message)
				    }
			    })

		    },
		    editInstall(row) {
			    _this.selectedItem = copyObject(row);
			    _this.checkedList = _this.filterInstallInfo(row.installInfo);
			    if (_this.checkedList.length == 0) {
				    _this.checkedList.push("基础项");
			    }
			    _this.showInstallDialog = true;
		    },
		    assignTask(row) {
			    if (row.installInfo.length == 0 || row.installInfo == null) {
				    showMessage(_this, "请先设置安装项再派单！");
				    return;
			    }
			    _this.selectedItem = copyObject(row);
			    _this.machineInfo.machineCustomerCompanyId = _this.selectedItem.machineCustomerCompanyId;
			    _this.machineInfo.customerId = _this.selectedItem.machineCustomerId
			    _this.machineInfo.customerName = _this.selectedItem.machineCustomerName

			    if (_this.selectedItem.maintainStatus > 0) {//当前有保养还在进行.
				    _this.showConfirmAssign = true;
			    }
			    else {
				    _this.onConShowAssign();
			    }
		    },
		    onConShowAssign() {
			    _this.showConfirmAssign = false;
			    _this.showAssignTaskDialog = true;
			    if (this.$refs.assignTask) {
				    _this.$refs.assignTask.loadData();//方法1
				    //this.$refs.AssignTask.$emit('onShowDetail') // 方法2，子控件需要注册相应的事件
			    }
		    },
		    //Submit OK
		    onConfirmAssign() {
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

//
//			    if (isStringEmpty(_this.assignTaskData.formData.customerName)) {
//				    showMessage(_this, "请选择客户联系人！")
//				    return;
//			    }

			    if (isStringEmpty(_this.assignTaskData.workerList)) {
				    showMessage(_this, "请选择要派出的员工！")
				    return;
			    }

			    _this.showAssignTaskDialog = false;
			    let memberList = [];
			    _this.assignTaskData.workerList.forEach(item => {
				    memberList.push({
					    userId: item.id,
					    installRecordId: _this.selectedItem.id,
				    });
			    });

			    let submitData = {
				    installRecord: {
					    id: _this.selectedItem.id,
					    installChargePerson: _this.assignTaskData.formData.chargePersonId,
					    customer: _this.assignTaskData.formData.customerId,
					    installPlanDate: _this.assignTaskData.formData.planDate,

				    },
				    installMembers: memberList,
			    };
			    if (isStringEmpty(_this.assignTaskData.formData.customerName)) {
				    submitData.customer = _this.selectedItem.machineCustomerId
			    }
			    assignTaskToSubmit(submitData).then(response => {
				    if (responseIsOK(response)) {
					    showMSG(_this, "分配任务成功！", 1)
					    _this.onSearchDetailData();
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "分配任务失败！" : response.data.message)

				    }
			    })
		    },
		    dataChanged(val) {
			    _this.assignTaskData = Object.assign({}, val)
		    },

		    handleCurrentChange(val) {
			    this.currentPage = val;
			    this.search();
		    },
		    search() {
			    this.onSearchDetailData();
		    },
		    onSearchDetailData() {
			    var condition = {
				    orderNum: this.condition.orderNum.trim(),
				    nameplate: this.condition.nameplate.trim(),
				    machineType: this.condition.machineType,
				    installStatus: this.condition.status,
				    installChargePersonName: "",
				    query_start_install_actual_time: '',
				    query_finish_install_actual_time: '',
				    agent: !_this.isAgentLogin() ? this.condition.agent : _this.$store.getters.user.user.agentName,//代理商登录为后者
				    isAgent: _this.isAgentLogin(),
				    machineCustomerName: this.condition.customer,
				    page: this.currentPage,
				    size: this.pageSize,
				    isFuzzy: true,
			    };
			    if (this.condition.selectDate != null && this.condition.selectDate.length > 0) {
				    condition.query_start_install_actual_time = this.condition.selectDate[0].format("yyyy-MM-dd");
				    condition.query_finish_install_actual_time = this.condition.selectDate[1].format("yyyy-MM-dd");
			    }
			    getInstallRecordInfoList(condition).then(response => {
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
			    _this.machineNameplate = item.machineNameplate;
			    _this.showDetailDialog = true;
			    // 注意：UI中子组件也绑定了v-if="showDetailDialog",这样可以让组件重新初始化，否则数据不能刷新。
			    //注意：当此子组件没有show出来之前，ref是取不到此子组件的
			    if (this.$refs.installDetail) {
				    _this.$refs.installDetail.loadData();//方法1
				    //this.$refs.installDetail.$emit('onShowDetail') // 方法2，子控件需要注册相应的事件
			    }
		    },

		    initData() {
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
		    initInstallLib() {
			    selectLibAll().then(response => {
				    if (responseIsOK(response)) {
					    _this.installLibList = [];
					    // for (let item of response.data.data.list) {
					    //     if (item.installLibName != "基础项") {
					    //         _this.installLibList.push(item);
					    //     }
					    // }
					    _this.installLibList = response.data.data.list;
				    }
			    })
		    }
	    },
	    created() {
		    _this.initInstallLib();
		    this.initData();
		    this.search();
		    console.log(`user: ${JSON.stringify(_this.$store.getters.user.user)}`)
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

    .tagClass {
	    margin-left: 3px;
    }

    .el-select {
	    width: 100%;
    }
</style >
