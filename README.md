UNI-APP自用模板，可随意修改


<!-- 接口使用方法 login接口为例-->
let form={
	user:1,
	password:111
}
this.$api.login(form).then(res => {
	console.log(res)
});