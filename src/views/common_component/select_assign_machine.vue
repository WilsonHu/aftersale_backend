<template >
    <div >
        <el-form :model="formData" label-position="right" label-width="100px" >
            <div class="panel-body" style="margin-left: -20px" >
                <el-col :span="24" >
                    <el-form-item label="查询词" >
						  <el-input placeholder="输入查询词" v-model="keyWord"
						            class="input-with-select" >
							  <el-select v-model="selectKey" slot="prepend" placeholder="请选择"
							             style="width: 180px" >
							      <el-option label="机器编号" value="nameplate" ></el-option >
							      <el-option label="订单号" value="orderNum" ></el-option >
							      <el-option label="客户" value="customerName" ></el-option >
							  </el-select >
							  <el-button slot="append" icon="el-icon-search" @click="onSearch" ></el-button >
						  </el-input >
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
		             width="75"
		             align="center"
		             label="序号" >
                        <template scope="scope" >
                            {{scope.$index+startRow}}
                        </template >
             </el-table-column >
			<el-table-column
				align="center"
				type="selection"
				width="55" >
			</el-table-column >
            <el-table-column
		            align="center"
		            prop="nameplate"
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
			         label="出厂日期">
                        <template slot-scope="scope">
                        <span>
                            {{(scope.row.facoryDate)|filterDateString}}
                        </span>
                        </template>
                    </el-table-column>
            <!--<el-table-column-->
		            <!--align="center"-->
		            <!--label="选择" >-->
                <!--<template slot-scope="scope" >-->
                     <!--<el-checkbox v-model="scope.row.checked"-->
                                  <!--@change="checkStatusChange(scope.row)" ></el-checkbox >-->
                <!--</template >-->
            <!--</el-table-column >-->
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
    </div >
</template >

<script >
 import {APIConfig} from '@/config/apiConfig'
 import {getSaledMachineInfoList} from '@/api/commonApi';
 import {resetObject} from '@/utils'
 var _this;

 export default {
	 name: "SelectAssignMachine",
	 props: {
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
//				 keyWord: '',
//				 selectKey: '',
			 },
			 keyWord: '',
			 selectKey: '',
			 tableData: [],
			 selectedItem: {},
			 //分页
			 pageSize: APIConfig.EveryPageNum,//每一页的num
			 currentPage: 1,
			 startRow: 0,
			 totalRecords: 0,
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

		 handleSelectionChange(val)
		 {
			 _this.multipleSelection = val;
			 _this.dataChanged(_this.getCurrentData());
		 },

		 handleCurrentChange(val) {
			 this.currentPage = val;
			 this.loadData();
		 },
		 onSearch()
		 {
			 this.currentPage = 1;
			 _this.loadData();
		 },
		 loadData()
		 {
			 resetObject(_this.formData);
			 resetObject(_this.selectedItem);
			 _this.tableData = [];
			 _this.loading = this.$loading({
				 lock: true,
				 text: '拼命加载中',
				 spinner: 'el-icon-loading',
				 background: 'rgba(0, 0, 0, 0.7)'
			 });
			 let condition = {
				 page: _this.currentPage,
				 size: _this.pageSize,
				 isFuzzy: true,
			 };
			 if (!isStringEmpty(_this.selectKey)) {
				 condition = Object.assign(condition, {
					 [_this.selectKey]: _this.keyWord,//ES6语法，变量作为Key写法
				 });
			 }

			 getSaledMachineInfoList(condition).then(response => {
				 if (responseIsOK(response)) {
					 if (response.data.data.list.length > 0) {
						 _this.tableData = response.data.data.list;
						 _this.totalRecords = response.data.data.total;
						 _this.startRow = response.data.data.startRow;
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

		 checkStatusChange(row)
		 {
			 _this.selectedItem = copyObject(row);
			 _this.dataChanged(_this.getCurrentData());
		 },

		 loadingClose()
		 {
			 _this.loading.close();
		 },
		 getCurrentData()
		 {
			 return _this.multipleSelection;
		 },

	 },
	 watch: {
		 selectedItem: function (val) {
			 _this.dataChanged(_this.getCurrentData());
		 },
		 tableData: function (val) {
			 _this.dataChanged(_this.getCurrentData());
		 }
	 },

	 mounted(){
		 _this.loadData();//仅仅第一次show出来时，会调用。之后，父控件会自行调用loadData()
	 },
 }
</script >

<style scoped >
.input-with-select .el-input-group__prepend {
	background-color: #fff;
}

span {
	font-size: 18px;
	width: 100%;
	alignment: left;
	text-align: left;
}
</style >
