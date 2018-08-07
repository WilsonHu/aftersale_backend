<template >
  <div class="root_div" >
     <el-form :model="formData" label-position="right" label-width="100px" >
        <div class="panel panel-primary" >
            <div class="panel-heading" style="text-align: left" >
                <h3 class="panel-title" >客户信息</h3 >
            </div >
            <div class="panel-body" style="margin-left: -20px" >
                <el-col :span="6" >
                    <el-form-item label="客户:" >
                        <span v-html="formData.machineCustomerName" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="联系方式:" >
                      <span v-html="formData.machineCustomerPhone" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="代理商:" >
                      <span v-html="formData.machineAgentName" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="联系方式:" >
                      <span v-html="formData.machineAgentPhone" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="出厂日期:" >
                      <span >{{formData.facoryDate|filterDateString}}</span >
                    </el-form-item >
                </el-col >
            </div >
        </div >

        <div class="panel panel-primary" >
            <div class="panel-heading" style="text-align: left" >
                <h3 class="panel-title" >机器信息</h3 >
            </div >
            <div class="panel-body" style="margin-left: -20px" >
                <el-col :span="6" >
                    <el-form-item label="机器编号:" >
                        <span v-html="formData.machineNameplate" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="机型:" >
                      <span v-html="formData.machineType" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="针数:" >
                      <span v-html="formData.needleNum" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="头数:" >
                      <span v-html="formData.headNum" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="头距:" >
                      <span v-html="formData.headDistance" ></span >
                    </el-form-item >
                </el-col >

                <el-col :span="6" >
                    <el-form-item label="X行程:" >
                      <span v-html="formData.xDistance" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="Y行程:" >
                      <span v-html="formData.yDistance" ></span >
                    </el-form-item >
                </el-col >
            </div >
        </div >

        <div class="panel panel-primary" >
            <div class="panel-heading" style="text-align: left" >
                <h3 class="panel-title" >维修详情</h3 >
            </div >
            <div class="panel-body" style="margin-left: -20px" >
                <el-col :span="6" >
                    <el-form-item label="维修联系人:" >
                        <span v-html="formData.customerNameInRepairRecord" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="联系电话:" >
                      <span v-html="formData.customerPhoneInRepairRecord" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="地址:" >
                      <span v-html="formData.customerAddressInRepairRecord" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="报修时间:" >
                      <span >{{formData.createTime|filterDateString}}</span >
                    </el-form-item >
                </el-col >
            </div >
        </div >

        <el-tabs type="border-card" v-model="activeTabId" @tab-click="tabSwitchClick" >
            <el-tab-pane label="报修内容" >
                <div class="panel panel-primary" >
                    <div class="panel-heading" style="text-align: left" >
                        <h3 class="panel-title" >报修内容</h3 >
                    </div >
                    <div class="panel-body" style="margin-left: -20px" >
                        <el-col :span="6" >
                            <el-form-item label="报修员:" >
                              <span v-html="formData.repairChargePersonName" ></span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="6" >
                            <el-form-item label="报修时间:" >
                                <span >{{formData.createTime|filterDateString}}</span >
                            </el-form-item >
                        </el-col >
                    </div >
                </div >
            </el-tab-pane >
            <el-tab-pane label="代理商维修" >代理商维修</el-tab-pane >
            <el-tab-pane label="信胜维修" >信胜维修</el-tab-pane >
            <el-tab-pane label="客户评价" >客户评价</el-tab-pane >
        </el-tabs >

    </el-form >
  </div >
</template >

<script >
 import {APIConfig} from '@/config/apiConfig'
 import {resetObject} from '@/utils'
 var _this;
 export default {
	 name: 'RepairDetail',
	 components: {},
	 props: {
		 repairRecorderInfo: {
			 type: Object,
			 default: {}
		 }
//		 tabSwitchClick: {
//			 type: Function,
//			 default: null
//		 }
	 },
	 data() {
		 _this = this;
		 return {
			 loading: {},
			 formData: {},
			 activeTabId: 0,
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
		 loadData()
		 {
			 this.formData = {};
			 this.formData = copyObject(_this.repairRecorderInfo);
		 },
		 tabSwitchClick(tab)
		 {
			 console.log("tabSwitchClick:" + tab);

		 },
	 },

	 mounted(){
		 _this.loadData();//仅仅第一次show出来时，会调用。之后，父控件会自行调用loadData()
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

span {
	font-size: 18px;
	width: 100%;
	alignment: left;
	text-align: left;
}
</style >
