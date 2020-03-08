<!--
 * @Description:
 * @Author: hjh
 * @Date: 2019-08-16 11:17:37
 * @LastEditors: hjh
 * @LastEditTime: 2019-08-19 14:51:42
 * @Sign: 扬眉剑出鞘
 -->

### h-upload

用于小程序的图片视频上传

**使用方式：**

在 `script` 中引用组件

```javascript
import hUpload from "@/components/h-upload/h-upload.vue"
export default {
    components: {hUpload}
}
```

在 `template` 中使用组件

```html
<hUpload @schange="schange" @upload="setAttachData"></hUpload>
```

### 更新日志

**1.0.0**

- 初始项目

**1.0.1**
- 上传
