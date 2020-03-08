// 接口请求的源码实现
import http from './request/interface'

let baseurl = null;
// 环境判断
if (process.env.NODE_ENV === 'development') { //开发环境
	baseurl = 'http://114.118.7.20:8262';
} else { //生产环境
	baseurl = 'http://114.118.7.20:8262';
}
// api接口
const login = '/v1/login/';
const userInfo = '/v1/org/organization/';

http.config.baseUrl = baseurl;

// 下面这些API方法不需要验证token
let filterApi = []
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
		return http.post(login, data);
	},
	// 用户信息
	getUserInfo: (id) => {
		return http.get(userInfo + `${id}/`);
	},
}


export default api
