import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const vue = new Vue();
const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userName: "",
		userInfo: {},
		role: null,
		loadingHide: false,
		selected: [],

	},
	mutations: {
		// 登录
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
		},
		// 退出
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.clearStorageSync();
		},
		loading(state, status) {
			state.loadingHide = status;
		},
		// 设置被选中的
		setSelected(state, data) {
			state.selected = data;
		},
	},
	actions: {
		// 获取用户信息
		async getUserInfo({
			state,
			commit
		}) {
			let res = null
			try {
				if (uni.getStorageSync('token')) {
					let id = uni.getStorageSync('user_id')
					res = await vue.$api.getUserInfo(id)
					if (res.data.code === 0) {
						commit('login', res.data.data)
						setTimeout(function(){
							commit('loading', true);
						},3000);
					}
				} else {
					commit('loading', true);
				}
			} catch (e) {
				commit('loading', true);
				// vue.$showModal('用户信息获取失败')
			}
		},
		// 退出登录
		logoutAction(context) {
			return new Promise((resolve, reject) => {
				context.commit('logout')
				resolve('退出成功');
			})
		},
	}
})

export default store
