<template >
    <div class="assign_machine_div" >
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
                        <el-col :span="2" :offset="12" >
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
                            {{scope.$index+startRow+1}}
                        </template >
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
                                {{scope.row.machineType | filterMachineType}}
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
		                    label="交货日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.shipTime)|filterDateString}}
                        </span >
                        </template >
                    </el-table-column >
	                <!--<el-table-column-->
	                <!--align="center"-->
	                <!--label="出厂日期">-->
	                <!--<template slot-scope="scope">-->
	                <!--<span>-->
	                <!--{{(scope.row.shipTime)|filterDateString}}-->
	                <!--</span>-->
	                <!--</template>-->
	                <!--</el-table-column>-->
                    <el-table-column width="100"
                                     label="操作" align="center" >
                        <template scope="scope" style="text-align: center" >
                            <!--<el-tooltip placement="top" content="详情">-->
                            <!--<el-button-->
                            <!--size="mini"-->
                            <!--type="primary"-->
                            <!--icon="el-icon-view"-->
                            <!--@click="editWithItem(scope.row)">-->
                            <!--</el-button>-->
                            <!--</el-tooltip>-->
                            <el-tooltip placement="top" content="分配" >
                                <el-button
		                                size="mini"
		                                type="primary"
		                                icon="el-icon-news"
		                                @click="editWithItem(scope.row)" >
                                </el-button >
                            </el-tooltip >
                        </template >
                    </el-table-column >
                </el-table >
                <!--<div class="block" style="text-align: center; margin-top: 20px" >-->
                    <!--<el-pagination-->
		                    <!--background-->
		                    <!--@current-change="handleCurrentChange"-->
		                    <!--:current-page="currentPage"-->
		                    <!--:page-size="pageSize"-->
		                    <!--layout="total, prev, pager, next, jumper"-->
		                    <!--:total="totalRecords" >-->
                    <!--</el-pagination >-->
                <!--</div >-->
            </el-col >

            <el-dialog title="分配机器" :visible.sync="showAssignDialog" append-to-body width="90%" >
                <el-col class="well well-lg" style="background-color: white;" >
                    <el-form :model="dataform" label-position="right" label-width="90px" >
                        <el-row >
                            <el-col :span="5" >
                                <el-form-item label="订单编号:" >
                                    <span v-html="dataform.orderNum" ></span >
                                </el-form-item >
                            </el-col >
                            <el-col :span="5" >
                                <el-form-item label="客户:" >
                                    <el-autocomplete
		                                    v-model="dataform.customerName"
		                                    :fetch-suggestions="queryCustomer"
		                                    placeholder="客户"
                                    >
                                    </el-autocomplete >
                                </el-form-item >
                            </el-col >
                            <el-col :span="5" >
                                <el-form-item label="代理商:" >
                                    <span v-html="agentName" ></span >
                                </el-form-item >
                            </el-col >
                            <el-col :span="5" >
                                <el-form-item label="出厂日期:" >
                                    <el-date-picker
		                                    v-model="dataform.factoryDate"
		                                    type="datetime"
		                                    placeholder="出厂日期"
		                                    align="left"
		                                    :picker-options="pickerOptions" >
                                    </el-date-picker >
                                </el-form-item >
                            </el-col >
                            <el-col :span="2" :offset="2" >
                                <el-button
		                                :disabled="multipleSelection.length==0"
		                                icon="el-icon-setting"
		                                size="normal"
		                                type="primary"
		                                @click="onBindMachine" >绑定
                                </el-button >
                            </el-col >
                        </el-row >
                    </el-form >
                    <el-table
		                    element-loading-text="获取数据中..."
		                    :data="machineTableData"
		                    border
		                    empty-text="暂无数据..."
		                    ref="multipleTable"
		                    @selection-change="handleSelectionChange"
		                    show-overflow-tooltip="true"
		                    style="width: 100%; " >
                        <el-table-column
		                        align="center"
		                        type="selection"
		                        :selectable="setCanSelect"
		                        width="55" >
                        </el-table-column >

                        <el-table-column
		                        align="center"
		                        prop="nameplate"
		                        label="机器编号" >
                        </el-table-column >
                        <el-table-column
		                        align="center"
		                        prop="machineTypeName"
		                        label="机型" >
                            <template scope="scope" >
                                <div >
                                    {{scope.row.machineType | filterMachineType}}
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
		                        label="安装状态" >
                            <template scope="scope" >
                                <div v-if="scope.row.status==0"
                                     style="color: green" >
                                    未绑定
                                </div >
                                <div v-else
                                     style="color: red" >
                                    已绑定
                                </div >
                            </template >
                        </el-table-column >
                        <el-table-column
		                        align="center"
		                        label="交货日期" >
                            <template slot-scope="scope" >
                        <span >
                            {{(scope.row.shipTime)|filterDateString}}
                        </span >
                            </template >
                        </el-table-column >
                        <el-table-column
		                        align="center"
		                        label="出厂日期" >
                            <template slot-scope="scope" >
                        <span >
                            {{(scope.row.factoryDate)|filterDateString}}
                        </span >
                            </template >
                        </el-table-column >
                    </el-table >
                </el-col >
                <div slot="footer" class="dialog-footer" style="margin-bottom: 20px" >
                    <el-button @click="showAssignDialog = false" icon="el-icon-back" >关闭</el-button >
                </div >
            </el-dialog >
        </div >
    </div >
</template >

<script >
    import {APIConfig} from '@/config/apiConfig'
    import {Loading} from 'element-ui';
    import {getNotInstallMachineList, addMachineList} from '@/api/install_machine'
    import {requestCustomerList} from '@/api/commonApi';
    import {resetObject} from '@/utils'
    import store from '@/store'

    var _this;
    export default {
	    name: 'assign_machine',
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
			    statusList: APIConfig.MachineStatusList,
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
			    showAssignDialog: false,
			    selectedItem: {},
			    customerList: [],
			    customerTimeout: null,
			    dataform: {},
			    machineTableData: [],
			    multipleSelection: [],

			    allMachineType: [],
			    allRoles: [],
			    loadingUI: false,
			    pickerOptions: APIConfig.DateOptions,
		    }
	    },
	    computed: {
		    agentName: {//property
			    get: function () {//getter
				    let name = "";
				    if (!isStringEmpty(_this.dataform.customerName)) {
					    _this.customerList.forEach(item=> {
						    if (item.value == _this.dataform.customerName) {
							    name = item.agentName;
							    return name;
						    }
					    });
				    }
				    return name;
			    },
		    },
	    },
	    filters: {
		    filterDateString(strDate)
		    {
			    if (isStringEmpty(strDate)) {
				    return "";
			    }
			    var resDate = new Date(strDate);
			    return resDate.format("yyyy-MM-dd");
		    },

		    filterStatus(id)
		    {
			    var result = _this.statusList[0].name;
			    for (var i = 0; i < _this.statusList.length; i++) {
				    if (id == _this.statusList[i].value) {
					    result = _this.statusList[i].name;
					    break;
				    }
			    }
			    return result;
		    },
		    filterMachineType(id)
		    {
			    var result = '';
			    for (var i = 0; i < _this.allMachineType.length; i++) {
				    if (id == _this.allMachineType[i].id) {
					    result = _this.allMachineType[i].name;
					    break;
				    }
			    }
			    return result;
		    },
	    },
	    methods: {
		    setCanSelect(row, index){
			    return row.status == 0;
		    },

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
				    isFuzzy: true,
				    page: this.currentPage,
				    size: this.pageSize
			    };
			    getNotInstallMachineList(condition).then(response=> {
				    if (responseIsOK(response)) {
					    _this.tableData = response.data.data.list;
					    _this.totalRecords = response.data.data.total;
					    _this.startRow = response.data.data.startRow;
				    }
				    else {
					    showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)

				    }
			    })
		    },

		    handleSelectionChange(val)
		    {
			    _this.multipleSelection = val;
		    },

		    onBindMachine()
		    {
			    if (isStringEmpty(_this.dataform.customerName)) {
				    showMSG(_this, "客户不能为空!");
				    return;
			    }
			    if (isStringEmpty(_this.dataform.factoryDate)) {
				    showMSG(_this, "出厂日期不能为空!");
				    return;
			    }
			    if (this.dataform.factoryDate != null && this.dataform.factoryDate.length > 0) {
				    this.dataform.factoryDate = this.dataform.factoryDate.format("yyyy-MM-dd");
			    }
			    let machineList = [];
			    let customerId = 0;
			    for (let item of _this.customerList) {
				    if (item.value == _this.dataform.customerName) {
					    customerId = item.id;
					    break;
				    }
			    }
			    for (let item of _this.multipleSelection) {
				    let machine = Object.assign(
						    {
							    customer: customerId,
							    facoryDate: _this.dataform.factoryDate,
							    customerInContract: item.customerName,
							    nameplate: item.nameplate,
							    orderNum: item.orderNum,
							    contractNum: item.contractNum,
							    geoLocation: item.geoLocation,
							    address: item.address,
							    status: "1",
							    machineType: item.machineTypeName,
							    needleNum: item.needleNum,
							    xDistance: item.xDistance,
							    yDistance: item.yDistance,
							    headDistance: item.headDistance,
							    headNum: item.headNum,
							    isOldMachine: "0",

						    },)
				    machineList.push(machine)
			    }
			    addMachineList(machineList).then(response=> {
				    _this.showAssignDialog = false;
				    if (responseIsOK(response)) {
					    showMessage(_this, "绑定成功!", 1);
                        _this.onSearchDetailData();
				    }
				    else {
					    showMessage(_this, "绑定失败!" + response.data.message);
				    }
			    });
		    },
		    editWithItem(item)
		    {
			    resetObject(this.dataform);
			    _this.machineTableData = [];
			    _this.selectedItem = Object.assign({}, item);
			    _this.dataform.orderNum = _this.selectedItem.orderNum;
			    _this.showAssignDialog = true;
			    var condition = {
				    orderNum: _this.selectedItem.orderNum,
				    nameplate: '',
				    isFuzzy: false,
				    page: 0,
				    size: 0
			    };
			    getNotInstallMachineList(condition).then(response=> {
				    if (responseIsOK(response)) {
					    _this.machineTableData = response.data.data.list;
				    }
			    })
		    },

		    //获取当前角色的所有客户
		    initCustomerList() {
			    let condition = {
//				    "agentId": store.getters.user.user.agent,
				    "roleId": APIConfig.UserType.Customer,
			    }
			    requestCustomerList(condition).then(response=> {
				    if (responseIsOK(response)) {
					    _this.customerList = [];
					    for (let item of response.data.data.list) {
						    _this.customerList.push({
							    value: item.name,
							    id: item.id,
							    agent: item.agent,
							    agentName: item.agentName,
						    });
					    }
				    }
			    })
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
		    createStateFilter(queryString) {
			    return item => {
				    return (
						    item.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
				    );
			    };
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
	    },
	    created()
	    {
		    this.initData();
		    this.search();
	    }
    }

</script >

<style scoped >
    .assign_machine_div {
	    position: relative;
	    padding: 20px;
	    width: 100%;
	    height: 85vh;
    }
</style >
