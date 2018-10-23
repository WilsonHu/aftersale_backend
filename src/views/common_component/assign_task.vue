<template >
    <div class="root_div" >
        <el-form :model="formData" label-position="right" label-width="100px" >
            <div class="panel-body" style="margin-left: -20px" >
                <el-row >
                    <el-col :span="8" >
                        <el-form-item label="客户联系人:" >
                            <el-autocomplete clearable
                                             @select="onSelectedChanged"
                                             v-model="formData.customerName"
                                             :fetch-suggestions="queryCustomer"
                                             placeholder="客户"
                            >
                                <template slot-scope="{ item }" >
                                   <el-row >
                                       <el-col :span="20" >
                                           <span >{{ item.value }}</span >
                                       </el-col >
                                       <el-col :span="4" >
                                           <span style="font-size: 12px; color: darkgray" >{{ item.comment }}</span >
                                       </el-col >

                                   </el-row >
                                </template >
                            </el-autocomplete >
                        </el-form-item >
                    </el-col >
                    <el-col :span="8" >
                        <el-form-item label="联系电话:" >
                            <span v-html="formData.customerPhone" ></span >
                        </el-form-item >
                    </el-col >
                    <el-col :span="8" >
                        <el-form-item label="已发货:" v-show="isNeedShow()" >
                            <span >{{formData.factoryDate}}天</span >
                        </el-form-item >
                    </el-col >
                </el-row >
                <el-row >
                    <el-col :span="8" >
                        <el-form-item label="地址:" >
                            <span v-html="formData.address" ></span >
                        </el-form-item >
                    </el-col >
                    <el-col :span="8" >
                        <el-form-item label="上门日期:" >
                            <el-date-picker
		                            v-model="formData.planDate"
		                            type="datetime"
		                            placeholder="上门日期"
		                            align="left"
		                            :picker-options="pickerOptions" >
                            </el-date-picker >
                        </el-form-item >
                    </el-col >
                    <el-col :span="8" v-show="isNeedShow()" >
                        <el-form-item label="保修期内:" >
                            <el-select v-model="formData.inWarrantyPeriod" clearable >
                                <el-option
		                                v-for="item in inWarrantyPeriodList"
		                                :value="item.value"
		                                :label="item.name" >
                                </el-option >
                            </el-select >
                        </el-form-item >
                    </el-col >
                </el-row >
            </div >
        </el-form >
        <el-table
		        :data="tableData"
		        border
		        empty-text="暂无数据..."
		        ref="multipleTable"
		        @selection-change="handleSelectionChange"
		        show-overflow-tooltip="true"
		        style="width: 100%; " >
            <el-table-column
		            align="center"
		            type="selection"
		            width="55" >
            </el-table-column >
            <el-table-column
		            align="center"
		            prop="name"
		            label="调试员" >
                <template scope="scope" >
                    <span >
                        {{scope.row.name}}
                    </span >
                </template >
            </el-table-column >
            <el-table-column
		            align="center"
		            prop="installTaskCount"
		            label="安装任务" >
                <template scope="scope" >
                    <span :style="scope.row.installTaskCount>0?'color:red':'color:green'"
                          style="font-weight: bold;font-size: 18px" >
                        {{scope.row.installTaskCount}}
                    </span >
                </template >
            </el-table-column >
            <el-table-column
		            align="center"
		            prop="maintainTaskCount"
		            label="保养任务" >
                <template scope="scope" >
                    <span :style="scope.row.maintainTaskCount>0?'color:red':'color:green'"
                          style="font-weight: bold;font-size: 18px" >
                        {{scope.row.maintainTaskCount}}
                    </span >
                </template >
            </el-table-column >
            <el-table-column
		            align="center"
		            prop="repairTaskCount"
		            label="维修任务" >
                <template scope="scope" >
                    <span :style="scope.row.repairTaskCount>0?'color:red':'color:green'"
                          style="font-weight: bold;font-size: 18px" >
                        {{scope.row.repairTaskCount}}
                    </span >
                </template >
            </el-table-column >
            <el-table-column
		            align="center"
		            prop="totalTaskCount"
		            label="当前任务总数" >
                <template scope="scope" >
                    <span :style="scope.row.totalTaskCount>0?'color:red':'color:green'"
                          style="font-weight: bold;font-size: 18px" >
                        {{scope.row.totalTaskCount}}
                    </span >
                </template >
            </el-table-column >
            <el-table-column
		            align="center"
		            label="负责人" >
                <template slot-scope="scope" >
                    <el-checkbox v-model="scope.row.checked"
                                 :disabled="multipleSelection.indexOf(scope.row)<0"
                                 @change="checkStatusChange(scope.row)" ></el-checkbox >
                </template >
            </el-table-column >
        </el-table >
    </div >
</template >

<script >
    import {APIConfig} from '@/config/apiConfig'
    import {requestEmployeeList, requestCustomerList} from '@/api/commonApi';
    import {resetObject} from '@/utils'
    var _this;

    export default {
	    name: 'AssignTask',
	    props: {
		    showType: 0,
		    machineInfo: {
			    type: Object,
			    default: function () {
				    return {}
			    }
		    },
//		 resultData: {
//			 type: Object,
//			 default:{}
//		 },
		    dataChanged: {
			    type: Function,
			    default: null
		    }
	    },
	    data() {
		    _this = this;
		    return {
			    loading: {},
			    formData: {
				    chargePersonId: 0,
			    },
			    inWarrantyPeriodList: APIConfig.InWarrantyPeriodList,
			    tableData: [],
			    multipleSelection: [],
			    customerList: [],
			    pickerOptions: APIConfig.DateOptions,
		    }
	    },
	    filters: {
		    filterDateString(strDate)
		    {
			    var resDate = new Date(strDate);
			    return resDate.format("yyyy-MM-dd");
		    },
	    },
	    methods: {
		    isNeedShow()
		    {
			    return _this.showType == APIConfig.AssignTaskType.REPAIR
		    },

		    loadData()
		    {
			    resetObject(_this.formData);
			    if (!isStringEmpty(_this.machineInfo)) {
				    _this.formData = Object.assign({}, _this.machineInfo)
			    }
			    _this.formData.chargePersonId = 0;
			    _this.tableData = [];
			    _this.loading = this.$loading({
				    lock: true,
				    text: '拼命加载中',
				    spinner: 'el-icon-loading',
				    background: 'rgba(0, 0, 0, 0.7)'
			    });
			    requestEmployeeList().then(response => {
				    if (responseIsOK(response)) {
					    if (response.data.data.list.length > 0) {
						    let dataList = response.data.data.list;
						    _this.tableData = dataList;
					    }
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "加载数据失败！" : response.data.message)
				    }
				    _this.loading.close();
			    }).catch(error=> {
				    _this.loading.close();
			    })
		    },

		    handleSelectionChange(val)
		    {
			    _this.multipleSelection = val;
			    for (let item of _this.tableData) {
				    let isSelected = false;
				    for (let sItem of _this.multipleSelection) {
					    if (item.id == sItem.id) {
						    isSelected = true;
						    break;
					    }
				    }
				    if (!isSelected) {
					    item.checked = false;
				    }
			    }
		    },

		    queryCustomer(queryString, check) {
			    //缓存加载
			    var results = _this.customerList;
			    if (queryString) {
				    results = _this.customerList.filter(
						    p=>p.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
				    );
			    }
			    clearTimeout(_this.customerTimeout);
			    _this.customerTimeout = setTimeout(() => {
				    check(results);
			    }, 800 * Math.random());
		    },

		    checkStatusChange(row)
		    {
			    if (row.checked == true && _this.multipleSelection.length > 0) {
				    for (let i = 0; i < _this.multipleSelection.length; i++) {
					    if (row.id !== _this.multipleSelection[i].id) {
						    if (_this.multipleSelection[i].checked == true) {
							    _this.multipleSelection[i].checked = false;
						    }
					    }
				    }
			    }
		    },

		    //派单选中客户联系人
		    initCustomerList() {
			    _this.formData.customerName = "";
			    _this.formData.customerId = "";
			    let condition = {
				    "customerCompany": _this.machineInfo.machineCustomerCompanyId,
				    "roleId": APIConfig.UserType.CustomerContacter,
			    }
			    requestCustomerList(condition).then(response=> {
				    if (responseIsOK(response)) {
					    _this.customerList = [];
					    let dataList = response.data.data.list;
					    for (let item of dataList) {
						    _this.customerList.push(Object.assign({
							    value: item.name,
							    id: item.id,
							    comment: "联系人"
						    }, item));
					    }
					    _this.customerList.unshift({
						    value: _this.machineInfo.customerName,
						    id: _this.machineInfo.customerId,
						    comment: "客户"
					    })
					    _this.formData.customerId = ""
					    _this.formData.customerName = ""
				    }
			    })
		    },

		    initData()
		    {
			    _this.initCustomerList();
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

		    getCurrentData()
		    {
			    if (this.formData.planDate != null && this.formData.planDate.length > 0) {
				    this.formData.planDate = this.formData.planDate.format("yyyy-MM-dd");
			    }
			    _this.formData.chargePersonId = 0;
			    for (let item of _this.multipleSelection) {
				    if (item.checked == true) {
					    _this.formData.chargePersonId = item.id;
					    break;
				    }
			    }
			    for (let item of _this.customerList) {
				    if (item.name === _this.formData.customerName) {
					    _this.formData.customerId = item.id
					    break;
				    }
			    }
			    return {
				    formData: _this.formData,
				    workerList: _this.multipleSelection
			    }
		    },

		    onSelectedChanged(selectObj)
		    {
			    _this.formData.customerId = selectObj.id;
			    _this.formData.customerPhone = selectObj.phone;
			    _this.formData.address = selectObj.address;
		    },
	    },
	    watch: {
		    formData: function (val) {
			    _this.dataChanged(_this.getCurrentData());
		    },
		    multipleSelection: function (val) {
			    if (_this.multipleSelection.length == 1) {
				    _this.multipleSelection[0].checked = true;
				    _this.formData.chargePersonId = _this.multipleSelection[0].id;
			    }
			    _this.dataChanged(_this.getCurrentData());
		    },
	    },

	    mounted(){
		    _this.initData();
		    _this.loadData();//仅仅第一次show出来时，会调用。之后，父控件会自行调用loadData()
	    },
    }
</script >

<style scoped >
    .root_div {
	    /*position: relative;*/
	    /*padding: 20px;*/
	    /*width: 100%;*/
    }

    .span {
	    font-size: 18px;
	    width: 100%;
	    alignment: left;
	    text-align: left;
    }

</style >
