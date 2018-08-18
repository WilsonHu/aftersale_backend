<template>
    <div class="maintain_type_manage">
        <div align="right" style="margin-bottom: 16px">
            <el-tooltip placement="right">
                <div slot="content">增加保养类型</div>
                <el-button
                        icon="el-icon-plus"
                        size="small"
                        type="primary"
                        @click="handleAddContent"></el-button>
            </el-tooltip>
        </div>
        <el-table
                v-loading="loadingUI"
                element-loading-text="获取数据中..."
                :data="tableData"
                border
                highlight-current-row
                empty-text="暂无数据..."
                show-overflow-tooltip="true"
                style="width: 100%; font-size: 16px">
            <el-table-column
                    width="75"
                    align="center"
                    label="序号">
                <template scope="scope">
                    {{scope.$index+startRow}}
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="保养类型">
                <template scope="scope">
                    <div>
                        {{scope.row.maintainTypeName}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作" width="150" align="center">
                <template scope="scope" style="text-align: center">
                    <el-tooltip placement="top">
                        <div slot="content">编辑</div>
                        <el-button
                                size="small"
                                icon="el-icon-edit"
                                type="primary"
                                @click="handleEdit(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip placement="top">
                        <div slot="content">删除</div>
                        <el-button
                                size="small"
                                icon="el-icon-delete"
                                type="danger"
                                @click="handleDelete(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="text-align: center; margin-top: 20px">
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="totalRecords">
            </el-pagination>
        </div>
        <el-dialog :title="contentformTitle" :visible.sync="addDialogVisible" width="40%">
            <el-form :model="addContentform" label-width="90px">
                <el-col :span="24">
                    <el-form-item label="保养类型：" style="width: 100%">
                        <el-input v-model="addContentform.maintainTypeName" type="textarea"
                                  :rows="5" clearable style="font-size: 18px"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="addContentOK" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="deleteContentConfirmDialog"
                   append-to-body width="30%">
            <span>确认要删除选定的保养类型吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="deleteContentConfirmDialog = false" icon="el-icon-close">取 消</el-button>
              <el-button type="primary" @click="onConfirmDeleteContent" icon="el-icon-check">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {Loading} from 'element-ui';
    import {APIConfig} from '@/config/apiConfig'
    import {
            getMaintainTypeList,
            addMaintainType,
            updateMaintainType,
            deleteMaintainType,
    } from '@/api/maintain_manage'
    var _this;
    export default {
        name: 'maintain_type_manage',
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
                addContentform: {maintainTypeName: ''},
                contentformTitle: `保养类型`,
                deleteContentConfirmDialog: false,
            };
        },
        methods: {
            onConfirmDeleteContent()
            {
                deleteMaintainType(this.selectedItem.id).then(response => {
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
                this.isAdd = true;
                this.addDialogVisible = true;
                this.contentformTitle = this.isAdd ? `增加保养类型` : `编辑保养类型`;
            },

            //add or update
            addContentOK()
            {
                if (isStringEmpty(this.addContentform.maintainTypeName)) {
                    showMessage(this, "保养类型不能为空！")
                    return;
                }
                var item = {
                    maintainTypeName: this.addContentform.maintainTypeName,
                }
                if (this.isAdd) {
                    addMaintainType(item).then(response => {
                        if (responseIsOK(response)) {
                            _this.onSearchDetailData();
                            _this.addContentform.maintainTypeName = "";//reset
                            _this.addDialogVisible = false;
                            showMSG(_this, "保存成功！", 1)
                        }
                        else {
                            showMSG(_this, isStringEmpty(response.data.message) ? "保存失败！" : response.data.message)
                        }
                    })
                }
                else {
                    item.id = this.addContentform.id;
                }
                updateMaintainType(item).then(response => {
                    if (responseIsOK(response)) {
                        for (let tableItem of _this.tableData) {
                            if (tableItem.id == _this.addContentform.id) {
                                tableItem.maintainTypeName = _this.addContentform.maintainTypeName;
                            }
                        }
                        _this.addContentform.maintainTypeName = "";//reset
                        _this.addDialogVisible = false;
                        showMSG(_this, "修改成功！", 1)
                    }
                    else {
                        showMSG(_this, isStringEmpty(response.data.message) ? "提交失败！" : response.data.message)
                    }
                })
            },

            handleTabClick(tab, event)
            {
                _this.onSearchDetailData();
            },

            handleEdit(item) {
                this.isAdd = false;
                this.addContentform = copyObjectByJSON(item);
                this.addDialogVisible = true;
                this.contentformTitle = this.isAdd ? `增加保养类型` : `编辑保养类型`;
            },

            handleDelete(item) {
                this.selectedItem = copyObjectByJSON(item);
                this.deleteContentConfirmDialog = true;
            },
            onSearchDetailData()
            {
                let condition={
                    page: this.currentPage,
                    size: this.pageSize,
                };
                getMaintainTypeList(condition).then(response => {
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

            initData()
            {
                _this.onSearchDetailData();
            },

        },
        created: function () {

        },
        mounted: function () {
            this.initData();
        }
    }
</script>

<style scoped>
    .maintain_type_manage {
        position: relative;
        padding: 20px;
        width: 100%;
        height: 85vh;
    }
</style>