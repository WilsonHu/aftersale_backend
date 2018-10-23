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
	            <!--<el-col :span="6" >-->
	            <!--<el-form-item label="剪线方式:" >-->
	            <!--<span v-html="formData.electricTrim" ></span >-->
	            <!--</el-form-item >-->
	            <!--</el-col >-->
	            <!--<el-col :span="6" >-->
	            <!--<el-form-item label="电脑:" >-->
	            <!--<span v-html="formData.electricPc" ></span >-->
	            <!--</el-form-item >-->
	            <!--</el-col >-->
            </div >
        </div >

        <div class="panel panel-primary" >
            <div class="panel-heading" style="text-align: left" >
                <h3 class="panel-title" >调试信息</h3 >
            </div >
            <div class="panel-body" style="margin-left: -20px" >
                <el-col :span="6" >
                    <el-form-item label="调试联系人:" >
                        <span v-html="formData.customerInInstallRecord" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="联系电话:" >
                      <span v-html="formData.customerPhoneInInstallRecord" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="地址:" >
                      <span v-html="formData.customerAddressInInstallRecord" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="调试员:" >
                      <span v-html="formData.installChargePersonName" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="调试时间:" >
                      <span >{{formData.installActualTime|filterDateString}}</span >
                    </el-form-item >
                </el-col >
                <el-row >
                    <el-col :span="22" >
                        <el-form-item label="安装负责人:" >
                            <el-tag class="tagClass" type="success" >
                                {{formData.installChargePersonName}}
                            </el-tag >
                        </el-form-item >
                    </el-col >
                </el-row >
                <el-row >
                    <el-col >
                        <el-form-item label="安装人员:" >
                            <el-tag
		                            v-for="user in installMembers"
		                            :key="user.name"
		                            class="tagClass" type="info" >
                                {{user.name}}
                            </el-tag >
                        </el-form-item >
                    </el-col >
                </el-row >
                <el-row >
                    <el-col :span="6" >
                        <el-form-item label="调试结果:" >
                            <div v-if="formData.installStatus==0"
                                 style="color: #686868" class="status_class" >
                                    {{formData.installStatus|filterStatus}}
                            </div >
                            <div v-if="formData.installStatus==1"
                                 style="color: #8b6c0e" class="status_class" >
                                    {{formData.installStatus|filterStatus}}
                            </div >
                            <div v-if="formData.installStatus==2"
                                 style="color: #13678b" class="status_class" >
                                {{formData.installStatus|filterStatus}}
                            </div >
                            <div v-if="formData.installStatus==3"
                                 style="color: #198b57" class="status_class" >
                                {{formData.installStatus|filterStatus}}
                            </div >
                            <div v-if="formData.installStatus==4"
                                 style="color: darkred" class="status_class" >
                                {{formData.installStatus|filterStatus}}
                            </div >
                        </el-form-item >
                    </el-col >
                </el-row >
            </div >
        </div >

        <el-tabs type="border-card" v-model="activeTabId" @tab-click="tabSwitchClick" >
            <el-tab-pane label="调试内容" >
                <div v-if="installCotentList.length>0" >
                    <div class="panel panel-primary" v-for="item in installCotentList"
                         style="font-weight: bold;font-size: 20px;" >
                        <div class="panel-heading" style="text-align: left" >
                            <span class="panel-title" >{{item.install_lib_name}}</span >
                        </div >
                        <div class="panel-body" >
                            <el-col :span="22" v-for="itemContent in item.contentList" >
                                <span v-if="isShowContent(itemContent)"
                                      style="font-weight: bold;font-size: 20px;margin-left: 5px;" >{{itemContent.install_content}}</span >
                                <el-form-item :label="itemContent.install_content" v-else >
                                    <span >: {{itemContent.install_value}}</span >
                                </el-form-item >
                            </el-col >
                        </div >
                    </div >
                </div >
                <span v-else >
                        暂无内容
                </span >
          </el-tab-pane >
          <el-tab-pane label="调试总结" >
              <el-col :span="22" >
                    <el-form-item label="安装员备注:" >
                      <span v-html="formData.installResult" ></span >
                    </el-form-item >
              </el-col >
          </el-tab-pane >
          <el-tab-pane label="客户评价" >
              <el-col :span="22" >
                    <el-form-item label="用户评分:" >
                        <div style="font-size: 20px;font-weight: bold" >
                            <div v-for="item in skillStars"
                                 style="float: left;" >
                                     <svg-icon :icon-class="onStarLoad(item)"
                                               data-toggle="tooltip" data-placement="top"
                                               :title="item.score"
                                               style="width:30px;height: 30px; margin: 3px;"
                                     />
                            </div >
                            <div class="control-label" v-if="formData.installFeedbackCustomerMark!=''"
                                 style="float: left; margin-left: 10px;font-weight: bold;" >
                                         {{formData.installFeedbackCustomerMark}} 分
                            </div >
                            <div class="control-label" v-else
                                 style="float: left; margin-left: 10px;font-weight: bold;" >
                                        暂无评分
                            </div >
                        </div >
                    </el-form-item >


                </el-col >
                <el-col :span="22" >
                     <el-form-item label="用户评论:" >
                        <div class="control-label" style="float: left; margin-left: 10px;font-weight: bold;" >
                            {{formData.installFeedbackCustomerSuggestion}}
                        </div >
                    </el-form-item >
                </el-col >
          </el-tab-pane >
        </el-tabs >

    </el-form >
  </div >
</template >

<script >
 import {APIConfig} from '@/config/apiConfig'
 import {getInstallDetail, getInstallMembers} from '@/api/install_machine';
 import {resetObject} from '@/utils'
 import {loadServerScore, getStarMode} from '@/api/commonApi'

 var _this;

 export default {
	 name: 'InstallDetail',
	 props: {
		 machineNameplate: {
			 type: String,
			 default: ''
		 },
	 },
	 data() {
		 _this = this;
		 return {
			 statusList: APIConfig.InstallStatusList,
			 loading: {},
			 formData: {},
			 activeTabId: 0,
			 installCotentList: [],
			 skillStars: [],
			 installMembers: [],
		 }
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
			 var result = "";
			 for (var i = 0; i < _this.statusList.length; i++) {
				 if (id == _this.statusList[i].value) {
					 result = _this.statusList[i].name;
					 break;
				 }
			 }
			 return result;
		 },
	 },
	 methods: {
		 onStarLoad(item)
		 {
			 return getStarMode(item.starMode);
		 },
		 isShowContent(item)
		 {
			 if (isUndefined(item)) {
				 return false;
			 }
			 return item.install_lib_name != "基础项";
		 },
		 loadMembers()
		 {
			 _this.installMembers = [];
			 let condition = {
				 page: '',
				 size: '',
				 installRecordId: _this.formData.id,
			 };
			 getInstallMembers(condition).then(response => {
				 if (responseIsOK(response)) {
					 _this.installMembers = response.data.data.list;
				 }
				 else {
					 showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)
				 }
			 })
		 },
		 loadData()
		 {
			 this.formData = {};
			 _this.loading = this.$loading({
				 lock: true,
				 text: '拼命加载中',
				 spinner: 'el-icon-loading',
				 background: 'rgba(0, 0, 0, 0.7)'
			 });
			 if (_this.machineNameplate != null) {
				 var condition = {
					 nameplate: _this.machineNameplate,
				 };
				 getInstallDetail(condition).then(response => {
					 if (responseIsOK(response)) {
						 if (response.data.data.list.length > 0) {
							 _this.formData = response.data.data.list[0];
							 _this.installCotentList = [];
							 try {
								 let list = JSON.parse(_this.formData.installInfo);
								 for (let item of list) {
									 let isExsitName = false;
									 for (let cItem of _this.installCotentList) {
										 if (item.install_lib_name == cItem.install_lib_name) {
											 isExsitName = true
											 cItem.contentList.push(item)
											 break;
										 }
									 }
									 if (!isExsitName) {
										 let detailList = [];
										 detailList.push(item);
										 _this.installCotentList.push({
											 "install_lib_name": item.install_lib_name,
											 "contentList": detailList,
										 });
									 }
								 }
								 //console.log("数据 installCotentList:\r\n" + JSON.stringify(_this.installCotentList))
								 _this.loadMembers();
							 } catch (e) {
								 console.log(e);
							 }
						 }
					 }
					 else {
						 showMSG(_this, isStringEmpty(response.data.message) ? "加载数据失败！" : response.data.message)
					 }
					 _this.loading.close();
				 }).catch(error=> {
					 _this.loading.close();
				 })
			 }
		 },
		 tabSwitchClick(tab)
		 {
			 console.log("tabSwitchClick:" + tab);

		 },
	 },

	 mounted(){
		 _this.loadData();//仅仅第一次show出来时，会调用。之后，父控件会自行调用loadData()
		 _this.skillStars = loadServerScore(_this.formData.maintainFeedbackCustomerMark);
//		 this.$on('onShowDetail', function () {//对应父控件调用的方法二
//			 _this.loadData();
//			 console.log('监听成功')
//		 })
	 },
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

.tagClass {
	margin-left: 5px;
	width: 200px;
}

.status_class {
	font-size: 18px;
	font-weight: bold;
}
</style >
