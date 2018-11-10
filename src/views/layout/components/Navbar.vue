<template >
  <el-menu class="navbar" mode="horizontal" >
    <el-row >
        <el-col :span="19" >
            <hamburger class="hamburger-container" :toggleClick="toggleSideBar"
                       :isActive="sidebar.opened" ></hamburger >
            <breadcrumb class="breadcrumb-container" ></breadcrumb >
        </el-col >
        <!--<el-col :span="3" >-->
            <!--<div style="font-size: 20px;color: green;margin-top: 5px; font-weight: bold;text-align: right;float: right" >{{roleName}}</div >-->
        <!--</el-col >-->
        <el-col :span="5" >
          <div class="right-menu" >
              <el-dropdown class="avatar-container right-menu-item" trigger="click" >
                  <div class="avatar-wrapper" >
                      <div style="font-size: 20px;font-weight: bold;color: orange" >{{userName}}</div >
                      <i class="el-icon-caret-bottom" ></i >
                  </div >
                  <el-dropdown-menu slot="dropdown" >
                    <router-link to="/" >
                      <el-dropdown-item >
                        {{$t('navbar.dashboard')}}
                      </el-dropdown-item >
                    </router-link >
                    <el-dropdown-item divided >
                      <span @click="logout" style="display:block;" >{{$t('navbar.logOut')}}</span >
                    </el-dropdown-item >
                  </el-dropdown-menu >
              </el-dropdown >
              <div style="font-size: 28px;color: green;margin-top: 3px;;margin-right: 5px; font-weight: bold;float: left" >{{roleName}}</div >
          </div >
        </el-col >

      </el-row >
  </el-menu >
</template >

<script >
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import {APIConfig} from  '@/config/apiConfig'

export default {
	components: {
		Breadcrumb,
		Hamburger,
		ErrorLog,
		Screenfull,
		LangSelect,
		ThemePicker
	},
	computed: {
		...mapGetters([
			'sidebar',
			'name',
		])
	},
	data() {
		return {
			userName: this.$store.getters.user.user.name,
			roleName: this.getRole(),
		}
	},
	methods: {
		getRole()
		{
			let roles = APIConfig.UserRole[0].title;
			for (let r of APIConfig.UserRole) {
				if (r.value == this.$store.getters.user.user.roleId) {
					roles = r.title;
					break;
				}
			}
			return roles
		},
		toggleSideBar() {
			this.$store.dispatch('toggleSideBar')
		},
		logout() {
			this.$store.dispatch('LogOut').then(() => {
				location.reload()// In order to re-instantiate the vue-router object to avoid bugs
			})
		}
	}
}
</script >

<style rel="stylesheet/scss" lang="scss" scoped >
.navbar {
	height: 50px;
	line-height: 50px;
	border-radius: 0px !important;
	.hamburger-container {
		line-height: 58px;
		height: 50px;
		float: left;
		padding: 0 10px;
	}
	.breadcrumb-container {
		float: left;
	}
	.errLog-container {
		display: inline-block;
		vertical-align: top;
	}
	.right-menu {
		float: right;
		height: 100%;
		&:focus {
			outline: none;
		}
		.right-menu-item {
			display: inline-block;
			margin: 0 8px;
		}
		.screenfull {
			height: 20px;
		}
		.international {
			vertical-align: top;
		}
		.theme-switch {
			vertical-align: 15px;
		}
		.avatar-container {
			height: 50px;
			margin-right: 30px;
			.avatar-wrapper {
				cursor: pointer;
				margin-top: 5px;
				position: relative;
				.user-avatar {
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}
				.el-icon-caret-bottom {
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
</style >
