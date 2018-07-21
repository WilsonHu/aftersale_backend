<template>
    <div class='assign_machine_div'>
        <div>
            <el-col class="well well-lg" style="background-color: white;">
                <el-form :model="condition" label-position="right" label-width="90px">
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="机器编号:">
                                <el-input v-model="condition.nameplate"
                                          placeholder="机器编号" clearable
                                          auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="订单编号:">
                                <el-input v-model="condition.orderNum"
                                          placeholder="订单号" clearable
                                          auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" :offset="12">
                            <el-button
                                    icon="el-icon-search"
                                    size="normal"
                                    type="primary"
                                    @click="search">查询
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table
                        v-loading="loadingUI"
                        element-loading-text="获取数据中..."
                        :data="tableData"
                        border
                        empty-text="暂无数据..."
                        ref="singleTable"
                        highlight-current-row
                        show-overflow-tooltip="true"
                        style="width: 100%; ">
                    <el-table-column
                            width="75"
                            align="center"
                            label="序号">
                        <template scope="scope">
                            {{scope.$index+startRow+1}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="nameplate"
                            label="机器编号">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="machineType"
                            label="机型">
                        <template scope="scope">
                            <div>
                                {{scope.row.machineType|filterMachineType}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单号"
                                     align="center"
                                     prop="orderNum">
                        <template scope="scope">
                            <div>
                                {{scope.row.orderNum}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="交货日期">
                        <template slot-scope="scope">
                        <span>
                            {{(scope.row.shipTime)|filterDateString}}
                        </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="出厂日期">
                        <template slot-scope="scope">
                        <span>
                            {{(scope.row.shipTime)|filterDateString}}
                        </span>
                        </template>
                    </el-table-column>
                    <el-table-column width="150"
                                     label="操作" align="center">
                        <template scope="scope" style="text-align: center">
                            <el-tooltip placement="top" content="详情">
                                <el-button
                                        size="mini"
                                        type="primary"
                                        icon="el-icon-view"
                                        @click="editWithItem(scope.row)">
                                </el-button>
                            </el-tooltip>
                            <el-tooltip placement="top" content="分配">
                                <el-button
                                        size="mini"
                                        type="primary"
                                        icon="el-icon-news"
                                        @click="editWithItem(scope.row)">
                                </el-button>
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
            </el-col>

        </div>
    </div>
</template>

<script>
    import {APIConfig} from '@/config/apiConfig'
    import {Loading} from 'element-ui';
    import {getNotInstallMachineList} from '@/api/install_machine'
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
                allMachineType: [],
                allRoles: [],
                loadingUI: false,
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
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
                    query_start_time: '',
                    query_finish_time: '',
                    status: this.condition.status,
                    is_fuzzy: true,
                    page: this.currentPage,
                    size: this.pageSize
                };
                if (this.condition.selectDate != null && this.condition.selectDate.length > 0) {
                    condition.query_start_time = this.condition.selectDate[0].format("yyyy-MM-dd");
                    condition.query_finish_time = this.condition.selectDate[1].format("yyyy-MM-dd");
                }
                getNotInstallMachineList(condition).then(response=>{
                    if (responseIsOK(response)){
                        _this.tableData = response.data.data.list;
                        _this.totalRecords = response.data.data.total;
                        _this.startRow = response.data.data.startRow;
                    }
                    else {
                        showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)

                    }
                })
            },
            editWithItem(item)
            {

            },

            initData()
            {
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

</script>

<style scoped>
    .assign_machine_div {
        position: relative;
        padding: 20px;
        width: 100%;
        height: 85vh;
    }
</style>
