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
                <h3 class="panel-title" >保养详情</h3 >
            </div >
            <div class="panel-body" style="margin-left: -20px" >
                <el-col :span="6" >
                    <el-form-item label="保养联系人:" >
                        <span v-html="formData.customerNameInMaintainRecord" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="联系电话:" >
                      <span v-html="formData.customerPhoneInMaintainRecord" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="地址:" >
                      <span v-html="formData.customerAddressInMaintainRecord" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="保养员:" >
                      <span v-html="formData.maintainChargePersonName" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="保养时间:" >
                      <span >{{formData.maintainDateActual|filterDateString}}</span >
                    </el-form-item >
                </el-col >

            </div >
        </div >

        <el-tabs type="border-card" v-model="activeTabId" @tab-click="tabSwitchClick" >
            <el-tab-pane label="保养内容" name="0" >
                <el-row >
                    <el-col :span="6" >
                        <el-form-item label="保养项:" >
                            <span v-html="formData.maintainLibName" ></span >
                        </el-form-item >
                    </el-col >
                    <el-col :span="6" >
                        <el-form-item label="保养时间:" >
                            <span >{{formData.maintainDateActual|filterDateString}}</span >
                        </el-form-item >
                    </el-col >
                </el-row >
                <div v-if="maintainCotentList.length>0" >
                    <div class="panel panel-primary" v-for="item in maintainCotentList"
                         style="font-weight: bold;font-size: 20px;" >
                        <div class="panel-heading" style="text-align: left" >
                            <span class="panel-title" >{{item.maintainType|filterMaintainTypeName}}</span >
                        </div >
                        <div class="panel-body" >
                            <el-col :span="20" v-for="itemContent in item.contentList" >
                                <svg-icon :icon-class="showCheckBox(itemContent.checkValue)"
                                          style="width:30px;height: 30px; margin-left: 3px;margin-top: 5px;"
                                />
                                <span style="font-weight: bold;font-size: 20px;margin-left: 5px;" >{{itemContent.content}}</span >
                            </el-col >
                        </div >
                    </div >
                </div >
                <span v-else >
                    暂无内容
                </span >
            </el-tab-pane >
            <el-tab-pane label="代理商保养" name="1" v-if="isShowAgent" >
                <el-col :span="6" >
                    <el-form-item label="保养负责人:" >
                        <el-tag class="tagClass" type="success" >
                                {{formData.maintainChargePersonName}}
                        </el-tag >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="联系电话:" >
                      <span v-html="formData.maintainChargePersonPhone" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="保养时间:" >
                      <span >{{formData.maintainDateActual|filterDateString}}</span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="计划时间:" >
                      <span >{{formData.maintainDatePlan|filterDateString}}</span >
                    </el-form-item >
                </el-col >
                <el-row >
                    <el-col >
                        <el-form-item label="保养人员:" >
                            <el-tag :key="member.name"
                                    v-for="member in maintainMembers" class="tagClass" type="info" >
                                {{member.name}}
                            </el-tag >
                        </el-form-item >
                    </el-col >
                </el-row >
                <el-col :span="22" >
                    <el-form-item label="保养建议:" >
                      <span >{{formData.maintainSuggestion}}</span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="保养结果:" >
                        <div v-if="formData.maintainStatus==0"
                             style="color: #686868" class="status_class" >
                                {{formData.maintainStatus|filterStatus}}
                        </div >
                        <div v-if="formData.maintainStatus==1"
                             style="color: #8b6c0e" class="status_class" >
                                {{formData.maintainStatus|filterStatus}}
                        </div >
                        <div v-if="formData.maintainStatus==2"
                             style="color: #13678b" class="status_class" >
                            {{formData.maintainStatus|filterStatus}}
                        </div >
                        <div v-if="formData.maintainStatus==3"
                             style="color: #198b57" class="status_class" >
                            {{formData.maintainStatus|filterStatus}}
                        </div >
                        <div v-if="formData.maintainStatus==4"
                             style="color: darkred" class="status_class" >
                            {{formData.maintainStatus|filterStatus}}
                        </div >
                    </el-form-item >
                </el-col >
            </el-tab-pane >
            <el-tab-pane label="信胜保养" name="2" v-if="isShowSinsim" >
                <el-col :span="6" >
                    <el-form-item label="保养负责人:" >
                         <el-tag class="tagClass" type="success" >
                                {{formData.maintainChargePersonName}}
                        </el-tag >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="联系电话:" >
                      <span v-html="formData.maintainChargePersonPhone" ></span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="保养时间:" >
                      <span >{{formData.maintainDateActual|filterDateString}}</span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="计划时间:" >
                      <span >{{formData.maintainDatePlan|filterDateString}}</span >
                    </el-form-item >
                </el-col >
                <el-row >
                    <el-col >
                        <el-form-item label="保养人员:" >
                            <el-tag :key="user.name"
                                    v-for="user in maintainMembers" class="tagClass" type="info" >
                                {{user.name}}
                            </el-tag >
                        </el-form-item >
                    </el-col >
                </el-row >
                <el-col :span="22" >
                    <el-form-item label="保养建议:" >
                      <span >{{formData.maintainSuggestion}}</span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="保养结果:" >
                        <div v-if="formData.maintainStatus==0"
                             style="color: #686868" class="status_class" >
                                {{formData.maintainStatus|filterStatus}}
                        </div >
                        <div v-if="formData.maintainStatus==1"
                             style="color: #8b6c0e" class="status_class" >
                                {{formData.maintainStatus|filterStatus}}
                        </div >
                        <div v-if="formData.maintainStatus==2"
                             style="color: #13678b" class="status_class" >
                            {{formData.maintainStatus|filterStatus}}
                        </div >
                        <div v-if="formData.maintainStatus==3"
                             style="color: #198b57" class="status_class" >
                            {{formData.maintainStatus|filterStatus}}
                        </div >
                        <div v-if="formData.maintainStatus==4"
                             style="color: darkred" class="status_class" >
                            {{formData.maintainStatus|filterStatus}}
                        </div >
                    </el-form-item >
                </el-col >
            </el-tab-pane >
            <el-tab-pane label="客户评价" name="3" >
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
                            <div class="control-label" v-if="formData.maintainFeedbackCustomerMark!=''"
                                 style="float: left; margin-left: 10px;font-weight: bold;" >
                                        {{formData.maintainFeedbackCustomerMark}}分
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
                            {{formData.maintainFeedbackCustomerSuggestion}}
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
 import {selectLibList, getMaintainTypeList, getMaintainMembers} from '@/api/maintain_manage';
 import {loadServerScore, getStarMode} from '@/api/commonApi'
 import {resetObject} from '@/utils';
 import store from '@/store';
 var _this;

 export default {
	 name: 'MaintainDetail',
	 props: {
		 machineNameplate: {
			 type: String,
			 default: ''
		 },
		 maintainRecorderInfo: {
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
			 maintainLibList: [],
			 maintainCotentList: [
//				 {
//					 maintainType: 0,
//					 contentList: [{
//						 content: "dfsdf",
//						 isChecked: false,
//					 }
//					 ],
//				 },
			 ],
			 maintainTypeList: [],
			 skillStars: {},
			 statusList: APIConfig.MaintainStatusList,
			 maintainMembers: [],
		 }
	 },
	 filters: {
		 filterStatus(id)
		 {
			 let result = "";
			 for (let i = 0; i < _this.statusList.length; i++) {
				 if (id == _this.statusList[i].value) {
					 result = _this.statusList[i].name;
					 break;
				 }
			 }
			 return result;
		 },
		 filterDateString(strDate)
		 {
             if (isStringEmpty(strDate)) {
                 return "";
             }
			 var resDate = new Date(strDate);
			 return resDate.format("yyyy-MM-dd");
		 },

		 filterMaintainTypeName(id)
		 {
			 let result = '';
			 for (let i = 0; i < _this.maintainTypeList.length; i++) {
				 if (id == _this.maintainTypeList[i].id) {
					 result = _this.maintainTypeList[i].maintainTypeName;
					 break;
				 }
			 }
			 return result;
		 },
	 },
	 computed: {
		 isShowAgent: {//property
			 get: function () {//getter
				 _this.activeTabId = !isStringEmpty(_this.formData.machineAgentName) ? "1" : "2";
				 return !isStringEmpty(_this.formData.machineAgentName);//代理商完成
			 },
		 },
		 isShowSinsim: {
			 get: function () {//getter
				 if (store.getters.user.user.agent > 0) {
					 return false;
				 }
				 else {
					 return isStringEmpty(_this.formData.machineAgentName);//非代理商完成
				 }
			 },
		 },
	 },
	 methods: {
		 onStarLoad(item)
		 {
			 return getStarMode(item.starMode);
		 },
		 showCheckBox(ischeck)
		 {
			 return ischeck == 1 ? 'checkbox_checked' : 'checkbox_unchecked';
		 },
		 loadData()
		 {
			 this.formData = {};
			 if (_this.machineNameplate != null) {
				 this.formData = copyObject(_this.maintainRecorderInfo);
				 //console.log(`formData: \n${JSON.stringify(_this.maintainRecorderInfo)}`);
			 }
			 _this.maintainCotentList = [];
			 try {
				 _this.maintainCotentList = JSON.parse(this.formData.maintainInfo);
				 //console.log(`maintainCotentList: \n${JSON.stringify(_this.maintainCotentList)}`);
			 } catch (e) {
				 console.log(e);
			 }
		 },
		 tabSwitchClick(tab)
		 {
			 console.log("tabSwitchClick:" + tab);
		 },

		 loadMaintainTypeList()
		 {
			 let condition = {
				 page: '',
				 size: '',
			 };
			 getMaintainTypeList(condition).then(response => {
				 if (responseIsOK(response)) {
					 _this.maintainTypeList = response.data.data.list;
				 }
				 else {
					 showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)
				 }
			 })
		 },

		 loadMaintainMembers()
		 {
			 _this.maintainMembers = [];
			 let condition = {
				 page: '',
				 size: '',
				 maintainRecordId: _this.formData.id,
			 };
			 getMaintainMembers(condition).then(response => {
				 if (responseIsOK(response)) {
					 _this.maintainMembers = response.data.data.list;
				 }
				 else {
					 showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)
				 }
			 })
		 },

		 loadMaintainLib()
		 {
			 selectLibList({
				 maintainType: "1",//所有子项
				 maintainLibName: _this.formData.maintainLibName,
				 page: '',
				 size: '',
			 }).then(response=> {
				 if (responseIsOK(response)) {
					 _this.mainTainLibList = response.data.data.list;
					 _this.mainTainLibList.forEach(p=> {
						 let isFound = false;
						 for (let item of _this.maintainCotentList) {
							 if (item.maintainType == p.maintainType) {
								 item.contentList.push({
									 content: p.maintainContent,
									 checkValue: 0,
								 })
								 isFound = true;
							 }
						 }
						 if (!isFound) {
							 let data = {
								 maintainType: p.maintainType,
								 contentList: [],
							 }
							 data.contentList.push({
								 content: p.maintainContent,
								 checkValue: 0,
							 });
							 _this.maintainCotentList.push(data);
						 }
					 })
				 }
				 else {
					 showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)
				 }
			 })
		 },
	 },

	 mounted(){
		 _this.loadMaintainTypeList();
		 _this.loadData();//仅仅第一次show出来时，会调用。之后，父控件会自行调用loadData()
		 if (_this.maintainCotentList.length == 0) {
			 _this.loadMaintainLib();
		 }
		 _this.loadMaintainMembers();
		 this.skillStars = loadServerScore(_this.formData.maintainFeedbackCustomerMark);
//		 this.$on('onShowDetail', function () {//对应父控件调用的方法二
//			 _this.loadData();
//			 console.log('监听成功')
//		 })
	 },
 }
</script >

<style scoped >
.root_div {
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
