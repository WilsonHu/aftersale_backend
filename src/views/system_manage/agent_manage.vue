<template >
  <div class="root_div" >
	    <el-form :model="condition" label-position="right" label-width="60px" >
            <el-row >
                <el-col :span="4" >
                    <el-form-item label="代理商:" >
                        <el-input v-model="condition.name"
                                  placeholder="代理商名称"
                                  auto-complete="off"
                                  clearable ></el-input >
                    </el-form-item >
                </el-col >

                <el-col :span="2" :offset="18" >
                    <el-button
		                    icon="el-icon-search"
		                    size="normal"
		                    type="primary"
		                    @click="search" >搜索
                    </el-button >
                </el-col >
            </el-row >
        </el-form >
        <div align="right" style="margin-bottom: 16px" >
            <el-tooltip placement="right" >
                <div slot="content" >增加代理商</div >
                <el-button
		                icon="el-icon-plus"
		                size="small"
		                type="primary"
		                @click="handleAddContent" ></el-button >
            </el-tooltip >
        </div >
        <el-table
		        v-loading="loadingUI"
		        element-loading-text="获取数据中..."
		        :data="tableData"
		        border
		        highlight-current-row
		        empty-text="暂无数据..."
		        show-overflow-tooltip="true"
		        style="width: 100%; font-size: 16px" >
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
		            label="代理商" >
                <template scope="scope" >
                    <div >
                        {{scope.row.name}}
                    </div >
                </template >
            </el-table-column >
	        <el-table-column
			        align="center"
			        label="地址" >
                <template scope="scope" >
                    <div >
                        {{scope.row.address}}
                    </div >
                </template >
            </el-table-column >
	        <el-table-column
			        align="center"
			        label="电话" >
                <template scope="scope" >
                    <div >
                        {{scope.row.phone}}
                    </div >
                </template >
            </el-table-column >
            <el-table-column
		            label="操作" width="150" align="center" >
                <template scope="scope" style="text-align: center" >
                    <el-tooltip placement="top" >
                        <div slot="content" >编辑</div >
                        <el-button
		                        size="small"
		                        icon="el-icon-edit"
		                        type="primary"
		                        @click="handleEdit(scope.row)" ></el-button >
                    </el-tooltip >
                    <!--<el-tooltip placement="top" >-->
                        <!--<div slot="content" >删除</div >-->
                        <!--<el-button-->
		                        <!--size="small"-->
		                        <!--icon="el-icon-delete"-->
		                        <!--type="danger"-->
		                        <!--@click="handleDelete(scope.row)" ></el-button >-->
                    <!--</el-tooltip >-->
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
        <el-dialog :title="contentformTitle" :visible.sync="addDialogVisible" width="40%" >
            <el-form :model="addContentform" label-width="90px" >
                <el-col :span="24" >
                    <el-form-item label="代理商：" style="width: 100%" >
                        <el-input v-model="addContentform.name"
                                  clearable style="font-size: 18px" ></el-input >
                    </el-form-item >
                </el-col >
	            <el-col :span="24" >
                    <el-form-item label="地址：" style="width: 100%" >
                        <el-input v-model="addContentform.address" type="textarea"
                                  :rows="5" clearable style="font-size: 18px" ></el-input >
                    </el-form-item >
                </el-col >
	            <el-col :span="24" >
                    <el-form-item label="电话：" style="width: 100%" >
                        <el-input v-model="addContentform.phone"
                                  clearable style="font-size: 18px" ></el-input >
                    </el-form-item >
                </el-col >
            </el-form >
            <div slot="footer" class="dialog-footer" >
                <el-button @click="addDialogVisible = false" size="small" >取 消</el-button >
                <el-button type="primary" @click="addContentOK" size="small" >确 定</el-button >
            </div >
        </el-dialog >
        <el-dialog title="提示" :visible.sync="deleteContentConfirmDialog"
                   append-to-body width="30%" >
            <span >确认要删除选定的代理商吗？</span >
            <span slot="footer" class="dialog-footer" >
              <el-button @click="deleteContentConfirmDialog = false" icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onConfirmDeleteContent" icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >
    </div >
</template >

<script >
 var _this;
 import {addAgent, updateAgent, deleteAgent, findByName} from '@/api/system_manage';
 import {getAllAgent} from '@/api/agent';
 import {Loading} from 'element-ui';
 import {APIConfig} from '@/config/apiConfig';
 import {resetObject} from '@/utils'

 export default {
	 name: 'agent_manage',
	 components: {},
	 data(){
		 _this = this;
		 return {
			 loadingUI: false,
			 //分页
			 totalRecords: 0,
			 totalPage: 1,
			 pageSize: APIConfig.EveryPageNum,//每一页的num
			 currentPage: 1,
			 startRow: 1,
			 tableData: [],
			 selectedItem: [],
			 isAdd: true,
			 addDialogVisible: false,
			 condition: {
				 name: '',
			 },
			 addContentform: {
				 name: '',
				 address: '',
				 phone: '',

			 },
			 contentformTitle: `代理商`,
			 deleteContentConfirmDialog: false,
		 };
	 },
	 methods: {
		 onConfirmDeleteContent()
		 {
			 deleteAgent(this.selectedItem.id).then(response => {
				 if (responseIsOK(response)) {

					 for (let tableItem of _this.tableData) {
						 if (tableItem.id == _this.selectedItem.id) {
							 let index = _this.tableData.indexOf(tableItem);
							 _this.tableData.splice(index, 1)
						 }
					 }
					 this.deleteContentConfirmDialog = false;
				 }
				 else {
					 showMSG(_this, isStringEmpty(response.data.message) ? "删除失败！" : response.data.message)
				 }
			 })
		 },

		 handleCurrentChange(val)
		 {
			 this.currentPage = val;
			 this.initData();
		 },

		 handleAddContent()
		 {
			 resetObject(_this.addContentform);
			 this.isAdd = true;
			 this.addDialogVisible = true;
			 this.contentformTitle = this.isAdd ? `增加代理商` : `编辑代理商`;
		 },

		 //add or update
		 addContentOK()
		 {
			 if (isStringEmpty(this.addContentform.name)) {
				 showMessage(this, "代理商不能为空！")
				 return;
			 }
			 if (isStringEmpty(this.addContentform.address)) {
				 showMessage(this, "地址不能为空！")
				 return;
			 }
			 if (isStringEmpty(this.addContentform.phone)) {
				 showMessage(this, "电话不能为空！")
				 return;
			 }

			 if (this.isAdd) {
				 addAgent(this.addContentform).then(response => {
					 if (responseIsOK(response)) {
						 _this.onSearchDetailData();
						 _this.addDialogVisible = false;
						 showMSG(_this, "保存成功！", 1)
					 }
					 else {
						 showMSG(_this, isStringEmpty(response.data.message) ? "保存失败！" : response.data.message)
					 }
				 })
			 }
			 else {
				 updateAgent(this.addContentform).then(response => {
					 if (responseIsOK(response)) {
						 for (let tableItem of _this.tableData) {
							 if (tableItem.id == _this.addContentform.id) {
								 tableItem.name = _this.addContentform.name;
								 tableItem.address = _this.addContentform.address;
								 tableItem.phone = _this.addContentform.phone;
							 }
						 }
						 resetObject(_this.addContentform);
						 _this.addDialogVisible = false;
						 showMSG(_this, "修改成功！", 1)
					 }
					 else {
						 showMSG(_this, isStringEmpty(response.data.message) ? "提交失败！" : response.data.message)
					 }
				 })
			 }
		 },

		 handleTabClick(tab, event)
		 {
			 _this.onSearchDetailData();
		 },

		 handleEdit(item) {
			 this.isAdd = false;
			 this.addContentform = copyObjectByJSON(item);
			 this.addDialogVisible = true;
			 this.contentformTitle = this.isAdd ? `增加代理商` : `编辑代理商`;
		 },

		 handleDelete(item) {
			 this.selectedItem = copyObjectByJSON(item);
			 this.deleteContentConfirmDialog = true;
		 },
		 onSearchDetailData()
		 {
			 resetObject(_this.addContentform);

			 let condition = {
				 page: this.currentPage,
				 size: this.pageSize,
				 name: this.condition.name,
				 isFuzzy: true,
			 };
			 findByName(condition).then(response => {
				 if (responseIsOK(response)) {
					 _this.totalRecords = response.data.data.total;
					 _this.startRow = response.data.data.startRow;
					 _this.tableData = response.data.data.list;
				 }
				 else {
					 showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)
				 }
			 })
		 },
		 search()
		 {
			 _this.onSearchDetailData();
		 },
	 },
	 created: function () {

	 },
	 mounted: function () {
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
