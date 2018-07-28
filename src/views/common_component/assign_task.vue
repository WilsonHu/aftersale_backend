<template >
    <div class="root_div" >
        <el-form :model="formData" label-position="right" label-width="100px" >
            <div class="panel-body" style="margin-left: -20px" >
                <el-col :span="6" >
                    <el-form-item label="客户联系人:" >
                        <span v-html="formData.customerName" ></span >
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
                    <el-form-item label="调试时间:" >
                      <span v-html="formData.planDate" ></span >
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
                                  @change="checkStatusChange(scope.row,scope.index)" ></el-checkbox >
                </template >
            </el-table-column >
        </el-table >
    </div >
</template >

<script >
 import {APIConfig} from '@/config/apiConfig'
 import {selectUsers} from '@/api/commonApi';
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
			 selectUsers(null).then(response => {
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

		 checkStatusChange(row, index)
		 {
			 if (row.checked == true) {
				 for (let i = 0; i < _this.tableData.length; i++) {
					 if (index != i) {
						 _this.tableData[i].checked = false;
					 }
				 }
			 }
		 },

		 //父组件调用
		 submitData()
		 {
			 console.log("submitData:");

		 },
	 },

	 mounted(){
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
