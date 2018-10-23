<template >
  <div class="root_div" >
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
                            <el-form-item label="配件名称:" >
                                <el-input v-model="condition.partsName"
                                          placeholder="订单号" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >

	                    <el-col :span="5" >
                            <el-form-item label="客户:" >
                                <el-input v-model="condition.customer"
                                          placeholder="客户" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >
                       <el-col :span="5" >
                            <el-form-item label="维修员:" >
                                  <el-select v-model="condition.repairChargePersonName" clearable >
                                    <el-option
		                                    v-for="item in employeeList"
		                                    :value="item.id"
		                                    :label="item.name" >
                                    </el-option >
                                </el-select >
                            </el-form-item >
                        </el-col >

	                    <el-col :span="2" :offset="2" >
                            <el-button
		                            icon="el-icon-search"
		                            size="normal"
		                            type="primary"
		                            @click="search" >查询
                            </el-button >
                        </el-col >
                    </el-row >
                    <el-row >
	                    <el-col :span="5" >
                            <el-form-item label="供应商:" >
                                <el-input v-model="condition.supplier"
                                          placeholder="供应商" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >

	                    <el-col :span="5" >
                            <el-form-item label="回寄状态:" >
                                <el-select v-model="condition.partsStatus" clearable >
                                    <el-option
		                                    v-for="item in statusList"
		                                    :value="item.value"
		                                    :label="item.name" >
                                    </el-option >
                                </el-select >
                            </el-form-item >
                        </el-col >

	                    <el-col :span="5" >
                            <el-form-item label="回寄单号:" >
                                <el-input v-model="condition.number"
                                          placeholder="回寄单号" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >

	                     <el-col :span="5" >
                            <el-form-item label="确认人:" >
                                <el-input v-model="condition.confirmPerson"
                                          placeholder="确认人" clearable
                                          auto-complete="off" ></el-input >
                            </el-form-item >
                        </el-col >

                        <el-col :span="6" >
                            <el-form-item label="日期:" >
                                <el-date-picker
		                                v-model="condition.selectDate"
		                                type="daterange"
		                                align="left"
		                                unlink-panels
		                                range-separator="—"
		                                start-placeholder="开始日期"
		                                end-placeholder="结束日期"
		                                :picker-options="pickerOptions" >
                                </el-date-picker >
                            </el-form-item >
                        </el-col >

                    </el-row >
                </el-form >

                <el-table
		                v-loading="loadingUI"
		                element-loading-text="获取数据中..."
		                :data="tableData"
		                :default-sort="{prop: 'isOldMachine', order: 'descending'}"
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
                            {{scope.$index+startRow}}
                        </template >
                    </el-table-column >

                    <el-table-column
		                    align="center"
		                    prop="sendbackTrackingNumber"
		                    label="单号" >
                    </el-table-column >
                    <el-table-column
		                    sortable
		                    align="center"
		                    prop="partsName"
		                    label="配件名称" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.partsName}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column label="维修员"
                                     align="center"
                                     prop="repairChargePersonName" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.repairChargePersonName}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="customerNameInRepairRecord"
		                    label="客户" >
                    </el-table-column >
                    <el-table-column
		                    align="center"
		                    prop="supplier"
		                    label="供应商" >
                    </el-table-column >
                    <el-table-column
		                    sortable
		                    align="center"
		                    prop="partsStatus"
		                    label="状态" >
                        <template scope="scope" >
                            <!--<div v-if="scope.row.partsStatus==0"-->
                                 <!--style="color: #686868" >-->
                                <!--{{scope.row.partsStatus|filterStatus}}-->
                            <!--</div >-->
                            <div v-if="scope.row.partsStatus==1"
                                 style="color: red" >
                                {{scope.row.partsStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.partsStatus==2"
                                 style="color: #13678b" >
                                {{scope.row.partsStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.partsStatus==3"
                                 style="color: #198b57" >
                                {{scope.row.partsStatus|filterStatus}}
                            </div >
                            <div v-if="scope.row.partsStatus==4"
                                 style="color: lightskyblue" >
                                {{scope.row.partsStatus|filterStatus}}
                            </div >
                        </template >
                    </el-table-column >

                    <el-table-column
		                    align="center"
		                    prop="sendbackDate"
		                    label="回寄日期" >
                        <template slot-scope="scope" >
                        <span >
                            {{(scope.row.sendbackDate)|filterDateString}}
                        </span >
                        </template >
                    </el-table-column >
					<el-table-column
							sortable
							align="center"
							prop="sendbackConfirmedTime"
							label="确认日期" >
                        <template scope="scope" >
	                        {{scope.row.sendbackConfirmedTime|filterDateString}}
                        </template >
                    </el-table-column >
	                <el-table-column
			                align="center"
			                prop="sendbackConfirmedPersonName"
			                label="确认人" >
                    </el-table-column >

                    <el-table-column width="150"
                                     label="操作" align="center" >
                        <template scope="scope" style="text-align: center" >
                            <el-tooltip placement="top" content="详情" >
                                <el-button
		                                size="mini"
		                                type="primary"
		                                icon="el-icon-view"
		                                @click="editWithItem(scope.row)" >
                                </el-button >
                            </el-tooltip >
                            <el-tooltip placement="top" content="确认"
                                        v-show="scope.row.partsStatus>1 && scope.row.partsStatus<4 " >
                                <el-button
		                                size="mini"
		                                type="success"
		                                icon="el-icon-check"
		                                @click="onConfrim(scope.row)" >
                                </el-button >
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
            </el-col >
		  <el-dialog title="查看" :visible.sync="showDetailDialog" append-to-body fullscreen >
                    <RepairPartsDetail :repairRecorderInfo="repairPartsData"
                                       ref="repairPartsDetail" v-if="showDetailDialog"
                    ></RepairPartsDetail >
		  </el-dialog >
		  <el-dialog title="提示" :visible.sync="confirmCheckDialog"
		             append-to-body width="30%" >
            <span >确定要确认收货吗？</span >
            <span slot="footer" class="dialog-footer" >
              <el-button @click="confirmCheckDialog = false" icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onConfirmCheckOK" icon="el-icon-check" >确 定</el-button >
            </span >
		  </el-dialog >
        </div >
  </div >
</template >

<script >
import {APIConfig} from '@/config/apiConfig';
import {Loading} from 'element-ui';
import {resetObject} from '@/utils';
import {requestEmployeeList} from '@/api/commonApi';
import {
		getPartsInfoList,
		updatePartsInfo,
		getRepairRecordInfoList,
} from '@/api/repair_manage';
import RepairPartsDetail from '@/views/repair_manage/repair_parts_detail';
import store from '@/store';
var _this;

export default {
	name: 'parts_manage',
	components: {
		RepairPartsDetail
	},
	data() {
		_this = this;
		return {
			tableData: [],
			//分页
			pageSize: APIConfig.EveryPageNum,//每一页的num
			currentPage: 1,
			startRow: 0,
			totalRecords: 0,
			statusList: APIConfig.SendBackStatusList,
			yesOrNoList: APIConfig.YESORNOList,
			employeeList: [],
			condition: {
				nameplate: '',
				partsName: '',
				repairChargePersonName: '',
				customer: '',
				supplier: '',
				partsStatus: '',
				number: "",
				confirmPerson: "",
				selectDate: '',
			},
			showDetailDialog: false,
			repairPartsData: {},
			isShowAgent: true,
			allMachineType: [],
			allRoles: [],
			loadingUI: false,
			showMachineDialog: false,
			machineInfoData: {},
			selectedItem: {},
			confirmCheckDialog: false,
			pickerOptions: APIConfig.DateRangeOptions,
		}
	},

	filters: {
		filterDateString(strDate)
		{
			if (isUndefined(strDate) || isNull(strDate) || strDate.length == 0) {
				return '';
			}
			let resDate = new Date(strDate);
			return resDate.format("yyyy-MM-dd");
		},

		filterStatus(id)
		{
			let result = _this.statusList[0].name;
			for (let i = 0; i < _this.statusList.length; i++) {
				if (id == _this.statusList[i].value) {
					result = _this.statusList[i].name;
					break;
				}
			}
			return result;
		},
	},

	methods: {
		initData()
		{
			//employeeList
			requestEmployeeList().then(response => {
				if (responseIsOK(response)) {
					_this.employeeList = response.data.data.list;
				}
			})
		},

		onConfrim(item)
		{
			this.selectedItem = copyObjectByJSON(item);
			_this.confirmCheckDialog = true;
		},
		onConfirmCheckOK()
		{
			_this.confirmCheckDialog = false;
			let partsInfo = {
				id: _this.selectedItem.id,
				partsStatus: APIConfig.SendBackStatusList[3].value, //{value: 4, name: '已确认'},
				sendbackConfirmedPerson: store.getters.user.user.id,
			};
			updatePartsInfo(partsInfo).then(response => {
				if (responseIsOK(response)) {
					showMSG(_this, "确认成功！", 1);
					_this.search();
				}
				else {
					showMSG(_this, isStringEmpty(response.data.message) ? "确认失败！" : response.data.message)
				}

			});

		},
		editWithItem(item)
		{
			this.selectedItem = copyObjectByJSON(item);
			let condition = {
				repairActualInfoId: this.selectedItem.repairActualInfoId,
				isFuzzy: false,
			}
			_this.repairPartsData = {};
			getRepairRecordInfoList(condition).then(response => {
				if (responseIsOK(response)) {
					if (response.data.data.list.length > 0) {
						_this.repairPartsData = Object.assign(this.selectedItem, response.data.data.list[0]);
					}
				}
				_this.showDetailDialog = true;
				if (this.$refs.repairPartsDetail) {
					_this.$refs.repairPartsDetail.loadData();//方法1
				}
			})
		},
		search(){
			this.onSearchDetailData();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.onSearchDetailData();
		},

		onSearchDetailData()
		{
			var condition = {
				nameplate: this.condition.nameplate.trim(),
				partsStatus: this.condition.partsStatus,
				partsName: this.condition.partsName,
				repairChargePersonName: this.condition.repairChargePersonName,
				customerNameInMachine: this.condition.customer,
				queryStartSendbackConfirmedTime: '',
				queryFinishSendbackConfirmedTime: '',
				supplier: this.condition.supplier,
				sendbackTrackingNumber: this.condition.number,
				sendbackConfirmedPerson: this.condition.confirmPerson,
				page: this.currentPage,
				size: this.pageSize,
				isFuzzy: true,
			};
			if (this.condition.selectDate != null && this.condition.selectDate.length > 0) {
				condition.queryStartSendbackConfirmedTime = this.condition.selectDate[0].format("yyyy-MM-dd");
				condition.queryFinishSendbackConfirmedTime = this.condition.selectDate[1].format("yyyy-MM-dd");
			}
			getPartsInfoList(condition).then(response => {
				if (responseIsOK(response)) {
					_this.tableData = response.data.data.list;
					_this.totalRecords = response.data.data.total;
					_this.startRow = response.data.data.startRow;
					//console.log(JSON.stringify(_this.tableData));
				}
				else {
					showMSG(_this, isStringEmpty(response.data.message) ? "加载数据失败！" : response.data.message)
				}
			})
		},
	},

	created()
	{
		this.initData();
		this.onSearchDetailData();
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
