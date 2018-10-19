<template >
	<div class="root_div" >
		<el-col class="well well-lg" style="background-color: white;" >
			<el-form :model="condition" label-position="right" label-width="90px" >
				<el-row >
		            <el-col :span="5" >
		                <el-form-item label="机型:" >
		                    <el-input v-model="condition.machineType"
		                              placeholder="机型" clearable
		                              auto-complete="off" ></el-input >
		                </el-form-item >
		            </el-col >
					<el-col :span="5" >
		                <el-form-item label="关键字:" >
		                    <el-input v-model="condition.keyword"
		                              placeholder="关键字" clearable
		                              auto-complete="off" ></el-input >
		                </el-form-item >
		            </el-col >
					<el-col :span="2" :offset="1" >
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
					highlight-current-row
					empty-text="暂无数据..."
					show-overflow-tooltip="true"
					style="width: 100%; font-size: 16px" >
	            <el-table-column
			            align="center"
			            label="问题描述" >
	                <template scope="scope" >
	                    <div >
	                        {{scope.row.content}}
	                    </div >
	                </template >
	            </el-table-column >
				<el-table-column
						 align="center"
						 label="机型" >
	                <template scope="scope" >
	                    <div >
	                        {{scope.row.machineType}}
	                    </div >
	                </template >
	            </el-table-column >
				<el-table-column
						align="center"
						label="阅读量" >
	                <template scope="scope" >
	                    <div >
	                        {{scope.row.machineType}}
	                    </div >
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
	</div >
</template >

<script >
	import {APIConfig} from '@/config/apiConfig'

	var _this;
	export default {
		name: 'ExperienceLib',
		components: {},
		data() {
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
				condition: {
					machineType: '',
					keyword: '',
				},
			}
		},
		methods: {
			tabSwitchClick(tab)
			{

			},
			search() {
				//this.onSearchDetailData();
			},
		},
	}
</script >

<style scoped >
.root_div {
	position: relative;
	padding: 0px;
	width: 100%;
	height: 100%;
}
</style >
