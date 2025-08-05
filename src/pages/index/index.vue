<template>
  <view class="page">
    <!-- 全屏轮播 -->
    <view class="full-banner">
      <swiper
        class="swiper"
        :indicator-dots="false"
        :autoplay="true"
        :interval="3000"
        :duration="400"
        :current="current"
        @change="onChange"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <swiper-item v-for="(item, index) in bannerList" :key="index">
          <image :src="item.image" mode="aspectFill" class="banner-img" />
          <view class="swiper-content">
            <view class="title">{{ item.title }}</view>
            <view class="subtitle">{{ item.subtitle }}</view>
          </view>
        </swiper-item>
      </swiper>
      <view class="swiper-dots">
        <view
          v-for="(d, i) in bannerList"
          :key="i"
          class="dot"
          :class="{ active: i === current }"
        />
      </view>
    </view>

    <!-- 悬浮按钮 -->
    <view class="floating-btn" @tap="addPoints">
      <text>+</text>
    </view>

  </view>
</template>

<script setup>
import { ref } from 'vue';


const bannerList = ref([
  { image: 'https://dummyimage.com/375x617/667eea/fff&text=积分活动1', title: '积分乐园', subtitle: '探索积分的奇妙世界' },
  { image: 'https://dummyimage.com/375x617/764ba2/fff&text=积分活动2', title: '成长积分榜', subtitle: '记录每一步成长' },
  { image: 'https://dummyimage.com/375x617/8e8e8e/fff&text=积分活动3', title: '精彩瞬间', subtitle: '留住美好的每一刻' },
]);

const current = ref(0);
function onChange(e) { current.value = e.detail.current; }
let startX = 0;
function onTouchStart(e) { startX = e.touches[0].clientX; }
function onTouchEnd(e) {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    current.value = diff > 0 ? Math.min(2, current.value + 1) : Math.max(0, current.value - 1);
  }
}
function addPoints() { uni.navigateTo({ url: '/pages/points/add' }); }
</script>

<style scoped>
.page {
  max-width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background: #fff;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  border-radius: 0;
  overflow-x: hidden;
}

/* 全屏轮播区域 */
.full-banner {
  flex: 1;
  position: relative;
  width: 100%;
  height: 100vh;
}

.swiper {
  width: 100%;
  height: 100%;
}

.banner-img {
  width: 100%;
  height: 100%;
  display: block;
}

/* 轮播文字 */
.swiper-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  background: rgba(0,0,0,.15);
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  text-shadow: 2rpx 2rpx 6rpx rgba(0,0,0,.5);
}

.subtitle {
  font-size: 32rpx;
}

/* 指示点 */
.swiper-dots {
  position: absolute;
  bottom: 40rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12rpx;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: rgba(255,255,255,.5);
}

.dot.active {
  background: #fff;
}

/* 悬浮按钮 */
.floating-btn {
  position: absolute;
  bottom: 120rpx;
  right: 40rpx;
  width: 100rpx;
  height: 100rpx;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  color: #667eea;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,.2);
  z-index: 10;
}
</style>