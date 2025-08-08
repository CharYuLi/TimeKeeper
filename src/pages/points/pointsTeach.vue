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

    <!-- 一级功能导航 -->
    <view class="nav-tabs">
      <view class="nav-tab" :class="{ active: activeTab === 'leaderboard' }" @click="switchTab('leaderboard')">🏆 排行榜
      </view>
      <view class="nav-tab" :class="{ active: activeTab === 'records' }" @click="switchTab('records')">📋 积分记录</view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 积分排行榜 -->
      <view v-show="activeTab === 'leaderboard'" class="tab-content">
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

      <!-- 积分记录 -->
      <view v-show="activeTab === 'records'" class="tab-content">
        <view class="record-item" @click="showRecordDetail('完成数学作业', '+10', '2025-08-02 14:30')">
          <view style="display: flex; justify-content: space-between; align-items: center;">
            <view>
              <view style="font-weight: bold;">完成数学作业</view>
              <view style="font-size: 12px; color: #999;">按时完成作业，正确率90%</view>
            </view>
            <view style="font-size: 18px; font-weight: bold; color: #4caf50;">+10</view>
          </view>
          <view style="font-size: 12px; color: #999; margin-top: 5px;">2025-08-02 14:30</view>
        </view>

        <view class="record-item" @click="showRecordDetail('帮助同学', '+5', '2025-08-02 10:15')">
          <view style="display: flex; justify-content: space-between; align-items: center;">
            <view>
              <view style="font-weight: bold;">帮助同学</view>
              <view style="font-size: 12px; color: #999;">主动帮助同桌解决问题</view>
            </view>
            <view style="font-size: 18px; font-weight: bold; color: #4caf50;">+5</view>
          </view>
          <view style="font-size: 12px; color: #999; margin-top: 5px;">2025-08-02 10:15</view>
        </view>

        <view class="record-item" @click="showRecordDetail('兑换文具套装', '-50', '2025-08-01 16:20')">
          <view style="display: flex; justify-content: space-between; align-items: center;">
            <view>
              <view style="font-weight: bold;">兑换文具套装</view>
              <view style="font-size: 12px; color: #999;">精美文具套装一套</view>
            </view>
            <view style="font-size: 18px; font-weight: bold; color: #f44336;">-50</view>
          </view>
          <view style="font-size: 12px; color: #999; margin-top: 5px;">2025-08-01 16:20</view>
        </view>
      </view>
    </view>

    <view class="modal" v-show="showDetailModal">
      <view class="modal-content">
        <span class="close-btn" @click="closeModal">×</span>
        <h3>{{ modalTitle }}</h3>
        <p v-html="modalContent" style="margin: 20px 0;"></p>
        <button class="btn btn-primary" @click="closeModal" style="width: 100%;">知道了</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';



import { exchangeProduct } from '@/api/points';
// import { gainPointsForchild } from '@/api/points';


const activeTab = ref('leaderboard');
const showDetailModal = ref(false);
const modalTitle = ref('');
const modalContent = ref('');

const switchTab = (tabName) => {
  activeTab.value = tabName;
};

const showRecordDetail = (title, points, time) => {
  modalTitle.value = title;
  modalContent.value = `
    <strong>积分变化：</strong>${points}<br>
    <strong>时间：</strong>${time}<br>
    <strong>说明：</strong>${title}
  `;
  showDetailModal.value = true;
};

const closeModal = () => {
  showDetailModal.value = false;
};

// 接口
const handleExchange = async (productName) => {
  const response = await exchangeProduct('token', productName);
  if (response.success) {
    uni.showToast({ title: response.data, icon: 'success' });
    // 刷新积分
    points.value = await loadUserPoints('token');
  } else {
    uni.showToast({ title: response.message, icon: 'none' });
  }
};

// const handleGainPoints = async () => {
//   const response = await gainPointsForchild('token');
//   if (response.success) {
//     uni.showToast({ title: response.message, icon: 'success' });
//   } else {
//     uni.showToast({ title: response.message, icon: 'none' });
//   }
// }
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
  max-width: 375px;
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

.date-selector {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 10px 20px;
  margin-top: 15px;
  display: inline-block;
}

.nav-tabs {
  display: flex;
  background: white;
  border-bottom: 1px solid #eee;
}

.nav-tab {
  flex: 1;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  color: #999;
  font-weight: 500;
  position: relative;
}

.nav-tab.active {
  color: #667eea;
  font-weight: bold;
}

.nav-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: #667eea;
  border-radius: 2px;
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

.record-item {
  background: #f8f9ff;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  transition: all 0.3s;
  cursor: pointer;
  border-left: 4px solid #667eea;
}

.record-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 30px;
  animation: slideUp 0.3s;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-state-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

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
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.2);
  z-index: 10;
}
</style>