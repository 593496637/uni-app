<!--
 * @Description: 图片
 * @Author: hjh
 * @Date: 2019-08-19 14:49:33
 * @LastEditors: hjh
 * @LastEditTime: 2019-08-20 12:20:36
 * @Sign: 扬眉剑出鞘
 -->
<template>
	<view>
		<view class="photo">
			<image v-for="(item,index) in imgArr" @click="preImage(item.url,imgArr)" :key="index" :src="item.url" mode="scaleToFill">
				<view class="del" @tap.stop="delImage(index)"></view>
			</image>
			<video v-for="(item,index) in videoArr"  @fullscreenchange="screenchange" :key="index" :src="item.url" controls>
				<cover-view class="del" @tap.stop="delVideo(index)"></cover-view>
			</video>
			<image v-if="imgArr.length<imgLimit" @tap="chooseImage" src="https://mmcfile.hiroop.com/miniprogram/takePhoto.png" />
			<image v-if="videoArr.length<videoLimit" @tap="chooseVedio" src="https://mmcfile.hiroop.com/miniprogram/takeCamera.png" />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgLimit: {
				type: Number,
				default: 3
			},
			videoLimit: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				imgArr: [],//图片数组
				videoArr: [],//视频数组
			};
		},
		methods: {
			chooseImage() {
				let that = this;
				uni.chooseImage({
					count: that.imgLimit, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						uni.showLoading({
							title: 'Loading...',
							mask: true
						})
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							

							uni.uploadFile({
								url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
								filePath: res.tempFilePaths[i],
								name: 'file',
								formData: {
									'user': 'test'
								},
								success: (uploadFileRes) => {
									console.log(uploadFileRes.data);
									//将返回的数据存入img,并通知外界
									// 默认返回的有路径，字段名 url
									that.imgArr.push(uploadFileRes.data);
									that.sendData()
								}
							});
						}
						
						uni.hideLoading()
					}
				})
			},
			preImage(url, urls) {
				let _urls = urls.map(ele => {
					return ele.url;
				})
				console.log(url, urls);
				uni.previewImage({
					current: url,
					urls: _urls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			chooseVedio() {
				let that = this;
				uni.chooseVideo({
					count: this.VideoLimit, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						uni.showLoading({
							title: 'Loading...',
							mask: true
						})
						// 上传视频
						uni.uploadFile({
							url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
							filePath: res.tempFilePath,
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
									//将返回的数据存入img,并通知外界
									// 默认返回的有路径，字段名 url
									that.videoArr.push(uploadFileRes.data);
									that.sendData()
							uni.hideLoading()
							}
						});
						
						
					}
				})
			},
			delImage(ind) {
				this.imgArr.splice(ind, 1)
				this.sendData()
			},
			delVideo(ind) {
				this.videoArr.splice(ind, 1)
				this.sendData()
			},
			sendData() {
				let _data = [];
				// 将数据整合到一个数组中发出去，可以按自己项目要求进行修改
				_data.push(...this.imgArr);
				_data.push(...this.videoArr);
				this.$emit('upload', _data)
			},
			screenchange(e){
				// 监听视频的全屏和退出全屏
				this.$emit('schange', e.detail.fullScreen)
			}
		}
	}
</script>

<style lang="scss">
	.photo {

		image,
		video {
			width: 23%;
			height: 150upx;
			margin: 0 2% 20upx 0;
			position: relative;
		}

		.del {
			position: absolute;
			top: 0;
			right: 0;
			width: 42upx;
			height: 42upx;
			z-index: 99999;
			background-color: rgba(0, 0, 0, 0.7);
			background-image: url(https://mmcfile.hiroop.com/miniprogram/delete.png);
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 26upx 27upx;
		}
	}
</style>
