<template>
  <view class="page">
    <view class="header">
      <view class="back" @tap="goBack">‹</view>
      <view class="title">个人资料</view>
    </view>

    <view class="avatar-block">
      <view class="avatar">👦</view>
      <text class="tip">点击头像可更换</text>
      <input v-model="nickName" class="input" placeholder="请输入昵称" />
      <input v-model="phone" class="input" placeholder="手机号" />
    </view>

    <button class="save-btn" @tap="save">保存</button>
  </view>
</template>

<script setup>
const nickName = ref('小明同学')
const phone = ref('138****8888')
function goBack() { uni.navigateBack() }
function save() { uni.showToast({ title: '已保存' }) }
</script>

<style scoped>
.page {
  max-width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  overflow-x: hidden;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 30rpx;
  display: flex;
  align-items: center;
}

.back {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.title {
  flex: 1;
  font-size: 36rpx;
  text-align: center;
  font-weight: bold;
}

.avatar-block {
  padding: 60rpx;
  text-align: center;
}

.avatar {
  margin: 0 auto 30rpx;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: #667eea;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60rpx;
}

.tip {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.input {
  background: #f8f8f8;
  border: none;
  padding: 20rpx;
  width: 100%;
  margin-bottom: 30rpx;
  font-size: 32rpx;
  border-bottom: 1rpx solid #e5e5e5;
}

.save-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  width: 85%;
  padding: 30rpx;
  border-radius: 50rpx;
  margin: 40rpx auto;
}
</style>