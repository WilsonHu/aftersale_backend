<template >
  <div class="root_div" >
	  <el-tabs type="border-card" v-model="activeTabId" @tab-click="tabSwitchClick" >
		  <el-tab-pane label="经验库" name="0" >
			  <ExperienceLib ref="experienceLib" ></ExperienceLib >
		  </el-tab-pane >
		  <el-tab-pane label="经验库" name="1" >
			  <KnowledgeLib ref="knowledgeLib"></KnowledgeLib >
		  </el-tab-pane >
	  </el-tabs >
  </div >
</template >

<script >
	import {APIConfig} from '@/config/apiConfig';
	import ExperienceLib from '@/views/repository_manage/experience_lib';
	import KnowledgeLib from '@/views/repository_manage/knowledge_lib';

	var _this;
	export default {
		name: 'repository_home',
		components: {
			ExperienceLib,
			KnowledgeLib,
		},
		data() {
			_this = this;
			return {
				activeTabId: 0,
			}
		},
		methods: {
			tabSwitchClick(tab)
			{

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
