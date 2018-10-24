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
                        <span class="MainInfo" v-html="formData.machineCustomerName" ></span >
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
            </div >
        </div >

         <div class="panel panel-primary" >
            <div class="panel-heading" style="text-align: left" >
                <h3 class="panel-title" >机器信息</h3 >
            </div >
            <div class="panel-body" style="margin-left: -20px" >
                <el-col :span="6" >
                    <el-form-item label="机器编号:" >
                        <span class="MainInfo" v-html="formData.machineNameplate" ></span >
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

                <el-col :span="6" >
                    <el-form-item label="出厂日期:" >
                      <span >{{formData.facoryDate|filterDateString}}</span >
                    </el-form-item >
                </el-col >
            </div >
         </div >

         <div class="panel panel-primary" >
            <div class="panel-heading" style="text-align: left" >
                <h3 class="panel-title" >维修信息</h3 >
            </div >
            <div class="panel-body" style="margin-left: -20px" >
                <el-row >
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
                </el-row >

                <el-col :span="6" >
                    <el-form-item label="维修结果:" >
                        <div v-if="formData.status==0"
                             style="color: #686868" >
                                {{formData.status|filterStatus}}
                            </div >
                            <div v-if="formData.status==1"
                                 style="color: #8b6c0e" >
                                {{formData.status|filterStatus}}
                            </div >
                            <div v-if="formData.status==2"
                                 style="color: #13678b" >
                                {{formData.status|filterStatus}}
                            </div >
                            <div v-if="formData.status==3"
                                 style="color: red" >
                                {{formData.status|filterStatus}}
                            </div >
                            <div v-if="formData.status==4"
                                 style="color: orange" >
                                {{formData.status|filterStatus}}
                            </div >
                            <div v-if="formData.status==5"
                                 style="color: indianred" >
                                {{formData.status|filterStatus}}
                            </div >
                            <div v-if="formData.status==6"
                                 style="color: #13ce66" >
                                {{formData.status|filterStatus}}
                            </div >
                            <div v-if="formData.status==7"
                                 style="color: #198b57" >
                                {{formData.status|filterStatus}}
                            </div >
                    </el-form-item >
                </el-col >
            </div >
         </div >

         <div class="panel panel-primary" >
            <div class="panel-heading" style="text-align: left" >
                <h3 class="panel-title" >报修内容</h3 >
            </div >
            <div class="panel-body" style="margin-left: -20px" >

                <el-col :span="6" >
                    <el-form-item label="报修时间:" >
                      <span >{{formData.createTime|filterDateString}}</span >
                    </el-form-item >
                </el-col >
                <el-col :span="22" >
                        <el-form-item label="报修问题:" >
                             <span style="font-size: 20px;font-weight: bold" >{{formData.repairRequestTitle}}</span >
                        </el-form-item >
                </el-col >
                <el-col :span="22" >
                        <el-form-item label="文字描述:" >
                          <!--<el-input v-model="formData.repairRequestContent"-->
                          <!--disabled-->
                          <!--type="textarea"-->
                          <!--:rows="6" clearable style="font-size: 18px" ></el-input >-->
	                        <span v-html="formData.repairRequestContent" ></span >
                        </el-form-item >
                </el-col >
                <el-col :span="22" >
                        <el-form-item label="图片描述:" >
                             <!--<div v-for="itemPicture in splitToArray(formData.repairRequestPictures)"-->
                                  <!--style="float:inherit;align-items: center; align-content: center;alignment: center;horiz-align: center;" >-->
                                <!--<div style="float: left; border: solid;  border-width: 2px;border-color: #d9edf7;margin: 10px" >-->
                                   <!--<el-tooltip placement="top" :content="itemPicture|converterUrl" >-->
                                         <!--<img :src="itemPicture|converterUrl" class="img-responsive" alt="Chania"-->
                                              <!--style="width:300px;height: 200px; margin: 3px;" >-->
	                                   <!--</img>-->
                                    <!--</el-tooltip >-->
                                <!--</div >-->
                             <!--</div >-->
                             <div>
                                <a v-for="itemPicture in splitToArray(formData.repairRequestPictures)"
                                   data-magnify="gallery"
                                   data-caption="图片预览" :href="itemPicture|converterUrl" >
                                   <img :src="itemPicture|converterUrl"
                                        :alt="itemPicture|converterUrl"
                                        style="width:250px;height: 300px; margin: 3px;" >
                                    </img>

                                </a >
                            </div >
                        </el-form-item >
                </el-col >
                <el-col :span="22" >
                        <el-form-item label="声音描述:" >
                             <audio id="audioId" autoplay="true" controls="controls"
                                    style="margin-left: -6px;visibility: hidden" >
                                    <source :src="voiceInfo.voiceUrl" :type="voiceInfo.voiceType" >
	                             <!--<source src="song.mp3" type="audio/mp3" />-->
                             </audio >
                            <el-col :span="2" v-for="(item,index) in splitToArray(formData.repairRequestVoice)" >
                                        <span :style="{'border-color': onSelectVoice(index)}"
                                              @click="onPlayVoice(item,index)" >
                                             <el-tooltip placement="top" :content="item|converterUrl" >
                                                 <svg-icon :icon-class="onSelectIcon(index)"
                                                           @click="onPlayVoice(item,index)"
                                                           data-toggle="tooltip" data-placement="top"
                                                           :title="item|converterUrl"
                                                           style="width:100px;height: 100px; margin: 3px; cursor:hand; "
                                                 />
                                             </el-tooltip >
                                        </span >
                            </el-col >
                        </el-form-item >
                </el-col >

            </div >
         </div >

         <div class="panel panel-primary" >
            <div class="panel-heading" style="text-align: left" >
                <h3 class="panel-title" >维修结果</h3 >
            </div >
            <div class="panel-body" >
                <el-tabs type="border-card" v-model="activeTabId" @tab-click="tabSwitchClick" >
                    <el-tab-pane label="代理商维修" name="0" v-if="isShowAgent" >
                        <el-col :span="6" >
                            <el-form-item label="维修负责人:" >
                                <el-tag class="tagClass" type="success" >
                                    {{formData.repairChargePersonName}}
                                </el-tag >
                            </el-form-item >
                        </el-col >
                        <el-col :span="6" >
                            <el-form-item label="联系电话:" >
                              <span v-html="formData.repairChargePersonPhone" ></span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="6" >
                            <el-form-item label="开始时间:" >
                              <span >{{formData.repairStartTime|filterDateString}}</span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="6" >
                            <el-form-item label="完成时间:" >
                              <span >{{formData.repairEndTime|filterDateString}}</span >
                            </el-form-item >
                        </el-col >
                        <el-row >
                            <el-col >
                                <el-form-item label="维修人员:" >
                                    <el-tag class="tagClass" type="info"
                                            v-for="member in repairMembers"
                                            :key="member.name" >
                                        {{member.name}}
                                    </el-tag >
                                </el-form-item >
                            </el-col >
                        </el-row >
                        <el-col :span="22" >
                            <el-form-item label="维修员描述:" >
                              <span >{{formData.repairActualIssueDescription}}</span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="22" >
                            <el-form-item label="解决方案:" >
                              <span >{{formData.repairActualMethod}}</span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="22" >
                            <el-form-item label="故障部位:" >
                                <el-tag class="tagClass" type="success"
                                        v-for="item in splitToArray(formData.issuePositionList)"
                                        :key="item" >
                                        {{item|filterIssuePosition}}
	                            </el-tag >
                            </el-form-item >
                        </el-col >

                    </el-tab-pane >
                    <el-tab-pane label="信胜维修" name="1" v-if="isShowSinsim" >
                        <el-col :span="6" >
                            <el-form-item label="维修负责人:" >
                                <el-tag class="tagClass" type="success" >
                                    {{formData.repairChargePersonName}}
                                </el-tag >
                            </el-form-item >
                        </el-col >
                        <el-col :span="6" >
                            <el-form-item label="联系电话:" >
                              <span v-html="formData.repairChargePersonPhone" ></span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="6" >
                            <el-form-item label="开始时间:" >
                              <span >{{formData.repairStartTime|filterDateString}}</span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="6" >
                            <el-form-item label="完成时间:" >
                              <span >{{formData.repairEndTime|filterDateString}}</span >
                            </el-form-item >
                        </el-col >
                        <el-row >
                            <el-col >
                                <el-form-item label="维修人员:" >
                                     <el-tag class="tagClass" type="info"
                                             v-for="user in repairMembers"
                                             :key="user.name" >
                                        {{user.name}}
                                     </el-tag >
                                </el-form-item >
                            </el-col >
                        </el-row >
                        <el-col :span="22" >
                            <el-form-item label="维修员描述:" >
                              <span >{{formData.repairActualIssueDescription}}</span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="22" >
                            <el-form-item label="解决方案:" >
                              <span >{{formData.repairActualMethod}}</span >
                            </el-form-item >
                        </el-col >
                        <el-col :span="22" >
                            <el-form-item label="故障部位:" >
                                <el-tag class="tagClass" type="success"
                                        v-for="item in splitToArray(formData.issuePositionList)"
                                        :key="item" >
                                        {{item|filterIssuePosition}}
	                            </el-tag >
                            </el-form-item >
                        </el-col >
                    </el-tab-pane >
                    <el-tab-pane label="客户评价" name="2" >
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
                                    <div class="control-label" v-if="formData.repairFeedbackCustomerMark!=''"
                                         style="float: left; margin-left: 10px;font-weight: bold;" >
                                        {{formData.repairFeedbackCustomerMark}}分
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
                                    {{formData.repairFeedbackCustomerSuggestion}}
                                </div >
                            </el-form-item >
                        </el-col >
                    </el-tab-pane >
                </el-tabs >
            </div >
         </div >

         <div class="panel panel-primary" >
            <div class="panel-heading" style="text-align: left" >
                <h3 class="panel-title" >配件信息</h3 >
            </div >
            <div class="panel-body" style="margin-left: -20px" >

                <el-col :span="6" >
                    <el-form-item label="单号:" >
                      <span >{{formData.sendbackTrackingNumber}}</span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                    <el-form-item label="配件名称:" >
                        <span style="font-size: 20px;font-weight: bold" >
                            {{formData.partsName}}
                        </span >
                    </el-form-item >
                </el-col >
                <el-col :span="6" >
                        <el-form-item label="供应商:" >
	                        <span >{{formData.supplier}}</span >
                        </el-form-item >
                </el-col >
                <el-col :span="6" >
                        <el-form-item label="回寄日期:" >
	                        <span >{{formData.sendbackDate|filterDateString}}</span >
                        </el-form-item >
                </el-col >

                <el-col :span="6" >
                        <el-form-item label="确认日期:" >
	                        <span >{{(formData.sendbackConfirmedTime)|filterDateString}}</span >
                        </el-form-item >
                </el-col >
                <el-col :span="6" >
                        <el-form-item label="确认人:" >
	                        <span >{{formData.sendbackConfirmedPersonName}}</span >
                        </el-form-item >
                </el-col >
                <el-col :span="6" >
                        <el-form-item label="状态:" >
                            <!--<div v-if="formData.partsStatus==0"-->
                            <!--style="color: #686868" >-->
                            <!--{{formData.partsStatus|filterPartStatus}}-->
                            <!--</div >-->
                            <div v-if="formData.partsStatus==1"
                                 style="color: red" >
                                {{formData.partsStatus|filterPartStatus}}
                            </div >
                            <div v-if="formData.partsStatus==2"
                                 style="color: #13678b" >
                                {{formData.partsStatus|filterPartStatus}}
                            </div >
                            <div v-if="formData.partsStatus==3"
                                 style="color: #198b57" >
                                {{formData.partsStatus|filterPartStatus}}
                            </div >
                            <div v-if="formData.partsStatus==4"
                                 style="color: lightskyblue" >
                                {{formData.partsStatus|filterPartStatus}}
                            </div >
                        </el-form-item >
                </el-col >
                <el-col :span="22" >
                        <el-form-item label="配件图片:" >
                            <div >
                                <a v-for="itemPicture in splitToArray(formData.sendbackTrackingPictrue)"
                                   data-magnify="gallery"
                                   data-caption="图片预览" :href="itemPicture|converterUrl" >
                                   <img :src="itemPicture|converterUrl"
                                        :alt="itemPicture|converterUrl"
                                        style="width:250px;height: 300px; margin: 3px;" >
                                    </img>

                                </a >
                            </div >
                             <!--<div v-for="itemPicture in splitToArray(formData.sendbackTrackingPictrue)"-->
                                  <!--style="float:inherit;align-items: center; align-content: center;alignment: center;horiz-align: center;" >-->
                                <!--<div style="float: left; border: solid;  border-width: 2px;border-color: #d9edf7;margin: 10px" >-->
                                    <!--<el-tooltip placement="top" :content="itemPicture|converterUrl" >-->
                                         <!--<img :src="itemPicture|converterUrl" class="img-responsive" alt="Chania"-->
                                              <!--style="width:300px;height: 200px; margin: 3px;" >-->
	                                    <!--</img>-->
                                    <!--</el-tooltip >-->
                                <!--</div >-->
                            <!--</div >-->
                        </el-form-item >
                </el-col >


            </div >
         </div >
    </el-form >
  </div >
</template >

<script >
 import {APIConfig} from '@/config/apiConfig'
 import {resetObject} from '@/utils'
 import {
		 getRepairMembers,
		 getIssuePositionList
 } from '@/api/repair_manage';
 import {loadServerScore, getStarMode} from '@/api/commonApi'
 import store from '@/store';

 var _this;
 export default {
	 name: 'RepairPartsDetail',
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
			 statusList: APIConfig.RepairStatusList,
			 partStatusList: APIConfig.SendBackStatusList,
			 voiceInfo: {
				 voiceIndex: -1,
				 voiceUrl: "",
				 voiceType: "audio/mp3",
			 },
			 skillStars: {},
			 repairMembers: [],
			 issuePositionList: [],
		 }
	 },
	 computed: {
		 isShowAgent: {//property
			 get: function () {//getter
				 let res = false;
				 if (!isStringEmpty(_this.formData.machineAgentName))//机器是代理商
				 {
					 res = _this.formData.forwardInfo == 0 //1-代理商改派过来的，属于sinsim
				 }
				 _this.activeTabId = res ? "0" : "1";
				 return res;
			 },
		 },
		 isShowSinsim: {
			 get: function () {//getter
				 let res = true;
				 if (store.getters.user.user.agent > 0) {
					 res = false;
				 }
				 else {
					 if (!isStringEmpty(_this.formData.machineAgentName))//机器是代理商
					 {
						 res = _this.formData.forwardInfo > 0 //1-代理商改派过来的，属于sinsim
					 }
				 }
				 return res;
			 },
		 },
	 },
	 filters: {
		 filterIssuePosition(id)
		 {
			 let result = "";
			 for (let i = 0; i < _this.issuePositionList.length; i++) {
				 if (id == _this.issuePositionList[i].id) {
					 result = _this.issuePositionList[i].name;
					 break;
				 }
			 }
			 return result;
		 },
		 converterUrl: function (url) {
			 if (isStringEmpty(url)) {
				 return "";
			 }
			 url = url.replace(APIConfig.FilterUrl, "").trim(' ');
			 return APIConfig.WEBURL + url;
		 },
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
			 let result = _this.statusList[0].name;
			 for (let i = 0; i < _this.statusList.length; i++) {
				 if (id == _this.statusList[i].value) {
					 result = _this.statusList[i].name;
					 break;
				 }
			 }
			 return result;
		 },

		 filterPartStatus(id)
		 {
			 let result = "";
			 for (let i = 0; i < _this.partStatusList.length; i++) {
				 if (id == _this.partStatusList[i].value) {
					 result = _this.partStatusList[i].name;
					 break;
				 }
			 }
			 return result;
		 },
	 },
	 methods: {
		 splitToArray(strObj){
			 if (isStringEmpty(strObj)) {
				 return "";
			 }
			 return strObj.split(",");
		 },
		 onStarLoad(item)
		 {
			 return getStarMode(item.starMode);
		 },
		 onSelectIcon(index)
		 {
			 let icon = "voice";
			 if (this.voiceInfo.voiceIndex == index) {
				 icon = "voice_fill";
			 }
			 return icon;
		 },
		 onSelectVoice: function (index) {
			 if (this.voiceInfo.voiceIndex == index) {
				 return "#2b669a";
			 } else {
				 return '#d9edf7';
			 }
		 },

		 onPlayVoice: function (url, index) {
			 var player = document.getElementById("audioId")
			 if (url == null) {
				 return;
			 }
			 url = url.replace(APIConfig.FilterUrl, "").trim(' ');
			 if (player.paused || this.voiceInfo.voiceIndex != index) {
				 this.voiceInfo.voiceUrl = APIConfig.WEBURL + url;
				 this.voiceInfo.voiceIndex = index;
				 this.voiceInfo.voiceType = getAudioType(url);
				 player.load();//play audio
			 }
			 else {
				 player.pause();//stop audio
			 }

		 },
		 loadMembers()
		 {
			 _this.repairMembers = [];
			 let condition = {
				 page: '',
				 size: '',
				 repairRecordId: _this.formData.id,
			 };
			 getRepairMembers(condition).then(response => {
				 if (responseIsOK(response)) {
					 _this.repairMembers = response.data.data.list;
				 }
				 else {
					 showMSG(_this, isStringEmpty(response.data.message) ? "查询数据失败！" : response.data.message)
				 }
			 })
		 },
		 loadData()
		 {
			 getIssuePositionList({}).then(response => {
				 if (responseIsOK(response)) {
					 _this.issuePositionList = response.data.data.list;
				 }
			 })
			 this.formData = {};
			 this.formData = copyObject(_this.repairRecorderInfo);
			 this.skillStars = loadServerScore(_this.formData.repairFeedbackCustomerMark);
			 _this.loadMembers();
//			 console.log(`formData: ${JSON.stringify(this.formData)}`);
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

.MainInfo {
	font-weight: bold;
	color: #2b542c;
}

.tagClass {
	margin-left: 5px;
	width: 200px;
}

span {
	font-size: 18px;
	width: 100%;
	alignment: left;
	text-align: left;
}
</style >
