import Vue from 'vue'
import Router from 'vue-router'
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
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
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
			icon: 'bug'
		},
		children: [
			{
				path: 'installHome',
				component: _import('install_machine/install_home'),
				name: 'install_home',
				meta: {title: 'install_home', noCache: true,}
			},
			{
				path: 'installDetail',
				component: _import('install_machine/install_detail'),
				name: 'install_detail',
				meta: {title: 'install_detail', noCache: true,}
			},
			{
				path: 'assignMachine',
				component: _import('install_machine/assign_machine'),
				name: 'assign_machine',
				meta: {title: 'assign_machine', noCache: true,}
			},
			{
				path: 'installItem',
				component: _import('install_machine/install_item'),
				name: 'install_item',
				meta: {title: 'install_item', noCache: true,}
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
			icon: 'form'
		},
		children: [
			{
				path: 'repairHome',
				component: _import('repair_manage/repair_home'),
				name: 'repair_home',
				meta: {title: 'repair_home', noCache: true,}
			},
			{
				path: 'repairDetail',
				component: _import('repair_manage/repair_detail'),
				name: 'repair_detail',
				meta: {title: 'repair_detail', noCache: true,}
			},
		]
	},
	{
		path: '/maintainManage',
		component: Layout,
		redirect: 'noredirect',
		name: 'maintain_manage',
		meta: {
			title: 'maintain_manage',
			icon: 'component'
		},
		children: [
			{
				path: 'maintainHome',
				component: _import('maintain_manage/maintain_home'),
				name: 'maintain_home',
				meta: {title: 'maintain_home', noCache: true,}
			},
			{
				path: 'maintainDetail',
				component: _import('maintain_manage/maintain_detail'),
				name: 'maintain_detail',
				meta: {title: 'maintain_detail', noCache: true,}
			},
			{
				path: 'maintainItem',
				component: _import('maintain_manage/maintain_item'),
				name: 'maintain_item',
				meta: {title: 'maintain_item', noCache: true,}
			},
		]
	},
	{
		path: '/systemManage',
		component: Layout,
		redirect: 'noredirect',
		name: 'system_manage',
		meta: {
			title: 'system_manage',
			icon: 'peoples'
		},
		children: [
			{
				path: 'staffManage',
				component: _import('system_manage/staff_manage'),
				name: 'staff_manage',
				meta: {title: 'staff_manage', noCache: true,}
			},
			{
				path: 'clientManage',
				component: _import('system_manage/client_manage'),
				name: 'client_manage',
				meta: {title: 'client_manage', noCache: true,}
			},
			{
				path: 'agentManage',
				component: _import('system_manage/agent_manage'),
				name: 'agent_manage',
				meta: {title: 'agent_manage', noCache: true,}
			},
			{
				path: 'partsManage',
				component: _import('system_manage/parts_manage'),
				name: 'parts_manage',
				meta: {title: 'parts_manage', noCache: true,}
			},
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
				meta: {title: 'repository_home', noCache: true,}
			},
			{
				path: 'knowledgeDetail',
				component: _import('repository_manage/knowledge_detail'),
				name: 'knowledge_detail',
				meta: {title: 'knowledge_detail', noCache: true,}
			},
			{
				path: 'experienceDetail',
				component: _import('repository_manage/experience_detail'),
				name: 'experience_detail',
				meta: {title: 'experience_detail', noCache: true,}
			},
			{
				path: 'repositoryShare',
				component: _import('repository_manage/repository_share'),
				name: 'repository_share',
				meta: {title: 'repository_share', noCache: true,}
			},
		]
	},
	{path: '*', redirect: '/404', hidden: true}
]