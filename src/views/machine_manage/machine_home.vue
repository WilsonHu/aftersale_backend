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
                        <el-col :span="1" :offset="2" >
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
		                    prop="machineCustomerName"
		                    label="客户" >
                    </el-table-column >
                    <el-table-column
		                    v-if="isShowAgent"
		                    align="center"
		                    prop="machineAgentName"
		                    label="代理商" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    label="机器状态" >
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
                            <div v-if="scope.row.installStatus==5"
                                 style="color: indianred" >
                                {{scope.row.installStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.installStatus==6"
                                 style="color: darkred" >
                                {{scope.row.installStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.installStatus==7"
                                 style="color: red" >
                                {{scope.row.installStatus|filterStatus}}
                            </div >
                        </template >
                    </el-table-column >
	                <el-table-column
			                align="center"
			                prop="facoryDate"
			                label="机器来源" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.facoryDate)|filterDateString}}
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
		                                @click="editWithItem(scope.row)" >
                                </el-button >
                            </el-tooltip >
                            <el-tooltip placement="top" content="审核" >
                                <el-button
		                                size="mini"
		                                type="success"
		                                icon="el-icon-check"
		                                @click="editWithItem(scope.row)" >
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

        </div >
  </div >
</template >

<script >
 import {APIConfig} from '@/config/apiConfig'
 import {Loading} from 'element-ui';
 import {resetObject} from '@/utils'
 import {getInstallRecordInfoList} from '@/api/install_machine';
 var _this;
 export default {
	 name: 'machine_home',
	 components: {},
	 data() {
		 _this = this;
		 return {
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
			 isShowAgent: true,
			 allMachineType: [],
			 allRoles: [],
			 loadingUI: false,
			 machineSourceList:APIConfig.MachineSourceList,
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
				 installStatus: this.condition.status,
				 installChargePersonName: "",
				 query_start_time_install: '',
				 query_finish_time_install: '',
				 agent: this.condition.agent,
				 installRecordCustomerName: this.condition.customer,
				 page: this.currentPage,
				 size: this.pageSize,
				 isFuzzy: true,
			 };
			 if (this.condition.selectDate != null && this.condition.selectDate.length > 0) {
				 condition.query_start_time_install = this.condition.selectDate[0].format("yyyy-MM-dd");
				 condition.query_finish_time_install = this.condition.selectDate[1].format("yyyy-MM-dd");
			 }
			 getInstallRecordInfoList(condition).then(response => {
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
		 editWithItem(item)//详情
		 {
			 _this.selectedItem = item;

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
