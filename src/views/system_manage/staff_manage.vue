<template >
    <div class="root_div" >
            <el-form :model="filters" label-position="right" label-width="60px" >
                <el-row >
                    <el-col :span="4" >
                        <el-form-item label="账号:" >
                            <el-input v-model="filters.account"
                                      placeholder="账号"
                                      auto-complete="off"
                                      clearable ></el-input >
                        </el-form-item >
                    </el-col >
                    <el-col :span="4" >
                        <el-form-item label="姓名:" >
                            <el-input v-model="filters.name"
                                      placeholder="姓名"
                                      auto-complete="off"
                                      clearable ></el-input >
                        </el-form-item >
                    </el-col >
                    <el-col :span="4" >
                        <el-form-item label="角色:" >
                            <el-select v-model="filters.roleId" clearable >
                                <el-option
		                                v-for="item in allRoles"
		                                v-bind:value="item.id"
		                                v-bind:label="item.roleName" >
                                </el-option >
                            </el-select >
                        </el-form-item >
                    </el-col >
                    <el-col :span="4" >
                        <el-form-item label="在职:" >
                            <el-select v-model="filters.valid" clearable >
                                <el-option
		                                v-for="item in valid"
		                                v-bind:value="item.valid"
		                                v-bind:label="item.name" >
                                </el-option >
                            </el-select >
                        </el-form-item >
                    </el-col >
                    <el-col :span="2" :offset="1" >
                        <el-button
		                        icon="el-icon-search"
		                        size="normal"
		                        type="primary"
		                        @click="search" >搜索
                        </el-button >
                    </el-col >
                    <el-button style="float: right;"
                               icon="el-icon-plus"
                               size="normal"
                               type="primary"
                               @click="handleAdd" >员工
                    </el-button >
                </el-row >
                <el-row v-if="currentUserAgent == 0" >
                    <el-col :span="4" >
                        <el-form-item label="显示代理商:" label-width="90px" >
                            <el-switch
		                            v-model="filters.isAgent"
		                            active-text="是"
		                            inactive-text="否" >
                            </el-switch >
                        </el-form-item >
                    </el-col >
                    <el-col :span="4" >
                        <el-form-item label="代理商:" v-if="filters.isAgent" >
                            <el-select v-model="filters.agent" clearable >
                                <el-option
		                                v-for="item in allAgents"
		                                v-bind:value="item.id"
		                                v-bind:label="item.name" >
                                </el-option >
                            </el-select >
                        </el-form-item >
                    </el-col >
                </el-row >
            </el-form >
        <el-row >
            <el-table
		            v-loading="loadingUI"
		            element-loading-text="获取数据中..."
		            :data="tableData"
		            border
		            style="width: 100%;" >
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
		                prop="account"
		                label="账号" >
                </el-table-column >
                <el-table-column
		                align="center"
		                prop="name"
		                label="姓名" >
                </el-table-column >

                <el-table-column
		                align="center"
		                label="角色" >
                    <template scope="scope" >
                        {{scope.row.roleId | filterRole}}
                    </template >
                </el-table-column >
                <el-table-column
		                align="center"
		                prop="phone"
		                label="联系方式" >
                </el-table-column >
                <el-table-column
		                align="center"
		                label="代理商" >
                    <template scope="scope" >
                        {{scope.row.agent | filterAgent}}
                    </template >
                </el-table-column >
                <el-table-column
		                align="center"
		                prop="valid"
		                label="在职情况" >
                    <template scope="scope" >
                        {{scope.row.valid == 1 ? "在职" : "离职"}}
                    </template >
                </el-table-column >
                <el-table-column
		                align="center"
		                label="操作"
		                width="200" >
                    <template scope="scope" >
                        <el-button
		                        size="small"
		                        icon="el-icon-edit"
		                        type="primary"
		                        @click="handleEdit(scope.row)" >编辑
                        </el-button >
                        <el-button
		                        size="small"
		                        type="danger"
		                        icon="el-icon-delete"
		                        :disabled="scope.row.account=='admin'"
		                        @click="handleDelete(scope.$index, scope.row)" >删除
                        </el-button >
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
        </el-row >
        <el-dialog title="增加用户" :visible.sync="addDialogVisible" width="60%" >
            <el-form :model="form" >
                <el-col :span="12" >
                    <el-form-item label="账号：" :label-width="formLabelWidth" >
                        <el-input v-model="form.account" @change="onChange" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="姓名：" :label-width="formLabelWidth" >
                        <el-input v-model="form.name" @change="onChange" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="联系方式：" :label-width="formLabelWidth" >
                        <el-input v-model="form.phone" @change="onChange" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="角色：" :label-width="formLabelWidth" >
                        <el-select v-model="form.roleId" @change="onChange" >
                            <el-option
		                            v-for="item in allRoles"
		                            v-bind:value="item.id"
		                            v-bind:label="item.roleName" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="代理商：" :label-width="formLabelWidth" >
                        <el-select v-model="form.agent" @change="onChange" clearable :disabled="currentUserAgent != 0" >
                            <el-option
		                            v-for="item in allAgents"
		                            v-bind:value="item.id"
		                            v-bind:label="item.name" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="在职情况：" :label-width="formLabelWidth" >
                        <el-select v-model="form.valid" @change="onChange" >
                            <el-option
		                            v-for="item in valid"
		                            v-bind:value="item.valid"
		                            v-bind:label="item.name" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
            </el-form >
            <el-alert v-if="isError" style="margin-top: 10px;padding: 5px;"
                      :title="errorMsg"
                      type="error"
                      :closable="false"
                      show-icon >
            </el-alert >
            <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
                <el-button @click="addDialogVisible = false" icon="el-icon-close" type="danger" >取 消</el-button >
                <el-button type="primary" @click="onAdd" icon="el-icon-check" >确 定</el-button >
            </div >
        </el-dialog >

        <el-dialog title="编辑用户" :visible.sync="modifyDialogVisible" width="60%" >
            <el-form :model="modifyForm" >
                <el-col :span="12" >
                    <el-form-item label="账号：" :label-width="formLabelWidth" >
                        <el-input v-model="modifyForm.account" @change="onChange"
                                  :disabled="modifyForm.account == 'admin'" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="姓名：" :label-width="formLabelWidth" >
                        <el-input v-model="modifyForm.name" @change="onChange" ></el-input >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="联系方式：" :label-width="formLabelWidth" >
                        <el-input v-model="modifyForm.phone" @change="onChange" ></el-input >
                    </el-form-item >
                </el-col >
	            <!--<el-col :span="12">-->
	            <!--<el-form-item label="确认密码：" :label-width="formLabelWidth">-->
	            <!--<el-input v-model="modifyForm.confirmpwd" @change="onChange"></el-input>-->
	            <!--</el-form-item>-->
	            <!--</el-col>-->
                <el-col :span="12" >
                    <el-form-item label="角色：" :label-width="formLabelWidth" >
                        <el-select v-model="modifyForm.roleId" @change="onChange" >
                            <el-option
		                            v-for="item in allRoles"
		                            v-bind:value="item.id"
		                            v-bind:label="item.roleName" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="代理商：" :label-width="formLabelWidth" >
                        <el-select v-model="modifyForm.agent" @change="onChange" clearable
                                   :disabled="currentUserAgent != 0" >
                            <el-option
		                            v-for="item in allAgents"
		                            v-bind:value="item.id"
		                            v-bind:label="item.name" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
                <el-col :span="12" >
                    <el-form-item label="在职情况：" :label-width="formLabelWidth" >
                        <el-select v-model="modifyForm.valid" @change="onChange" >
                            <el-option
		                            v-for="item in valid"
		                            v-bind:value="item.valid"
		                            v-bind:label="item.name" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
            </el-form >
            <el-alert v-if="isError" style="margin-top: 10px;padding: 5px;"
                      :title="errorMsg"
                      type="error"
                      :closable="false"
                      show-icon >
            </el-alert >
            <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
                <el-button @click="modifyDialogVisible = false" icon="el-icon-close" type="danger" >取 消</el-button >
                <el-button type="primary" @click="onEidt" icon="el-icon-check" >确 定</el-button >
            </div >
        </el-dialog >

        <el-dialog title="提示" :visible.sync="deleteConfirmVisible" width="30%" >
            <span >确认要删除账号为[ <b >{{selectedItem.account}}</b > ]的用户吗？</span >
            <span slot="footer" class="dialog-footer" >
	    <el-button @click="deleteConfirmVisible = false" icon="el-icon-close" >取 消</el-button >
	    <el-button type="primary" @click="onConfirmDelete" icon="el-icon-check" >确 定</el-button >
	  </span >
        </el-dialog >
    </div >
</template >

<script >
    var _this;
    import {getAllRole, selectUsers, addStaff, updateUser, deleteUser} from '@/api/system_manage';
    import {getAllAgent} from '@/api/agent';
    import {APIConfig} from '@/config/apiConfig';

    export default {
	    name: 'staff_manage',
	    components: {},
	    data() {
		    _this = this;
		    return {
			    isError: false,
			    errorMsg: '',
			    totalRecords: 0,
			    selectedItem: {},
			    deleteConfirmVisible: false,
			    tableData: [],
			    //分页
			    pageSize: APIConfig.EveryPageNum,//每一页的num
			    currentPage: 1,
			    startRow: 1,

			    //增加对话框
			    addDialogVisible: false,
			    form: {
				    account: "",
				    name: "",
				    roleId: "",
				    agent: "",
				    phone: "",
				    valid: "1"
			    },
			    formLabelWidth: '100px',

			    //增加对话框
			    modifyDialogVisible: false,
			    modifyForm: {
				    account: "",
				    name: "",
				    roleId: "",
				    agent: "",
				    phone: "",
				    valid: "1"
			    },
			    filters: {
				    name: "",
				    account: "",
				    roleId: "",
				    isAgent: true,
				    agent: "",
				    valid: "1",
			    },
			    allRoles: [],
			    allAgents: [],
			    allMarketGroups: [],
			    valid: [{"valid": "1", "name": "在职"}, {"valid": "0", "name": "离职"}],
			    loadingUI: false,
			    currentUserAgent: 0
		    }
	    },
	    methods: {

		    onChange: function () {
			    if (_this.addDialogVisible) {
				    _this.isError = _this.validateForm(_this.form, false);
			    }
			    else {
				    _this.isError = _this.validateForm(_this.modifyForm, true);
			    }
		    },


		    handleSizeChange(val) {

		    },
		    handleCurrentChange(val) {
			    this.currentPage = val;
			    this.onSelectUsers();
		    },
		    search() {
			    _this.onSelectUsers();
		    },

		    onSelectUsers() {
			    _this.tableData = new Array();
			    _this.loadingUI = true;
			    _this.filters.page = _this.currentPage;
			    _this.filters.size = _this.pageSize;
			    _this.filters.userType = APIConfig.USER_TYPE_STAFF;
			    if (this.currentUserAgent != 0) {
				    _this.filters.currentUserAgent = this.currentUserAgent;
			    }
			    selectUsers(_this.filters).then(response => {
				    if (response.data.code == 200) {
					    _this.totalRecords = response.data.data.total;
					    _this.tableData = response.data.data.list;
					    _this.startRow = response.data.data.startRow;
					    _this.loadingUI = false;
				    }
				    else {
					    Promise.reject("获取用户信息错误！");
					    _this.loadingUI = false;
				    }
			    });
		    },


		    handleAdd() {
			    this.isError = false;
			    this.errorMsg = '';
			    this.addDialogVisible = true;
			    this.form.agent = this.currentUserAgent != 0 ? this.currentUserAgent : "";
		    },

		    handleEdit(item) {
			    this.isError = false;
			    this.errorMsg = '';
			    this.selectedItem = item;
			    this.modifyForm.id = item.id;
			    this.modifyForm.account = item.account;
			    this.modifyForm.name = item.name;
			    this.modifyForm.agent = item.agent;
			    this.modifyForm.phone = item.phone;
			    this.modifyForm.roleId = item.roleId;
			    this.modifyForm.valid = item.valid;
			    this.isError = this.validateForm(this.modifyForm, true);
			    this.modifyDialogVisible = true;
		    },

		    handleDelete(index, item) {
			    this.selectedItem = copyObject(item);
			    if (this.selectedItem) {
				    _this.deleteConfirmVisible = true;
			    }
		    },

		    onConfirmDelete: function () {
			    _this.deleteConfirmVisible = false;
			    _this.deleteConfirmVisible = false;
			    let userData = {
				    id: this.selectedItem.id,
				    valid: 0, // 删除不删除数据，只设置valid=0;
			    };
			    updateUser(userData).then(response => {//deleteUser
				    if (responseIsOK(response)) {
					    showMSG(_this, "删除员工成功！", 1);
					    _this.deleteConfirmVisible = false;
					    this.onSelectUsers();
				    } else {
					    showMessage(_this, isStringEmpty(response.data.message) ? "删除员工失败！" : response.data.message);
				    }
			    })
		    },

		    validateForm(formObj, isEdit) {
			    var iserror = false;

			    if (!iserror && isStringEmpty(formObj.account)) {
				    iserror = true;
				    this.errorMsg = '账号不能为空';
			    }
			    if (!iserror && isStringEmpty(formObj.name)) {
				    iserror = true;
				    this.errorMsg = '姓名不能为空';
			    }

			    if (!iserror && isStringEmpty(formObj.phone)) {
				    iserror = true;
				    this.errorMsg = '联系方式不能为空';
			    }

			    if (!iserror && !isPoneAvailable(formObj.phone)) {
				    iserror = true;
				    this.errorMsg = '手机号格式不正确';
			    }

			    if (!iserror && formObj.roleId == "") {
				    iserror = true;
				    this.errorMsg = '请选择角色';
			    }

			    if (!iserror) {
				    this.errorMsg = ""
			    }

			    return iserror;
		    },

		    onAdd() {
			    this.isError = _this.validateForm(this.form, false);

			    if (!this.isError) {
				    addStaff(this.form).then(response => {
					    if (responseIsOK(response)) {
						    showMSG(_this, "添加员工成功！", 1);
						    _this.addDialogVisible = false;
						    this.onSelectUsers();
					    }
					    else {
						    showMessage(_this, isStringEmpty(response.data.message) ? "添加员工失败！" : response.data.message);
					    }
				    });
			    }

		    },
		    onEidt() {
			    this.isError = this.validateForm(this.modifyForm, true);
			    if (!_this.isError) {
				    updateUser(this.modifyForm).then(response => {
					    if (responseIsOK(response)) {
						    showMSG(_this, "修改员工信息成功！", 1);
						    _this.modifyDialogVisible = false;
						    this.onSelectUsers();
					    }
					    else {
						    showMessage(_this, isStringEmpty(response.data.message) ? "修改员工信息失败！" : response.data.message);
					    }
				    });
			    }
		    },

		    initAllRoles() {
			    getAllRole().then(response => {
				    if (response.data.code == 200) {
					    _this.allRoles = response.data.data.list.filter(item => (item.roleName.indexOf("客户") === -1 && item.roleName.indexOf("联系人") === -1));
					    Promise.resolve()
				    }
				    else {
					    Promise.reject("获取角色信息错误！");
				    }
			    });
		    },

		    initAllAgent() {
			    getAllAgent().then(response => {
				    if (response.data.code == 200) {
					    let tmp = response.data.data.list;
					    _this.allAgents.slice(0, _this.allAgents.length);
					    _this.allAgents.push({
						    "id": 0,
						    "name": " "
					    });
					    for (let i = 0; i < tmp.length; i++) {
						    _this.allAgents.push(tmp[i]);
					    }
				    } else {
					    Promise.reject("获取代理商信息错误！");
				    }
			    });
		    },
		    initMarketGroups() {
			    // $.ajax({
			    //     url: HOST + "/market/group/list",
			    //     type: 'POST',
			    //     dataType: 'json',
			    //     data: {},
			    //     success: function (data) {
			    //         if (data.code == 200) {
			    //             _this.allMarketGroups = data.data.list;
			    //         }
			    //     },
			    //     error: function (data) {
			    //         showMessage(_this, '获取销售组信息错误！', 0);
			    //     }
			    // })
		    },
	    },
	    computed: {},
	    filters: {
		    filterRole(id) {
			    for (let i = 0; i < _this.allRoles.length; i++) {
				    if (_this.allRoles[i].id == id) {
					    return _this.allRoles[i].roleName;
				    }
			    }
			    return "";
		    },
		    filterAgent(id) {
			    for (let i = 0; i < _this.allAgents.length; i++) {
				    if (_this.allAgents[i].id == id) {
					    return _this.allAgents[i].name;
				    }
			    }
			    return "";
		    }

	    },
	    created: function () {
		    this.currentUserAgent = _this.$store.getters.user.user.agent;
		    this.initAllRoles();
		    this.initAllAgent();
		    this.initMarketGroups();

	    },
	    mounted: function () {
		    this.onSelectUsers();
	    },
    }
</script >

<style scoped >
    .root_div {
	    position: relative;
	    padding: 20px;
	    width: 100%;
	    height: 85vh;
    }
</style >
