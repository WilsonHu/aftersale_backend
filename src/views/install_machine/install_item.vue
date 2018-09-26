<template >
    <div class="install_item_div" >
        <el-tabs v-model="activeId" type="card" editable @edit="handleClick" @tab-click="handleTabClick" >
            <el-tab-pane
		            :key="item.id"
		            v-for="(item, index) in editableTabs"
		            :label="item.name"
		            :name="item.id"
            >
                <div >
                    <div align="right" style="margin-bottom: 16px" >
                        <el-tooltip placement="right" >
                            <div slot="content" >增加调试内容</div >
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
		                    :data="item.tableData"
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
		                        label="调试内容" >
                            <template scope="scope" >
                                <div >
                                    {{scope.row.installContent}}
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
                                <el-tooltip placement="top" >
                                    <div slot="content" >删除</div >
                                    <el-button
		                                    size="small"
		                                    icon="el-icon-delete"
		                                    type="danger"
		                                    @click="handleDelete(scope.row)" ></el-button >
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
                </div >
            </el-tab-pane >
        </el-tabs >

        <el-dialog title="添加" :visible.sync="addTabDialogVisible" width="40%" >
            <el-form :model="addTabform" style="font-size: 18px" >
                <el-col :span="24" >
                    <el-form-item label="安装项名称：" :label-width="formLabelWidth" style="width: 80%" >
                        <el-input v-model="addTabform.name" clearable style="font-size: 18px" ></el-input >
                    </el-form-item >
                </el-col >
            </el-form >
            <div slot="footer" class="dialog-footer" >
                <el-button @click="addTabDialogVisible = false" size="small" >取 消</el-button >
                <el-button type="primary" @click="addTabOK" size="small" >确 定</el-button >
            </div >
        </el-dialog >

        <el-dialog :title="contentformTitle" :visible.sync="addDialogVisible" width="40%" >
            <el-form :model="addContentform" >
                <el-col :span="24" >
                    <el-form-item label="调试内容：" :label-width="formLabelWidth" style="width: 100%" >
                        <el-input v-model="addContentform.installContent" type="textarea"
                                  :rows="5" clearable style="font-size: 18px" ></el-input >
                    </el-form-item >
                </el-col >
            </el-form >
            <div slot="footer" class="dialog-footer" >
                <el-button @click="addDialogVisible = false" size="small" >取 消</el-button >
                <el-button type="primary" @click="addContentOK" size="small" >确 定</el-button >
            </div >
        </el-dialog >
        <el-dialog title="提示" :visible.sync="deleteTabConfirmDialog"
                   append-to-body width="30%" >
            <span >确认要删除选定的安装项吗？</span >
            <span slot="footer" class="dialog-footer" >
              <el-button @click="deleteTabConfirmDialog = false" icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onConfirmDeleteTab" icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >
        <el-dialog title="提示" :visible.sync="deleteContentConfirmDialog"
                   append-to-body width="30%" >
            <span >确认要删除选定的安装内容吗？</span >
            <span slot="footer" class="dialog-footer" >
              <el-button @click="deleteContentConfirmDialog = false" icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onConfirmDeleteContent" icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >
    </div >
</template >

<script >
    import {Loading} from 'element-ui';
    import {APIConfig} from '@/config/apiConfig'
    import {
		    selectLibList,
		    addInstallItem,
		    updateInstallItem,
		    deleteInstallItem,
		    deleteInstallItemByCondition
    } from '@/api/install_machine'

    var _this;
    export default {
	    name: 'install_item',
	    components: {},
	    data(){
		    _this = this;
		    return {
			    activeId: '',
			    targetId: '',
			    editableTabs: [],
			    tabIndex: 2,
			    loadingUI: false,
			    //分页
			    totalRecords: 0,
			    totalPage: 1,
			    pageSize: 5,//APIConfig.EveryPageNum,//每一页的num
			    currentPage: 1,
			    startRow: 1,
			    selectedItem: [],
			    formLabelWidth: '100px',

			    addTabDialogVisible: false,
			    addTabform: {name: ''},

			    isAdd: true,
			    addDialogVisible: false,
			    addContentform: {installContent: ''},
			    contentformTitle: `调试内容`,
			    deleteContentConfirmDialog: false,
			    deleteTabConfirmDialog: false,
		    };
	    },
	    methods: {
		    onConfirmDeleteTab()
		    {
			    this.deleteTabConfirmDialog = false;
			    this.deleteTabFromUI();
		    },

		    deleteTabFromUI()
		    {
			    var activeTab = _this.getCurrentActiveTab();
			    let condition = {
				    installLibName: activeTab.name,
				    isBaseLib: "",
			    }
			    deleteInstallItemByCondition(condition).then(response => {
				    if (responseIsOK(response)) {
					    let tabs = _this.editableTabs;
					    let id = _this.activeId;
					    if (id === _this.targetId) {
						    tabs.forEach((tab, index) => {
							    if (tab.id === id) {
								    let nextTab = tabs[index + 1] || tabs[index - 1];
								    if (nextTab) {
									    id = nextTab.id;
								    }
							    }
						    });
					    }
					    _this.activeId = id;
					    _this.editableTabs = tabs.filter(tab => tab.id !== _this.targetId);
					    _this.onSearchDetailData();
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "删除失败！" : response.data.message)
				    }
			    })
		    },

		    onConfirmDeleteContent()
		    {
			    deleteInstallItem(this.selectedItem.id).then(response => {
				    if (responseIsOK(response)) {
					    let tabs = this.editableTabs;
					    for (let item of tabs) {
						    if (item.id == this.activeId) {
							    for (let tableItem of item.tableData) {
								    if (tableItem.id == this.selectedItem.id) {
									    let index = item.tableData.indexOf(tableItem);
									    item.tableData.splice(index, 1)
								    }
							    }
						    }
					    }
					    this.editableTabs = tabs.filter(tab => tab.id !== this.targetId);
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
			    _this.onSearchDetailData();
		    },

		    addTabOK()
		    {
			    if (isStringEmpty(this.addTabform.name)) {
				    showMessage(this, "调试项不能为空！")
				    return;
			    }
			    let item = {
				    installLibName: this.addTabform.name,
				    isBaseLib: "0",
			    }
			    addInstallItem(item).then(response => {
				    if (responseIsOK(response)) {
					    _this.onSearchBaseData();
					    _this.addTabDialogVisible = false;
					    _this.addTabform.name = "";
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "提交失败！" : response.data.message)
				    }
			    })
		    },

		    handleAddContent()
		    {
			    this.isAdd = true;
			    this.addDialogVisible = true;
			    this.contentformTitle = this.isAdd ? `增加调试内容` : `编辑调试内容`;
		    },

		    getCurrentActiveTab()
		    {
			    let activeItem = null;
			    for (let item of  _this.editableTabs) {
				    if (item.id === _this.activeId) {
					    activeItem = item;
				    }
			    }
			    return activeItem;
		    },

		    //add or update
		    addContentOK()
		    {
			    if (isStringEmpty(this.addContentform.installContent)) {
				    showMessage(this, "调试内容不能为空！")
				    return;
			    }
			    var activeTab = _this.getCurrentActiveTab();
			    var item = {
				    installLibName: activeTab.name,
				    installContent: this.addContentform.installContent,
				    isBaseLib: "1",
			    }
			    if (this.isAdd) {
				    addInstallItem(item).then(response => {
					    if (responseIsOK(response)) {
						    _this.onSearchDetailData();
						    _this.addContentform.installContent = "";//reset
						    _this.addDialogVisible = false;
					    }
					    else {
						    showMSG(_this, isStringEmpty(response.data.message) ? "提交失败！" : response.data.message)
					    }
				    })
			    }
			    else {
				    for (let tableItem of activeTab.tableData) {
					    if (tableItem.name == this.addContentform.name) {
						    item.id = tableItem.id;
					    }
				    }
				    updateInstallItem(item).then(response => {
					    if (responseIsOK(response)) {
						    for (let tableItem of activeTab.tableData) {
							    if (tableItem.id == this.addContentform.id) {
								    tableItem.installContent = this.addContentform.installContent;
							    }
						    }
						    _this.addContentform.installContent = "";//reset
						    _this.addDialogVisible = false;
					    }
					    else {
						    showMSG(_this, isStringEmpty(response.data.message) ? "提交失败！" : response.data.message)
					    }
				    })
			    }
		    },
		    handleTabClick(tab, event)
		    {
			    this.currentPage = 1;
			    _this.editableTabs.forEach((itemTab, index) => {
				    if (itemTab.id === this.activeId) {
					    _this.editableTabs[index].tableData = [];
				    }
			    });
			    _this.onSearchDetailData();
		    },

		    handleClick(target, action) {
			    if (action === 'add') {
				    this.addTabDialogVisible = true;
			    }
			    if (action === 'remove') {
				    this.deleteTabConfirmDialog = true;
				    this.targetId = target;
			    }
		    },
		    handleEdit(item) {
			    this.isAdd = false;
			    this.addContentform = copyObjectByJSON(item);
			    this.addDialogVisible = true;
			    this.contentformTitle = this.isAdd ? `增加调试内容` : `编辑调试内容`;
		    },

		    handleDelete(item) {
			    this.selectedItem = copyObjectByJSON(item);
			    this.deleteContentConfirmDialog = true;
		    },
		    onSearchBaseData()
		    {
			    let condition = {
				    isBaseLib: "0",
				    installLibName: '',
				    page: '',
				    size: '',
			    };
			    selectLibList(condition).then(response => {
				    if (responseIsOK(response)) {
					    _this.editableTabs = [];
					    for (let item of response.data.data.list) {
						    _this.editableTabs.push({
							    id: item.id.toString(),
							    name: item.installLibName,
							    tableData: [],
						    });
					    }
					    if (_this.editableTabs.length > 0) {
						    _this.activeId = _this.editableTabs[_this.editableTabs.length - 1].id;
					    }
					    _this.onSearchDetailData();
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)
				    }
			    })
		    },

		    onSearchDetailData()
		    {
			    let activeTab = _this.getCurrentActiveTab();
			    if (activeTab == null) {
				    return;
			    }
			    let condition = {
				    isBaseLib: "1",
				    installLibName: activeTab.name,
				    page: this.currentPage,
				    size: this.pageSize
			    };

			    selectLibList(condition).then(response => {
				    if (responseIsOK(response)) {
					    _this.totalRecords = response.data.data.total;
					    _this.startRow = response.data.data.startRow;
					    _this.editableTabs.forEach((tab, index) => {
						    if (tab.id === _this.activeId) {
							    _this.editableTabs[index].tableData = response.data.data.list;
						    }
					    });
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)
				    }
			    })
		    },

		    initData()
		    {
			    _this.onSearchBaseData();
		    },

	    },
	    filters: {},

	    created: function () {

	    },
	    mounted: function () {
		    this.initData();
	    }
    }
</script >

<style scoped >
    .install_item_div {
	    position: relative;
	    padding: 20px;
	    width: 100%;
	    height: 85vh;
    }

    .el-select {
	    width: 100%;
    }
</style >
