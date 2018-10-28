<template >
	<div class="root_div" >
		<el-form :model="formData" label-position="right" label-width="100px" >
			<el-row >
				<el-col :span="8" >
					<el-form-item label="机器编号:" >
                        <el-input v-model="formData.nameplate" :disabled="isDialbleEdit"
                                  placeholder="机器编号" clearable
                                  auto-complete="off" ></el-input >
                    </el-form-item >
				</el-col >
				<el-col :span="8" >
                    <el-form-item label="订单编号:" >
	                     <el-input v-model="formData.orderNum" :disabled="isDialbleEdit"
	                               placeholder="订单编号" clearable
	                               auto-complete="off" ></el-input >
                    </el-form-item >
				</el-col >
			</el-row >
	        <div class="panel panel-primary" >
	            <div class="panel-heading" style="text-align: left" >
	                <h3 class="panel-title" >客户信息</h3 >
	            </div >
	            <div class="panel-body" style="margin-left: -20px" >
		            <el-col :span="8" >
                        <el-form-item label="客户:" >
                            <el-autocomplete clearable
                                             :disabled="isDialbleEdit"
                                             @select="onSelectedChanged"
                                             v-model="formData.customerName"
                                             :fetch-suggestions="queryCustomer"
                                             placeholder="客户"
                            ></el-autocomplete >
                        </el-form-item >
                    </el-col >
	                <el-col :span="6" >
	                    <el-form-item label="代理商:" >
	                      <span v-html="formData.agent" ></span >
	                    </el-form-item >
	                </el-col >
		             <el-col :span="6" >
	                    <el-form-item label="地址:" >
	                      <span v-html="formData.address" ></span >
	                    </el-form-item >
	                </el-col >
	            </div >
	        </div >
	        <div class="panel panel-primary" >
	            <div class="panel-heading" style="text-align: left" >
	                <h3 class="panel-title" >机器信息</h3 >
	            </div >
	            <div class="panel-body" style="margin-left: -20px" >
	                <el-col :span="6" >
	                    <el-form-item label="机型:" >
		                    <el-select v-model="formData.machineType" clearable
		                               :disabled="isDialbleEdit" >
                                    <el-option
		                                    v-for="item in allMachineType"
		                                    :value="item.name"
		                                    :label="item.name" >
                                    </el-option >
		                    </el-select >
	                    </el-form-item >
	                </el-col >
	                <el-col :span="6" >
	                    <el-form-item label="针数:" >
		                     <el-input v-model="formData.needleNum"
		                               :disabled="isDialbleEdit"
		                               placeholder="针数" clearable
		                               auto-complete="off" ></el-input >
	                    </el-form-item >
	                </el-col >
	                <el-col :span="6" >
	                    <el-form-item label="头数:" >
		                    <el-input v-model="formData.headNum"
		                              :disabled="isDialbleEdit"
		                              placeholder="头数" clearable
		                              auto-complete="off" ></el-input >
	                    </el-form-item >
	                </el-col >
	                <el-col :span="6" >
	                    <el-form-item label="头距:" >
		                      <el-input v-model="formData.headDistance"
		                                :disabled="isDialbleEdit"
		                                placeholder="头距" clearable
		                                auto-complete="off" ></el-input >
	                    </el-form-item >
	                </el-col >

	                <el-col :span="6" >
	                    <el-form-item label="X行程:" >
		                    <el-input v-model="formData.xDistance"
		                              :disabled="isDialbleEdit"
		                              placeholder="X行程" clearable
		                              auto-complete="off" ></el-input >
	                    </el-form-item >
	                </el-col >
	                <el-col :span="6" >
	                    <el-form-item label="Y行程:" >
		                     <el-input v-model="formData.yDistance"
		                               :disabled="isDialbleEdit"
		                               placeholder="Y行程" clearable
		                               auto-complete="off" ></el-input >
	                    </el-form-item >
	                </el-col >
	            </div >
	        </div >
			<el-row >
				 <el-col :span="8" >
	                    <el-form-item label="审核结果:" v-show="formData.showType==2" >
		                    <el-radio-group v-model="formData.oldMachineCheck" >
			                    <el-radio-button label="0" >不通过</el-radio-button >
			                    <el-radio-button label="1" >通过</el-radio-button >
		                    </el-radio-group >
	                    </el-form-item >
	                </el-col >
			</el-row >
		</el-form >

		<div slot="footer" class="dialog-footer" style="margin-bottom:50px;text-align: right;" >
			<el-button type="success" @click="onSave" icon="el-icon-check" >确定</el-button >
		</div >
  </div >
</template >

<script >
 import {APIConfig} from '@/config/apiConfig'
 import {resetObject} from '@/utils'
 import {requestEmployeeList, requestCustomerList} from '@/api/commonApi'
 import store from '@/store'
 var _this;

 export default {
	 name: 'MachineInfo',
	 props: {
		 //showType 0-add，1-edit,2-check
		 machineInfoData: {
			 type: Object,
			 default: function () {
				 return {}
			 }
		 },
		 onSubmitData: {
			 type: Function,
			 default: null
		 }
	 },
	 data() {
		 _this = this;
		 return {
			 formData: {
				 oldMachineCheck: "0",
			 },
			 allMachineType: [],
			 oldData: {},
		 }
	 },
	 filters: {
		 filterDateString(strDate)
		 {
			 var resDate = new Date(strDate);
			 return resDate.format("yyyy-MM-dd");
		 },
	 },
	 computed: {
		 isDialbleEdit: {//property
			 get: function () {//getter
				 if (_this.formData.isOldMachine == "0") {//生产部的机器，应该不能编辑
					 return true;
				 }
				 return false;
			 },
		 },
	 },
	 methods: {
		 onSave()
		 {
			 if (_this.formData.isOldMachine == "0") {
				 _this.onSubmitData(null);
				 return
			 }
			 if (isStringEmpty(_this.formData.nameplate)) {
				 showMessage(_this, "机器编号不能空！")
				 return;
			 }
			 if (isStringEmpty(_this.formData.orderNum)) {
				 showMessage(_this, "订单编号不能空！")
				 return;
			 }
			 if (isStringEmpty(_this.formData.customerName)) {
				 showMessage(_this, "客户不能空！")
				 return;
			 }
			 if (isStringEmpty(_this.formData.machineType)) {
				 showMessage(_this, "机型不能空！")
				 return;
			 }
			 if (isStringEmpty(_this.formData.needleNum)) {
				 showMessage(_this, "针数不能空！")
				 return;
			 }
			 if (isStringEmpty(_this.formData.headNum)) {
				 showMessage(_this, "头数不能空！")
				 return;
			 }
			 if (isStringEmpty(_this.formData.headDistance)) {
				 showMessage(_this, "头距不能空！")
				 return;
			 }
			 if (isStringEmpty(_this.formData.xDistance)) {
				 showMessage(_this, "X行程不能空！")
				 return;
			 }
			 if (isStringEmpty(_this.formData.yDistance)) {
				 showMessage(_this, "Y行程不能空！")
				 return;
			 }
			 if (validateIsDifferent(_this.machineInfoData, _this.formData)) {
				 _this.onSubmitData(_this.formData);
			 } else {
				 _this.onSubmitData(null);
			 }
		 },

		 onSelectedChanged(selectObj)
		 {
			 _this.formData.address = selectObj.address;
			 _this.formData.agent = selectObj.agentName;
			 _this.formData.customer = selectObj.id;
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

		 initCustomerList() {
			 //查询出当前登录角色拥有的客户
			 //代理商或sinsim
			 let condition = {
				 "agentId": store.getters.user.user.agent,
				 "roleId": APIConfig.UserType.Customer,
			 }
			 requestCustomerList(condition).then(response=> {
				 if (responseIsOK(response)) {
					 _this.customerList = [];
					 for (let item of response.data.data.list) {
						 _this.customerList.push(Object.assign({
							 value: item.name,
							 id: item.id,
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

		 loadData()
		 {
			 this.formData = copyObject(_this.machineInfoData);
			 if (isStringEmpty(this.formData.oldMachineCheck)) {
				 this.formData.oldMachineCheck = "0";
			 }
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

.el-select {
	width: 100%;
}
</style >