<template>
  <view class="container">
    <!-- 顶部栏 -->
    <view class="header">
      <view class="user-info">
        <view class="avatar">👩‍🏫</view>
        <view>
          <h2>刘老师</h2>
        </view>
      </view>
      <view class="date-selector">
        📅 2025年8月2日 星期六
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <view class="leaderboard-item">
        <view class="rank gold">1</view>
        <view class="student-avatar">👧</view>
        <view style="flex: 1;">
          <view style="font-weight: bold;">小红</view>
          <view style="font-size: 12px; color: #999;">三年级一班</view>
        </view>
        <view style="font-size: 20px; font-weight: bold; color: #667eea;">450分</view>
      </view>

      <view class="leaderboard-item">
        <view class="rank silver">2</view>
        <view class="student-avatar">👦</view>
        <view style="flex: 1;">
          <view style="font-weight: bold;">小明</view>
          <view style="font-size: 12px; color: #999;">三年级二班</view>
        </view>
        <view style="font-size: 20px; font-weight: bold; color: #667eea;">328分</view>
      </view>

      <view class="leaderboard-item">
        <view class="rank bronze">3</view>
        <view class="student-avatar">👧</view>
        <view style="flex: 1;">
          <view style="font-weight: bold;">小丽</view>
          <view style="font-size: 12px; color: #999;">三年级一班</view>
        </view>
        <view style="font-size: 20px; font-weight: bold; color: #667eea;">310分</view>
      </view>

      <view class="leaderboard-item">
        <view class="rank other">4</view>
        <view class="student-avatar">👦</view>
        <view style="flex: 1;">
          <view style="font-weight: bold;">小强</view>
          <view style="font-size: 12px; color: #999;">三年级二班</view>
        </view>
        <view style="font-size: 20px; font-weight: bold; color: #667eea;">285分</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('leaderboard');
</script>

<style>
.page {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
  background: #f5f5f5;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
  background: #f5f5f5;
  overflow-x: hidden;
}

.container {
  margin: 0 auto;
  background: white;
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: float 20s infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }

  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  z-index: 1;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* === management 样式 === */
.date-selector {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 10px 20px;
  margin-top: 15px;
  display: inline-block;
}

.content {
  padding: 20px;
  min-height: 500px;
}

.tab-content {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn.hover:active {
  opacity: 0.8;
}

/* 积分排行榜 */
.leaderboard-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  cursor: pointer;
}

.leaderboard-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.rank {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  font-size: 18px;
}

.rank.gold {
  background: #FFD700;
  color: white;
}

.rank.silver {
  background: #C0C0C0;
  color: white;
}

.rank.bronze {
  background: #CD7F32;
  color: white;
}

.rank.other {
  background: #f0f0f0;
  color: #666;
}
</style>