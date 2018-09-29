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
                                          placeholder="订单号" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >

                        <el-col :span="3" :offset="1" v-show="!isAgentLogin()">
                            <el-form-item label="显示代理商:" >
                                <el-switch
		                                v-model="condition.isAgent"
		                                active-text="是"
		                                inactive-text="否" >
                                </el-switch >
                            </el-form-item >
                        </el-col >
                        <el-col :span="5" v-show="!isAgentLogin()&&condition.isAgent">
                            <el-form-item label="" >
                                <el-input v-model="condition.agent"
                                          placeholder="代理商" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >


                    </el-row >
                    <el-row >
	                    <el-col :span="5" >
                            <el-form-item label="机器来源:" >
                                <el-select v-model="condition.machineSource" clearable >
                                    <el-option
		                                    v-for="item in machineSourceList"
		                                    :value="item.value"
		                                    :label="item.name" >
                                    </el-option >
                                </el-select >
                            </el-form-item >
                        </el-col >
                        <el-col :span="5" >
                            <el-form-item label="机器状态:" >
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
                        <el-col :span="2" :offset="2" >
                            <el-button
		                            icon="el-icon-search"
		                            size="normal"
		                            type="primary"
		                            @click="search" >查询
                            </el-button >
                        </el-col >
                        <el-col :span="6" >
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
                        <div slot="content" >添加机器</div >
                        <el-button
		                        icon="el-icon-plus"
		                        size="small"
		                        type="primary"
		                        @click="handleAddMachine" ></el-button >
                    </el-tooltip >
                </div >
                <el-table
		                v-loading="loadingUI"
		                element-loading-text="获取数据中..."
		                :data="tableData"
		                :default-sort="{prop: 'isOldMachine', order: 'descending'}"
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
		                    prop="nameplate"
		                    label="机器编号" >
                    </el-table-column >
                    <el-table-column
		                    sortable
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
		                    v-if="!isAgentLogin()"
		                    align="center"
		                    prop="agent"
		                    label="代理商" >
                    </el-table-column >
                    <el-table-column
		                    sortable
		                    align="center"
		                    prop="status"
		                    label="机器状态" >
                        <template scope="scope" >
                            <div v-if="scope.row.status==0"
                                 style="color: #686868" >
                                {{scope.row.status}}
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
                                 style="color: lightskyblue" >
                                {{scope.row.status|filterStatus}}
                            </div >
                            <div v-if="scope.row.status==5"
                                 style="color: indianred" >
                                {{scope.row.status|filterStatus}}
                            </div >
                            <div v-if="scope.row.status==6"
                                 style="color: darkmagenta" >
                                {{scope.row.status|filterStatus}}
                            </div >
                        </template >
                    </el-table-column >
	                <el-table-column
			                sortable
			                align="center"
			                prop="oldMachineCheck"
			                label="审核状态" >
                        <template scope="scope" >
	                        <div v-if="scope.row.isOldMachine==0"
	                             style="color: black" >
                               无
                            </div >
	                        <div v-else >
	                            <span v-if="scope.row.oldMachineCheck==0"
	                                  style="color: red" >
	                                {{scope.row.oldMachineCheck|filterCheckStatus}}
	                            </span >
	                            <span v-else
	                                  style="color: darkgreen" >
	                                {{scope.row.oldMachineCheck|filterCheckStatus}}
	                            </span >
	                        </div >
                        </template >
                    </el-table-column >
	                <el-table-column
			                sortable
			                align="center"
			                prop="isOldMachine"
			                label="机器来源" >
                        <template slot-scope="scope" >
                        <span >
	                        <div v-if="scope.row.isOldMachine==0"
	                             style="color: green" >
                                {{(scope.row.isOldMachine)|filterMachineSource}}
                            </div >
                            <div v-if="scope.row.isOldMachine==1"
                                 style="color: burlywood" >
                                {{scope.row.isOldMachine|filterMachineSource}}
                            </div >
                            <div v-if="scope.row.isOldMachine==2"
                                 style="color: #8b6c0e" >
                                {{scope.row.isOldMachine|filterMachineSource}}
                            </div >
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

                    <el-table-column width="150"
                                     label="操作" align="center" >
                        <template scope="scope" style="text-align: center" >
                            <el-tooltip placement="top" content="编辑" >
                                <el-button
		                                size="mini"
		                                type="primary"
		                                icon="el-icon-view"
		                                @click="editWithItem(scope.row,1)" >
                                </el-button >
                            </el-tooltip >
                            <el-tooltip placement="top" content="审核" v-show="scope.row.isOldMachine!=0">
                                <el-button
		                                size="mini"
		                                type="success"
		                                icon="el-icon-check"
		                                @click="editWithItem(scope.row,2)" >
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
            </el-col >
			<el-dialog title="机器信息" :visible.sync="showMachineDialog" append-to-body width="80%" >
                    <MachineInfo ref="machineComponent" v-if="showMachineDialog"
                                 :machineInfoData="machineInfoData"
                                 :onSubmitData="onSubmitMachine" ></MachineInfo >
		     </el-dialog >
        </div >
  </div >
</template >

<script >
 import {APIConfig} from '@/config/apiConfig'
 import {Loading} from 'element-ui';
 import {resetObject} from '@/utils'
 import {getSaledMachineInfoList} from '@/api/install_machine';
 import {addMachine, updateMachine} from '@/api/machine_manage';
 import MachineInfo from '@/views/machine_manage/machine_info';
 var _this;
 export default {
	 name: 'machine_home',
	 components: {
		 MachineInfo,
	 },
	 data() {
		 _this = this;
		 return {
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
			 isShowAgent: true,
			 allMachineType: [],
			 allRoles: [],
			 loadingUI: false,
			 machineSourceList: APIConfig.MachineSourceList,
			 machineCheckStatusList: APIConfig.MachineCheckStatusList,
			 showMachineDialog: false,
			 machineInfoData: {},
			 pickerOptions: APIConfig.DateRangeOptions,
		 }
	 },

	 filters: {
		 filterCheckStatus(status)
		 {
			 let result = _this.machineCheckStatusList[0].name;
			 for (let i = 0; i < _this.machineCheckStatusList.length; i++) {
				 if (status == _this.machineCheckStatusList[i].value) {
					 result = _this.machineCheckStatusList[i].name;
					 break;
				 }
			 }
			 return result;
		 },

		 filterMachineSource(sourceType)
		 {
			 let result = _this.machineSourceList[0].name;
			 for (let i = 0; i < _this.machineSourceList.length; i++) {
				 if (sourceType == _this.machineSourceList[i].value) {
					 result = _this.machineSourceList[i].name;
					 break;
				 }
			 }
			 return result;
		 },
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
	 },
	 methods: {
		 isAgentLogin()
		 {
			 return _this.$store.getters.user.user.agent != "0" && _this.$store.getters.user.user.agent != "";
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
				 installStatus: this.condition.status,
				 installChargePersonName: "",
				 query_start_time_install: '',
				 query_finish_time_install: '',
				 agent: !_this.isAgentLogin() ? this.condition.agent : _this.$store.getters.user.user.agentName,//代理商登录为后者
				 isAgent: _this.isAgentLogin(),
				 installRecordCustomerName: this.condition.customer,
				 page: this.currentPage,
				 size: this.pageSize,
				 isFuzzy: true,
			 };
			 if (this.condition.selectDate != null && this.condition.selectDate.length > 0) {
				 condition.query_start_time_install = this.condition.selectDate[0].format("yyyy-MM-dd");
				 condition.query_finish_time_install = this.condition.selectDate[1].format("yyyy-MM-dd");
			 }
			 getSaledMachineInfoList(condition).then(response => {
				 if (responseIsOK(response)) {
					 _this.tableData = response.data.data.list;
					 _this.totalRecords = response.data.data.total;
					 _this.startRow = response.data.data.startRow;
					 _this.isShowAgent = _this.condition.isAgent;
				 }
				 else {
					 showMSG(_this, isStringEmpty(response.data.message) ? "加载数据失败！" : response.data.message)
				 }
			 })
		 },
		 handleAddMachine()
		 {
			 _this.machineInfoData = {};
			 _this.machineInfoData.showType = "0";// 0-add，1-edit,2-check
			 _this.showMachineDialog = true;
		 },
		 editWithItem(item, showType)//详情
		 {
			 _this.selectedItem = copyObject(item);
			 _this.machineInfoData = copyObject(item)
			 _this.machineInfoData.showType = showType;// 0-add，1-edit,2-check
			 _this.showMachineDialog = true;

		 },

		 onSubmitMachine(item)
		 {
			 if (item != null) {
				 let machine = {
					 nameplate: item.nameplate,
					 orderNum: item.orderNum,
					 address: item.address,
					 machineType: item.machineType,
					 needleNum: item.needleNum,
					 xDistance: item.xDistance,
					 yDistance: item.yDistance,
					 headDistance: item.headDistance,
					 headNum: item.headNum,
					 //isOldMachine:2,
					 //oldMachineCheck:0,
					 customer: item.customer,
				 };
				 //submit
				 if (_this.machineInfoData.showType == "0") {//add
					 machine.isOldMachine = "2";
					 machine.oldMachineCheck = "0";
					 machine.status = 1;
					 addMachine(machine).then(response=> {
						 if (responseIsOK(response)) {
							 showMessage(_this, "添加成功!", 1);
							 this.search();
						 }
						 else {
							 showMessage(_this, "添加失败!" + response.data.message);
						 }
					 });
				 }
				 else if (_this.machineInfoData.showType == "1") {//edit
					 machine.id = item.id;
					 updateMachine(machine).then(response=> {
						 if (responseIsOK(response)) {
							 showMessage(_this, "修改成功!", 1);
							 this.search();
						 }
						 else {
							 showMessage(_this, "修改失败!" + response.data.message);
						 }
					 });
				 }
				 else if (_this.machineInfoData.showType == "2") {//check
					 machine.oldMachineCheck = item.oldMachineCheck;
					 machine.id = item.id;
					 updateMachine(machine).then(response=> {
						 if (responseIsOK(response)) {
							 showMessage(_this, "审核成功!", 1);
							 this.search();
						 }
						 else {
							 showMessage(_this, "审核失败!" + response.data.message);
						 }
					 });
				 }
			 }
			 _this.showMachineDialog = false;

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
