<template >
  <div class="dashboard-container" >
    <component :is="currentRole" ></component >
  </div >
</template >

<script >
import {mapGetters} from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
	name: 'dashboard',
	components: {adminDashboard, editorDashboard},
	data() {
		return {
			currentRole: 'adminDashboard'//default
		}
	},
	computed: {
		...mapGetters([
			'roles'
		])
	},
	created() {
		if (!this.roles.includes('Admin')) {
			this.currentRole = 'editorDashboard'
		}
	}
}
</script >
