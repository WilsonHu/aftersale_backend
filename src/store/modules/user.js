import {loginByAccount, logout, getUserInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import  APIConfig from  '@/config/apiConfig'
import Cookies from 'js-cookie'

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_USER: (state, user) => {
            state.user = user
        },
        SET_PATH: (state, path) => {
            state.current_path = path
        }
    },

    actions: {
        // 用户名登录
        loginByAccount({commit}, userInfo) {
            const account = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                    loginByAccount(account, userInfo.password).then(response => {
                        if (response.status == 200) {

                            const data = response.data.data
                            // Cookies.set(APIConfig.cookie_user_token, data)
                            setToken(response.headers.authorization);
                            sessionStorage.setItem('user', data)
                            var token = 'editor'
                            if (data.role.id === 1)//admin
                            {
                                data.roles = ['admin']
                                token='admin'
                            }
                            else {
                                data.roles = ['editor']
                            }
                            //commit('SET_ROLES', data.roles)
                            commit('SET_TOKEN', token)
                            commit('SET_USER', data)
                            commit('SET_NAME', data.name)
                            commit('SET_AVATAR', '/assets/image/user.svg')
                            setToken(data)
                            resolve()
                        }
                        else {
                            reject(response.data.message)
                        }
                    }).catch(error => {
                        reject(error)
                    })
                }
            )
        },

        SetData({commit},data)
        {
            return new Promise((resolve, reject) => {
                sessionStorage.setItem('user', data)
                var token = 'editor'
                if (data.role.id === 1)//admin
                {
                    data.roles = ['admin']
                    token='admin'
                }
                else {
                    data.roles = ['editor']
                }
                //commit('SET_ROLES', data.roles)
                commit('SET_TOKEN', token)
                commit('SET_USER', data)
                commit('SET_NAME', data.name)
                commit('SET_AVATAR', '/assets/image/user.svg')
                setToken(data)
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
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
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

// 登出
        LogOut({commit, state})
        {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
        ,

// 前端 登出
        FedLogOut({commit})
        {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
        ,

// 动态修改权限
        ChangeRoles({commit}, role)
        {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    resolve()
                })
            })
        }
    }
}

export default user
