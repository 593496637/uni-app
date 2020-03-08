import api from './common/api.js' //api接口
exports.install = function(Vue, options) {
	// api
	Vue.prototype.$api = {
		...api
	}
	
	// 静态图片
	Vue.prototype.$img = (pic) => {
		return api.img + pic;
	}

	// showToast
	Vue.prototype.$showToast = (title, mask = false, duration = 1500, icon = 'none') => {
		if (Boolean(title) === false) {
			return;
		}
		uni.showToast({
			title,
			duration,
			mask,
			icon
		});
	}

	// 开启loading
	Vue.prototype.$showLoading = (content = '加载中') => {
		uni.showLoading({
			title: `${content}`,
			mask: true
		})
	};
	// modal
	Vue.prototype.$showModal = (content = '成功', callback = function() {}, title = '') => {
		uni.showModal({
			title: `${title}`,
			content: `${content}`,
			showCancel: false,
			cancelText: '',
			confirmText: '确定',
			success: res => {
				callback();
			}
		});
	}
};
