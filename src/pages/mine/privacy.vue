<template>
  <view class="page">
    <view class="header">
      <view class="back" @tap="goBack">‹</view>
      <view class="title">隐私设置</view>
    </view>

    <view v-for="item in list" :key="item.key" class="item" hover-class="hover" @tap="goDetail(item.key)">
      <text>{{ item.title }}</text>
      <text class="arrow">›</text>
    </view>
  </view>
</template>

<script setup>
const list = [
  { key: 'profile-privacy', title: '个人资料可见性' },
  { key: 'data-share', title: '数据共享设置' },
  { key: 'third-party', title: '第三方应用授权' }
]
function goBack() { uni.navigateBack() }
function goDetail(key) { uni.navigateTo({ url: `/pages/privacy/${key}` }) }
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

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #e5e5e5;
  font-size: 32rpx;
}
</style>