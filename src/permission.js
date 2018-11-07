import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getToken} from '@/utils/auth' // getToken from cookie

NProgress.configure({showSpinner: false})// NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
	if (roles.contains('Admin')) return true // admin permission passed directly
	if (!permissionRoles) return true
	return route.meta.roles.indexOf(roles) < 0;
}

const whiteList = ['/login', '/authredirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
	NProgress.start() // start progress bar
	if (getToken()) { // determine if there has token
		/* has token*/
		if (to.path === '/login') {
			next({path: '/'})
			NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
		} else {
			if (store.getters.user.user == "") { // 判断当前用户是否已拉取完user_info信息
				try {
					if (store.getters.token.length == 0) {
						store.dispatch('LogOut').then(() => {
							Message.error('No token, please login again')
							next({path: '/login'})
						})
					}
					else if (store.getters.token.length > 0) {
						let data = JSON.parse(store.getters.user.token);
						store.dispatch("SetData", data)
							.then(() => {
								let userRole = store.getters.user.roles; // note: roles must be a array! such as: ['editor','develop']
								store.dispatch('GenerateRoutes', userRole).then(() => { // 根据roles权限生成可访问的路由表
									router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
									// next({...to, replace: true}) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
									next(to.path);
								})
							})
							.catch((e) => {
								store.dispatch('LogOut').then(() => {
									Message.error('No token, please login again')
									next({path: '/login'})
								})
							});
					}
				} catch (ex) {
					store.dispatch('LogOut').then(() => {
						Message.error('No token, please login again')
						next({path: '/login'})
					})
				}
			} else {
				if (store.getters.addRouters.length == 0) {
					let userRole = store.getters.user.roles; // note: roles must be a array! such as: ['editor','develop']
					store.dispatch('GenerateRoutes', userRole).then(() => { // 根据roles权限生成可访问的路由表
						router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
					})
				}
			}
		}
	} else {
		/* has no token*/
		if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next()
		} else {
			next('/login') // 否则全部重定向到登录页
			NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
		}
	}
	next();
})

router.afterEach(() => {
	NProgress.done() // finish progress bar
})
