import http from './request/interface'

let baseurl = null;

if (process.env.NODE_ENV === 'development') { //开发环境
	baseurl = 'http://114.118.7.20:8262';
} else { //生产环境
	baseurl = 'http://114.118.7.20:8262';
}

http.config.baseUrl = baseurl;

// 下面这些API方法不需要验证token
let filterApi = ['/v1/login/']
//设置请求前拦截器
http.interceptor.request = (config) => {
	// 过滤掉不需要验证的token的路由api
	let url = config.url;
	let exist = filterApi.every(n => {
		let value = url.indexOf(n);
		if (value < 0) {
			return true
		}
		return false;
	})
	if (exist) {
		//添加通用参数
		config.header = {
			'Authorization': 'Token ' + uni.getStorageSync('token')
		}
	}
}
//设置请求结束后拦截器
http.interceptor.response = (response) => {
	uni.hideLoading();
	//判断返回状态 执行相应操作 0:成功   402:未注册(此状态码在登录页面单独做处理)
	if (response.data.code !== 0) {
		uni.showToast({
			title: response.data.msg,
			icon: 'none'
		});
	}
	return response;
}

const api = {
	// 基础url
	baseurl,
	// 图片访问服务器
	img: '',
	// 图片上传接口
	uploadurl: baseurl + '',
	// 登录
	login: (data) => {
		return http.post('/v1/login/', data);
	},
	// 用户信息
	getUserInfo: (id) => {
		return http.get(`/v1/org/organization/${id}/`);
	},
	// 日常记录
	recordOfDaily: (data) => {
		return http.get(`/v1/record/terminal_record/`, data);
	},
	// 提交订单
	submitOrder: (data) => {
		return http.post('/v1/order/order/', data);
	},
	// 历史订单
	orderList: (data = {}) => {
		return http.get('/v1/order/order/', data);
	},
	// 订单反馈
	orderFeedBack: (id, data) => {
		return http.patch(`/v1/order/order/${id}/`, data);
	},
	// 消息提醒
	notifications: (data) => {
		return http.get('/v1/tongji/wechat/', data);
	},
	// 预约完成记录
	reserveList: (data) => {
		return http.get('/v1/order/work/', data);
	},
	// 意见反馈
	opinion: (data) => {
		return http.post('/v1/opi/opinion/', data);
	},
	// 历史建议
	opinionList: (data) => {
		return http.get('/v1/opi/opinion/', data);
	},
	// 统计
	statistics: (data) => {
		return http.get('/v1/tongji/wechat_tongji/', data);
	}
}


export default api
