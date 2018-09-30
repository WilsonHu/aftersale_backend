import {loginByAccount, logout, getUserInfo, getAgentInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {APIConfig} from  '@/config/apiConfig'

const user = {
	state: {
		user: '',
		token: getToken(),
		roles: [],
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_USER: (state, user) => {
			state.user = user
		},
	},

	actions: {
		// 用户名登录
		loginByAccount({commit}, userInfo) {
			const account = userInfo.username.trim()
			return new Promise((resolve, reject) => {
					loginByAccount(account, userInfo.password).then(response => {
						if (response.status == 200) {
							let userData = response.data;
							userData.Token = response.headers.authorization;
							commit('SET_TOKEN', userData.Token)
							let roles = APIConfig.UserRole[0].name;
							for (let r of APIConfig.UserRole) {
								if (r.value == userData.roleId) {
									roles = r.name;
									break;
								}
							}
							commit('SET_ROLES', roles);

							if (userData.agent != "0") {
								getAgentInfo(userData.agent).then(res=> {
									if (res.status == 200) {
										userData.agentName = res.data.data.name;
									}
									setToken(userData);//set token to cookie
									commit('SET_USER', userData)
									resolve()
								})
							}
							setToken(userData);//set token to cookie
							commit('SET_USER', userData)
							resolve()
						}
						else {
							reject("登录验证失败!")
						}
					}).catch(error => {
						reject(error)
					})
				}
			)
		},

		SetData({commit}, userData)
		{
			return new Promise((resolve, reject) => {
				let roles = APIConfig.UserRole[0].name;
				for (let r of APIConfig.UserRole) {
					if (r.value == userData.roleId) {
						roles = r.name;
						break;
					}
				}
				commit('SET_ROLES', roles);
				setToken(userData);//set token to cookie
				commit('SET_ROLES', roles);
				commit('SET_TOKEN', userData.Token)
				commit('SET_USER', userData)
				resolve()
			})
		},

// 获取用户信息
		GetUserInfo({commit, state})
		{
			return new Promise((resolve, reject) => {
				getUserInfo(state.token).then(response => {
					if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
						reject('error')
					}
					const data = response.data
					commit('SET_ROLES', data.roles)
					commit('SET_NAME', data.name)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		}
		,

// 第三方验证登录
// LoginByThirdparty({ commit, state }, code) {
//   return new Promise((resolve, reject) => {
//     commit('SET_CODE', code)
//     loginByThirdparty(state.status, state.email, state.code).then(response => {
//       commit('SET_TOKEN', response.data.token)
//       setToken(response.data.token)
//       resolve()
//     }).catch(error => {
//       reject(error)
//     })
//   })
// },

// 前端 登出
		LogOut({commit, state})
		{
			return new Promise((resolve, reject) => {
				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				removeToken()
				resolve()
				// logout(state.token).then(() => {
				// 	commit('SET_TOKEN', '')
				// 	commit('SET_ROLES', [])
				// 	removeToken()
				// 	resolve()
				// }).catch(error => {
				// 	reject(error)
				// })
			})
		}
		,

// 动态修改权限
		ChangeRoles({commit}, role)
		{
			return new Promise(resolve => {
				getUserInfo(role).then(response => {
					const data = response.data
					commit('SET_ROLES', data.roles)
					commit('SET_NAME', data.name)
					resolve()
				})
			})
		}
	}
}

export default user
