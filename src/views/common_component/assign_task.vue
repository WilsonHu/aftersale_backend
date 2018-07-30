<template >
    <div class="root_div" >
        <el-form :model="formData" label-position="right" label-width="100px" >
            <div class="panel-body" style="margin-left: -20px" >
                <el-col :span="6" >
                    <el-form-item label="客户联系人:" >
	                    <el-autocomplete clearable
	                                     @select="onSelectedChanged"
	                                     v-model="formData.customerName"
	                                     :fetch-suggestions="queryCustomer"
	                                     placeholder="客户"
	                    ></el-autocomplete >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="联系电话:" >
                      <span v-html="formData.customerPhone" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="地址:" >
                      <span v-html="formData.address" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
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
		            prop="taskCount"
		            label="当前任务" >
                <template scope="scope" >
                    <span >
                        {{scope.row.taskCount}}
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
//		 resultData: {
//			 type: Object,
//			 default: {}
//		 },
	 },
	 data() {
		 _this = this;
		 return {
			 loading: {},
			 formData: {},
			 tableData: [],
			 multipleSelection: [],
			 customerList: [],
			 pickerOptions: {
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
		 loadData()
		 {
			 resetObject(_this.formData);
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
						 _this.tableData = response.data.data.list;
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

		 initCustomerList() {
			 requestCustomerList().then(response=> {
				 if (responseIsOK(response)) {
					 _this.customerList = [];
					 for (let item of response.data.data.list) {
						 _this.customerList.push(Object.assign({
							 value: item.name,
						 }, item));
					 }
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

		 //父组件调用
		 submitData()
		 {
			 console.log("submitData:");

		 },

		 getCurrentData()
		 {
			 if (this.formData.planDate != null && this.formData.planDate.length > 0) {
				 this.formData.planDate = this.formData.planDate.format("yyyy-MM-dd");
			 }
			 return {
				 formData: _this.formData,
				 workerList: _this.multipleSelection
			 }
		 },

		 onSelectedChanged(selectObj)
		 {
			 _this.formData.customerPhone = selectObj.phone;
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
	position: relative;
	padding: 20px;
	width: 100%;
}

span {
	font-size: 18px;
	width: 100%;
	alignment: left;
	text-align: left;
}
</style >
