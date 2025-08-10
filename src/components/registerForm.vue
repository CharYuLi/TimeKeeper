<template>
  <!-- 半屏弹窗（蒙层） -->
  <view class="mask" @tap.self="$emit('close')">
    <view class="sheet">
      <view class="title">注册</view>
      <input v-model="realName" placeholder="请输入学生真实姓名" class="input" :adjust-position="false"/>
      <button class="btn" @tap="doRegister">注册并开始</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { registerWX } from '../api/mine'

const realName = ref('')
const emits = defineEmits('close')

async function doRegister() {
  if (!realName.value.trim()) {
    uni.showToast({ title: '姓名不能为空', icon: 'none' })
    return
  }

  uni.showLoading({ title: '注册中...' })

  try {
    // 1. 拿 code（不要用 wx.getOpenId，那是云函数写法）
    const code = await wx.login().code
    if (!code) {
      throw new Error('获取登录状态失败，请重试')
    }

    let URL = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx3bfe2e11e43e4e06&secret=e7ca8ab58b47f9bd81a750a92cd62620&js_code=' + code + '&grant_type=authorization_code'

    let openid = wx.request({
      url: URL,
      method: 'GET',
      success: function (res) {
        openid = res.data
      }
    })

    console.log(openid)

    // 2. 调后端 /customer/register
    const response = await registerWX({
      openid: openid,                      // 后端用 code 换 openid
      userName: realName.value.trim()
    })

    if (!response.success) {
      throw new Error(response.message)
    } else {
      console.log('注册成功')
    }

    // 3. 存 token 并关闭弹窗 → 去首页
    uni.setStorageSync('TOKEN', token)
    uni.hideLoading()
    uni.showToast({ title: '注册成功', icon: 'success' })
    emits('close')
    uni.reLaunch({ url: '/pages/index/index' })
  } catch (e) {
    uni.hideLoading()
    uni.showToast({ title: e.message || '注册失败', icon: 'none' })
  }
}
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.sheet {
  width: 80%;
  max-width: 600rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 25px;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}

.input {
  padding: 24rpx;
  border: 1rpx solid #ddd;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  font-size: 32rpx;
}

.btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
}
</style>