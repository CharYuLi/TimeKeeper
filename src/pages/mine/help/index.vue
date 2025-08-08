<template>
  <view class="page">
    <view class="header">
      <view class="title">帮助中心</view>
    </view>

    <view v-for="(q, i) in qa" :key="i" class="item" @tap="toggle(i)">
      <view>
        <text class="q">{{ q.q }}</text>
        <text v-show="openIndex === i" class="a">{{ q.a }}</text>
      </view>
      <text class="icon">{{ openIndex === i ? '−' : '+' }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const qa = ref([
  { q: '如何获得积分？', a: '完成作业、参与活动、表现优秀等均可获得积分。' },
  { q: '积分可以兑换什么？', a: '文具、玩具、奖励卡等丰富奖品。' }
]);
const openIndex = ref(-1);
function toggle(i) { openIndex.value = openIndex.value === i ? -1 : i; }
</script>

<style scoped>
.page {
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

.q {
  font-weight: bold;
}

.a {
  display: block;
  margin-top: 10rpx;
  font-size: 28rpx;
  color: #666;
}

.icon {
  font-size: 28rpx;
  color: #667eea;
}
</style>