<template >
  <div class="install_detail_div" >
    <el-form :model="formData" label-position="right" label-width="100px" >
        <div class="panel panel-primary" >
            <div class="panel-heading" style="text-align: left" >
                <h3 class="panel-title" >客户信息</h3 >
            </div >
            <div class="panel-body" style="margin-left: -20px" >
                <el-col :span="6" >
                    <el-form-item label="客户:" >
                        <span v-html="formData.customer" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="联系方式:" >
                      <span v-html="formData.customerPhone" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="代理商:" >
                      <span v-html="formData.agent" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="联系方式:" >
                      <span v-html="formData.agentPhone" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="出厂日期:" >
                      <span v-html="formData.outFactoryDate" ></span >
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
                        <span v-html="formData.nameplate" ></span >
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
                <el-col :span="6"  >
                    <el-form-item label="头距:" >
                      <span v-html="formData.headDistance" ></span >
                    </el-form-item >
                </el-col >

                <el-col :span="6" >
                    <el-form-item label="X行程:" >
                      <span v-html="formData.xDistance" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6"  >
                    <el-form-item label="Y行程:" >
                      <span v-html="formData.yDistance" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6"  >
                    <el-form-item label="剪线方式:" >
                      <span v-html="formData.electricTrim" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6"  >
                    <el-form-item label="电脑:" >
                      <span v-html="formData.electricPc" ></span >
                    </el-form-item >
                </el-col >
            </div >
        </div >

        <div class="panel panel-primary" >
            <div class="panel-heading" style="text-align: left" >
                <h3 class="panel-title" >调试信息</h3 >
            </div >
            <div class="panel-body" style="margin-left: -20px" >
                <el-col :span="6" >
                    <el-form-item label="调试联系人:" >
                        <span v-html="formData.customerContacter" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6"  >
                    <el-form-item label="联系电话:" >
                      <span v-html="formData.phone" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6"  >
                    <el-form-item label="地址:" >
                      <span v-html="formData.address" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6"  >
                    <el-form-item label="调试员:" >
                      <span v-html="formData.headNum" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6"  >
                    <el-form-item label="调试时间:" >
                      <span v-html="formData.installDate" ></span >
                    </el-form-item >
                </el-col >
            </div >
        </div >

        <el-tabs type="border-card" v-model="activeTabId" @tab-click="tabSwitchClick" >
            <el-tab-pane label="调试内容" >
                <div class="panel panel-primary" >
                    <div class="panel-heading" style="text-align: left" >
                        <h3 class="panel-title" >基本项</h3 >
                    </div >
                    <div class="panel-body" style="margin-left: -20px" >
                        <el-col :span="6" >
                            <el-form-item label="调试联系人:" >
                                <span v-html="formData.customerContacter" ></span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="6"  >
                            <el-form-item label="联系电话:" >
                              <span v-html="formData.phone" ></span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="6"  >
                            <el-form-item label="地址:" >
                              <span v-html="formData.address" ></span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="6"  >
                            <el-form-item label="调试员:" >
                              <span v-html="formData.headNum" ></span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="6"  >
                            <el-form-item label="调试时间:" >
                              <span v-html="formData.installDate" ></span >
                            </el-form-item >
                        </el-col >
                    </div >
                </div >
          </el-tab-pane >
          <el-tab-pane label="调试总结" >配置管理</el-tab-pane >
          <el-tab-pane label="客户评价" >角色管理</el-tab-pane >
        </el-tabs >

    </el-form >
  </div >
</template >

<script >
 import {APIConfig} from '@/config/apiConfig'
 var _this;
 export default {
	 name: 'install-detail',
	 props: {
		 machineNameplate: {
			 type: String,
			 default: ''
		 },
		 formData: {
			 type: Object,
			 default: {}
		 },
		 activeTabId: {
			 type: String,
			 default: ''
		 },
		 tabSwitchClick: {
			 type: Function,
			 default: null
		 }
	 },
	 data() {
		 _this = this;
		 return {
			 statusList: APIConfig.MachineStatusList,
		 }
	 },
	 mounted() {

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
	 },
	 methods: {},
 }
</script >

<style scoped >
.install_detail_div {
	position: relative;
	padding: 20px;
	width: 100%;
}

span {
	font-size: 18px;
	width: 100%;
	alignment: left;
	text-align: left;
}
</style >
