<template>
    <div class='install_item_div'>
        <el-tabs v-model="activeTab" type="card" editable @edit="handleClick">
            <el-tab-pane
                    :key="item.name"
                    v-for="(item, index) in editableTabs"
                    :label="item.title"
                    :name="item.name"
            >
                <div>
                    <div align="right" style="margin-bottom: 20px">
                        <el-tooltip placement="right">
                            <div slot="content">增加调试内容</div>
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
                            :data="item.tableData"
                            border
                            highlight-current-row
                            empty-text="暂无数据..."
                            show-overflow-tooltip="true"
                            style="width: 100%; ">
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
                                label="调试内容">
                            <template scope="scope">
                                <div>
                                    {{scope.row.content}}
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
                                            type="primary"
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
                </div>
            </el-tab-pane>
        </el-tabs>

        <el-dialog title="添加" :visible.sync="addTabDialogVisible" width="40%">
            <el-form :model="addTabform">
                <el-col :span="24">
                    <el-form-item label="安装项名称：" :label-width="formLabelWidth" style="width: 80%">
                        <el-input v-model="addTabform.name" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addTabDialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="addTabOK" size="small">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="contentformTitle" :visible.sync="addDialogVisible" width="40%">
            <el-form :model="addContentform">
                <el-col :span="24">
                    <el-form-item label="调试内容：" :label-width="formLabelWidth" style="width: 100%">
                        <el-input v-model="addContentform.content" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="addContentOK" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {Loading} from 'element-ui';
    export default {
        name: 'install_item',
        components: {},
        data(){
            return {
                activeTab: '1',
                editableTabs: [
                    {
                        title: 'Tab 1',
                        name: '1',
                        tableData: [],

                    },
                    {
                        title: 'Tab 2',
                        name: '2',
                        tableData: [],
                    }],
                tabIndex: 2,
                loadingUI: false,
                //分页
                totalRecords: 0,
                totalPage: 1,
                pageSize: 10,//每一页的num
                currentPage: 1,
                startRow: 1,
                selectedItem: [],
                formLabelWidth: '100px',

                deleteConfirmVisible: false,
                addTabDialogVisible: false,
                addTabform: {name: ''},

                isAdd: true,
                addDialogVisible: false,
                addContentform: {content: ''},
                contentformTitle: `调试内容`
            };
        },
        methods: {

            handleCurrentChange(val)
            {
                this.currentPage = val;
                this.initData();
            },
            addNewTab()
            {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: this.addTabform.name,
                    name: newTabName,
                    tableData: [],
                });
                this.activeTab = newTabName;
                this.addTabform.name = "";
            },

            addTabOK()
            {
                if (isStringEmpty(this.addTabform.name)) {
                    showMessage(this, "调试项不能为空！")
                    return;
                }
                //TODO
                this.addTabDialogVisible = false;
                this.addNewTab();
            },

            handleAddContent()
            {
                this.isAdd = true;
                this.addDialogVisible = true;
                this.contentformTitle = this.isAdd ? `增加调试内容` : `编辑调试内容`;
            },
            addContentOK()
            {
                if (isStringEmpty(this.addContentform.content)) {
                    showMessage(this, "调试内容不能为空！")
                    return;
                }
                //TODO
                this.addDialogVisible = false;

                for (let item of this.editableTabs) {
                    if (item.name == this.activeTab) {
                        if (this.isAdd) {
                            item.tableData.push({
                                content: this.addContentform.content,
                            });
                        } else {
                            for (let tableItem of item.tableData) {
                                if (tableItem.id == this.addContentform.id) {
                                    tableItem.content = this.addContentform.content;
                                }
                            }
                        }
                        this.addContentform.content = "";//reset
                    }
                }

            },

            handleClick(targetName, action) {
                if (action === 'add') {
                    this.addTabDialogVisible = true;
                }
                if (action === 'remove') {
                    let tabs = this.editableTabs;
                    let activeName = this.activeTab;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.name;
                                }
                            }
                        });
                    }

                    this.activeTab = activeName;
                    this.editableTabs = tabs.filter(tab => tab.name !== targetName);
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
                this.deleteConfirmVisible = true;
            },

            onConfirmDelete() {
                //this.deleteData(_this.selectedItem);
                this.deleteConfirmVisible = false;
            },

            initData()
            {

            },

        },
        filters: {},

        created: function () {

        },
        mounted: function () {
            this.initData();
        }
    }
</script>

<style scoped>
    .install_item_div {
        position: relative;
        padding: 20px;
        width: 100%;
        height: 85vh;
    }
</style>
