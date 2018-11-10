import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: UserRole    will control the page roles (you can set multiple roles)
    UserRole: [
		{
			name: "Unknown",
			value: 0,
		},
		{
			name: "SuperAdmin",
			value: 1,
		},
		{
			name: "Admin",
			value: 2,
		},
		{
			name: "Agent",
			value: 4,
		},
	],

    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
	{path: '/login', component: _import('login/index'), hidden: true},
	{path: '/authredirect', component: _import('login/authredirect'), hidden: true},
	{path: '/404', component: _import('errorPage/404'), hidden: true},
	{path: '/401', component: _import('errorPage/401'), hidden: true},
	{
		path: '',
		component: Layout,
		redirect: 'dashboard',
		children: [{
			path: 'dashboard',
			component: _import('dashboard/index'),
			name: 'dashboard',
			meta: {title: 'dashboard', icon: 'dashboard', noCache: true}
		}]
	},
]

export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({y: 0}),
	routes: constantRouterMap
})

export const asyncRouterMap = [
	{
		path: '/installMachine',
		component: Layout,
		redirect: 'noredirect',
		name: 'install_machine',
		meta: {
			title: 'install_machine',
			icon: 'install'
		},
		children: [
			{
				path: 'assignMachine',
				component: _import('install_machine/assign_machine'),
				name: 'assign_machine',
				meta: {title: 'assign_machine', noCache: true, icon: 'install', roles: ["SuperAdmin", "Admin"]}
			},
			{
				path: 'installHome',
				component: _import('install_machine/install_home'),
				name: 'install_home',
				meta: {title: 'install_home', noCache: true, icon: 'install'}
			},
			// {
			// 	path: 'installDetail',
			// 	component: _import('install_machine/install_detail'),
			// 	name: 'install_detail',
			// 	meta: {title: 'install_detail', noCache: true,}
			// },
			{
				path: 'installItem',
				component: _import('install_machine/install_item'),
				name: 'install_item',
				meta: {title: 'install_item', noCache: true, icon: 'install', roles: ["SuperAdmin", "Admin"]}
			},
		]
	},
	{
		path: '/maintainManage',
		component: Layout,
		redirect: 'redirect',
		name: 'maintain_manage',
		meta: {
			title: 'maintain_manage',
			icon: 'maintain'
		},
		children: [
			{
				path: 'maintainHome',
				component: _import('maintain_manage/maintain_home'),
				name: 'maintain_home',
				meta: {title: 'maintain_home', noCache: true, icon: 'maintain'}
			},
			// {
			// 	path: 'maintainDetail',
			// 	component: _import('maintain_manage/maintain_detail'),
			// 	name: 'maintain_detail',
			// 	meta: {title: 'maintain_detail', noCache: true,}
			// },
			{
				path: 'maintainTypeManage',
				component: _import('maintain_manage/maintain_type_manage'),
				name: 'maintain_type_manage',
				meta: {title: 'maintain_type_manage', noCache: true, icon: 'maintain', roles: ["SuperAdmin", "Admin"]}
			},
			{
				path: 'maintainItem',
				component: _import('maintain_manage/maintain_item'),
				name: 'maintain_item',
				meta: {title: 'maintain_item', noCache: true, icon: 'maintain', roles: ["SuperAdmin", "Admin"]}
			},
		]
	},
	{
		path: '/repairManage',
		component: Layout,
		redirect: 'noredirect',
		name: 'repair_manage',
		meta: {
			title: 'repair_manage',
			icon: 'repair'
		},
		children: [
			{
				path: 'repairHome',
				component: _import('repair_manage/repair_home'),
				name: 'repair_home',
				meta: {title: 'repair_home', noCache: true, icon: 'repair'}
			},
			{
				path: 'repairIssuePosition',
				component: _import('repair_manage/repair_issue_position'),
				name: 'repair_issue_position',
				meta: {title: 'repair_issue_position', noCache: true, icon: 'repair', roles: ["SuperAdmin", "Admin"]}
			},
		]
	},
	{
		path: '/machineManage',
		component: Layout,
		redirect: 'noredirect',
		name: 'machine_manage',
		meta: {
			icon: 'sewingMachine',
			roles: ["SuperAdmin", "Admin"]
		},
		children: [
			{
				path: 'machineHome',
				component: _import('machine_manage/machine_home'),
				name: 'machine_home',
				meta: {
					title: 'machine_home',
					noCache: true,
					icon: 'sewingMachine',
					roles: ["SuperAdmin", "Admin"]
				}
			}
		]
	},
	{
		path: '/partsManage',
		component: Layout,
		redirect: 'noredirect',
		name: 'parts_manage',
		meta: {roles: ["SuperAdmin", "Admin"]},
		children: [
			{
				path: 'partsHome',
				component: _import('system_manage/parts_manage'),
				name: 'parts_manage',
				meta: {title: 'parts_manage', noCache: true, icon: 'parts', roles: ["SuperAdmin", "Admin"]}
			}
		]
	},
	{
		path: '/staffManage',
		component: Layout,
		redirect: 'noredirect',
		name: 'staff_manage',
		meta: {},
		children: [
			{
				path: 'staffHome',
				component: _import('system_manage/staff_manage'),
				name: 'staff_manage',
				meta: {title: 'staff_manage', noCache: true, icon: 'people'}
			}
		]
	},
	{
		path: '/clientManage',
		component: Layout,
		redirect: 'noredirect',
		name: 'client_manage',
		meta: {},
		children: [
			{
				path: 'clientHome',
				component: _import('system_manage/client_manage'),
				name: 'client_manage',
				meta: {title: 'client_manage', noCache: true, icon: 'peoples'}
			}
		]
	},
	{
		path: '/agentManage',
		component: Layout,
		redirect: 'noredirect',
		name: 'agent_manage',
		meta: {roles: ["SuperAdmin", "Admin"]},
		children: [
			{
				path: 'agentHome',
				component: _import('system_manage/agent_manage'),
				name: 'agent_manage',
				meta: {title: 'agent_manage', noCache: true, icon: 'agent', roles: ["SuperAdmin", "Admin"]}
			}
		]
	},
	{
		path: '/repositoryManage',
		component: Layout,
		redirect: 'noredirect',
		name: 'repository_manage',
		meta: {
			title: 'repository_manage',
			icon: 'table'
		},
		children: [
			{
				path: 'repositoryHome',
				component: _import('repository_manage/repository_home'),
				name: 'repository_home',
				meta: {title: 'repository_home', noCache: true, icon: 'table'}
			},
		]
	},
	{path: '*', redirect: '/404', hidden: true}
]
