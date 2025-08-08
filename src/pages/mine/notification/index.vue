<template>
  <view class="page">
    <view class="header">
      <view class="title">消息设置</view>
    </view>

    <view class="item" v-for="(c, key) in config" :key="key">
      <text>{{ c.label }}</text>
      <switch :checked="c.value" @change="toggle(key)" />
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'

const config = reactive({
  points: { label: '积分变动通知', value: true },
  system: { label: '系统公告', value: false }
})
function toggle(key) { config[key].value = !config[key].value }
</script>

<style>
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