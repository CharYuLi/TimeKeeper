<template>
  <view class="page">
    <!-- 顶部大图 + 返回 -->
    <view class="hero">
      <image :src="cover" mode="aspectFill" class="hero-img" />
      <view class="hero-overlay">
        <view class="hero-title">{{ detail.title }}</view>
        <view class="hero-sub">{{ detail.subtitle }}</view>
      </view>
    </view>

    <!-- 核心信息 -->
    <view class="content" scroll-y>
      <view class="info-grid">
        <view class="info-item" v-for="(v, k) in infoList" :key="k">
          <view class="info-label">{{ k }}</view>
          <view class="info-value">{{ v }}</view>
        </view>
      </view>

      <!-- 进度 -->
      <view class="progress">
        <view class="progress-label">
          <text>已报名 {{ detail.joined }}/{{ detail.total }}</text>
          <text>剩余 {{ detail.total - detail.joined }}</text>
        </view>
        <view class="progress-bar">
          <view class="progress-fill" :style="{ width: (detail.joined / detail.total) * 100 + '%' }"></view>
        </view>
      </view>

      <!-- 详情 -->
      <view class="desc-title">活动详情</view>
      <view class="desc-text">{{ detail.desc }}</view>
    </view>

    <!-- 底部按钮 -->
    <view class="footer">
      <button class="btn btn-share" hover-class="hover" @tap="share">分享</button>
      <button class="btn btn-primary" hover-class="hover" :disabled="status !== '报名中'" @tap="book">
        {{ status === '已截止' ? '已截止' : '立即预约' }}
      </button>
    </view>

    <!-- 悬浮地图 -->
    <view class="floating-btn" @tap="openMap">📍</view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

/* 模拟数据 */
const detail = ref({
  title: '深业上城会员体验日',
  subtitle: '免费 · 足球青训体验',
  cover: 'https://dummyimage.com/375x240/667eea/fff&text=深业上城会员体验日',
  joined: 24,
  total: 50,
  desc:
    '曼城青训首场深业上城会员专享体验日活动将于7月12日开启。\n' +
    '本次活动针对 U8&U10、U12、U14 多个年龄段，在笔架山体育公园开展，为深业上城会员家庭打造专属足球青训体验。\n' +
    '• 时间：2025年7月12日\n' +
    '• 场地：笔架山体育公园1号足球场\n' +
    '• 参与对象：深业上城会员家庭中，年龄符合6-14岁'
});
const status = ref('已截止'); // 可改为 '报名中'

const infoList = computed(() => ({
  时间: '2025-07-12',
  费用: '免费',
  地点: '笔架山体育公园',
  名额: `${detail.value.total}人`
}));

function goBack() { uni.navigateBack() }
function share() { uni.share({ title: detail.value.title, path: '/pages/activity/detail?id=1' }) }
function book() {
  if (status.value === '报名中') {
    uni.showToast({ title: '预约成功' });
  }
}
function openMap() {
  uni.openLocation({ latitude: 22.55, longitude: 114.07, name: '笔架山体育公园' });
}
</script>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.hero {
  position: relative;
  height: 240rpx;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 20rpx;
  text-align: center;
}

.hero-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.hero-sub {
  font-size: 24rpx;
}

.content {
  flex: 1;
  padding: 30rpx 30rpx 120rpx;
  overflow-y: auto;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.info-item {
  background: #f8f8f8;
  padding: 24rpx;
  border-left: 8rpx solid #667eea;
}

.info-label {
  font-size: 24rpx;
  color: #666;
}

.info-value {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
}

.progress {
  margin-bottom: 30rpx;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  margin-bottom: 8rpx;
}

.progress-bar {
  height: 8rpx;
  background: #e5e5e5;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #667eea;
}

.desc-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
  color: #333;
}

.desc-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  white-space: pre-line;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20rpx 30rpx;
  display: flex;
  gap: 20rpx;
  background: #fff;
  border-top: 1rpx solid #e5e5e5;
  z-index: 999;
}

.btn {
  flex: 1;
  padding: 28rpx 0;
  text-align: center;
  font-size: 32rpx;
  border-radius: 0;
}

.btn-primary {
  background: #667eea;
  color: #fff;
}

.btn-share {
  background: #f5f5f5;
  color: #333;
}

.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 15px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>