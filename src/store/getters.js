const getters = {
	sidebar: state => state.app.sidebar,
	language: state => state.app.language,
	visitedViews: state => state.tagsView.visitedViews,
	cachedViews: state => state.tagsView.cachedViews,
	token: state => state.user.token,
	name: state => state.user.name,
	introduction: state => state.user.introduction,
	roles: state => state.user.roles,
	setting: state => state.user.setting,
	permission_routers: state => state.permission.routers,
	addRouters: state => state.permission.addRouters,
	errorLogs: state => state.errorLog.logs,
	user: state=>state.user,
	commonData: state=>state.commonData,
}
export default getters
