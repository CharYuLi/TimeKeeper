<template>
  <view class="container">
    <view class="header">
      <view class="user-info">
        <view class="avatar">👦</view>
        <view>
          <h2>小明同学</h2>
          <p>三年级二班</p>
        </view>
      </view>
      <view class="points-card">
        <view class="points-value">328</view>
        <view>我的积分</view>
      </view>
    </view>

    <!-- 一级功能导航 -->
    <view class="nav-tabs">
      <view class="nav-tab" :class="{ active: activeTab === 'records' }" @click="switchTab('records')">📋 积分记录</view>
      <view class="nav-tab" :class="{ active: activeTab === 'redeem' }" @click="switchTab('redeem')">🎁 积分兑换</view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 积分记录 -->
      <view v-show="activeTab === 'records'" class="tab-content">
        <view class="record-item" @click="showRecordDetail('完成数学作业', '+10', '2025-08-02 14:30')">
          <view class="record-content">
            <view class="record-info">
              <view class="record-title">完成数学作业</view>
              <view class="record-description">按时完成作业，正确率90%</view>
            </view>
            <view class="record-score positive">+10</view>
          </view>
          <view class="record-time">2025-08-02 14:30</view>
        </view>

        <view class="record-item" @click="showRecordDetail('帮助同学', '+5', '2025-08-02 10:15')">
          <view class="record-content">
            <view class="record-info">
              <view class="record-title">帮助同学</view>
              <view class="record-description">主动帮助同桌解决问题</view>
            </view>
            <view class="record-score positive">+5</view>
          </view>
          <view class="record-time">2025-08-02 10:15</view>
        </view>

        <view class="record-item" @click="showRecordDetail('兑换文具套装', '-50', '2025-08-01 16:20')">
          <view class="record-content">
            <view class="record-info">
              <view class="record-title">兑换文具套装</view>
              <view class="record-description">精美文具套装一套</view>
            </view>
            <view class="record-score negative">-50</view>
          </view>
          <view class="record-time">2025-08-01 16:20</view>
        </view>
      </view>

      <view v-show="activeTab === 'redeem'" class="tab-content">
        <view class="redeem-item" @click="showRedeemDetail('文具套装', 50)">
          <view class="redeem-icon">📝</view>
          <view style="flex: 1;">
            <view style="font-weight: bold;">文具套装</view>
            <view style="font-size: 14px; color: #666;">包含铅笔、橡皮、尺子等</view>
            <view style="font-size: 18px; color: #667eea; margin-top: 5px;">50分</view>
          </view>
        </view>

        <view class="redeem-item" @click="showRedeemDetail('小恐龙玩具', 80)">
          <view class="redeem-icon">🦕</view>
          <view style="flex: 1;">
            <view style="font-weight: bold;">小恐龙玩具</view>
            <view style="font-size: 14px; color: #666;">可动关节的可爱恐龙</view>
            <view style="font-size: 18px; color: #667eea; margin-top: 5px;">80分</view>
          </view>
        </view>

        <view class="redeem-item" @click="showRedeemDetail('免作业券', 100)">
          <view class="redeem-icon">🎫</view>
          <view style="flex: 1;">
            <view style="font-weight: bold;">免作业券</view>
            <view style="font-size: 14px; color: #666;">可免一次家庭作业</view>
            <view style="font-size: 18px; color: #667eea; margin-top: 5px;">100分</view>
          </view>
        </view>

        <view class="empty-state">
          <view class="empty-state-icon">🎯</view>
          <p>继续加油获得更多积分！</p>
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

    <view class="modal" v-show="showRedeemModal">
      <view class="modal-content">
        <span class="close-btn" @click="closeModal">×</span>
        <h3>申请兑换 {{ redeemItem }}</h3>
        <p style="margin: 20px 0;">确定要用 <span style="color: #667eea; font-weight: bold;">{{ redeemPoints }}</span> 积分兑换
          <span style="font-weight: bold;">{{ redeemItem }}</span> 吗？
        </p>
        <view style="display: flex; gap: 10px;">
          <button class="btn btn-secondary" style="flex: 1; background: #f0f0f0; color: #666;"
            @click="closeModal">取消</button>
          <button class="btn btn-primary" style="flex: 1;" @click="submitRedeem">确认申请</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';



import { exchangeProduct } from '@/api/points';
// import { gainPointsForchild } from '@/api/points';


const activeTab = ref('records');
const showDetailModal = ref(false);
const showRedeemModal = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const redeemItem = ref('');
const redeemPoints = ref(0);

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

const showRedeemDetail = (item, points) => {
  redeemItem.value = item;
  redeemPoints.value = points;
  showRedeemModal.value = true;
};

const closeModal = () => {
  showDetailModal.value = false;
  showRedeemModal.value = false;
};

const submitRedeem = () => {
  alert('兑换申请已提交，等待老师审批！');
  closeModal();
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

.points-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 15px 30px;
  display: inline-block;
  margin-top: 15px;
}

.points-value {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
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

.record-item {
  margin-bottom: 15px;
  padding: 15px;
  background: #f8f9ff;
  border-radius: 12px;
  margin-bottom: 15px;
  transition: all 0.3s;
  cursor: pointer;
  border-left: 4px solid #667eea;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.record-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.record-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.record-info {
  flex: 1;
}

.record-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.record-description {
  font-size: 12px;
  color: #999;
}

.record-score {
  font-size: 18px;
  font-weight: bold;
}

.record-score.positive {
  color: #4caf50;
}

.record-score.negative {
  color: #f44336;
}

.record-time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  margin-left: 1px;
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

.redeem-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 12px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.redeem-item:hover {
  border-color: #667eea;
  background: #f8f9ff;
}

.redeem-icon {
  width: 60px;
  height: 60px;
  background: #f0f0ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 30px;
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
</style>