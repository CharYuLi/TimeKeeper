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
      <view class="nav-tab" :class="{ active: activeTab === 'students' }" @click="switchTab('students')">学生列表</view>
      <view class="nav-tab" :class="{ active: activeTab === 'upload' }" @click="switchTab('upload')">今日照片</view>
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

      <!-- 学生列表 -->
      <view v-show="activeTab === 'students'" class="list">
        <view v-for="stu in studentList" :key="stu.id" class="student-item" hover-class="hover"
          @tap="openStudent(stu.id)">
          <view class="name">{{ stu.name }}</view>
        </view>
      </view>

      <!-- 今日照片 -->
      <view v-show="activeTab === 'upload'" class="upload-area">
        <view v-if="!preview" class="upload-box" hover-class="hover" @tap="choosePhoto">
          <view class="upload-icon">📸</view>
          <view class="upload-text">点击或拖拽上传今日照片</view>
        </view>
        <image v-else :src="preview" class="preview-img" mode="aspectFill" />
        <input v-model="description" class="desc-input" placeholder="添加描述..." />
        <button class="upload-btn" hover-class="hover" @tap="uploadPhoto">
          {{ preview ? '重新上传' : '上传并发布' }}
        </button>
      </view>
    </view>

    <!-- 悬浮按钮 -->
    <view class="floating-btn" @tap="showModal">+</view>

    <!-- 添加积分 / 日志模态框 -->
    <view v-if="showAddModal" class="modal" @tap="closeModal">
      <view class="modal-content" @tap.stop>
        <view class="close" @tap="closeModal">×</view>
        <view class="form-group">
          <label>学生</label>
          <picker mode="selector" :range="studentNames" :value="studentIdx" @change="onStudentChange">
            <view class="picker">{{ studentNames[studentIdx] }}</view>
          </picker>
        </view>
        <view class="form-group">
          <label>积分变动</label>
          <input v-model="points" type="number" placeholder="+/- 积分" />
        </view>
        <view class="form-group">
          <label>日志描述</label>
          <input v-model="logDesc" placeholder="今日表现" />
        </view>
        <view class="btn-group">
          <button class="btn-secondary" @tap="closeModal">取消</button>
          <button class="btn-primary" @tap="submitForm">确认</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
// import { useUserStore } from '@/stores/user';

/* 状态 */
const activeTab = ref('leaderboard');
const showAddModal = ref(false);
const preview = ref('');
const description = ref('');
const points = ref('');
const logDesc = ref('');
const studentIdx = ref(0);

/* 静态数据 */
const tabs = [
  { key: 'rank', name: '排行榜' },
  { key: 'students', name: '学生列表' },
  { key: 'upload', name: '今日照片' }
];

const rankList = [
  { id: 1, name: '小红', points: 450 },
  { id: 2, name: '小明', points: 428 },
  { id: 3, name: '小丽', points: 310 }
];

const studentList = [
  { id: 1, name: '小明' },
  { id: 2, name: '小红' }
];

const studentNames = computed(() => studentList.map(s => s.name));

/* tools */
function switchTab(key) { activeTab.value = key }
function openStudent(id) { uni.navigateTo({ url: `/pages/management/studentDetails` }) }
function choosePhoto() {
  uni.chooseImage({
    count: 1,
    success: (res) => (preview.value = res.tempFilePaths[0])
  });
}
function uploadPhoto() {
  if (!preview.value) return uni.showToast({ title: '请选择照片', icon: 'none' });
  uni.showLoading({ title: '上传中...' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({ title: '上传成功' });
    preview.value = '';
    description.value = '';
  }, 1000);
}
function showModal() { showAddModal.value = true }
function closeModal() { showAddModal.value = false }
function onStudentChange(e) { studentIdx.value = e.detail.value }
function submitForm() {
  uni.showToast({ title: '已保存' });
  closeModal();
}
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

.btn.hover:active {
  opacity: 0.8;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.student-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 12px;
  background: #fafafa;
}

.name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.upload-area {
  flex: 1;
  padding: 60rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-box {
  width: 80%;
  height: 240rpx;
  border: 2rpx dashed #667eea;
  border-radius: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.upload-box.hover {
  background: #f0f0ff;
}

.upload-icon {
  font-size: 64rpx;
  color: #667eea;
  margin-bottom: 20rpx;
}

.upload-text {
  font-size: 32rpx;
  color: #667eea;
}

.preview-img {
  width: 80%;
  height: 240rpx;
  border-radius: 40rpx;
  object-fit: cover;
}

.desc-input {
  width: 80%;
  padding: 20rpx;
  border: 1rpx solid #e5e5e5;
  border-radius: 30rpx;
  margin-top: 20rpx;
  font-size: 28rpx;
}

.upload-btn {
  width: 80%;
  padding: 30rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 50rpx;
  margin-top: 40rpx;
  font-size: 32rpx;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.modal-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 40rpx;
  border-top-left-radius: 50rpx;
  border-top-right-radius: 50rpx;
}

.close {
  font-size: 48rpx;
  color: #999;
}

.form-group {
  margin-bottom: 30rpx;
}

.form-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.picker {
  padding: 20rpx;
  border: 1rpx solid #e5e5e5;
  border-radius: 20rpx;
  font-size: 28rpx;
}

.form-group input {
  padding: 20rpx;
  border: 1rpx solid #e5e5e5;
  border-radius: 20rpx;
  font-size: 28rpx;
}

.btn-group {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
}

.btn-secondary,
.btn-primary {
  flex: 1;
  padding: 24rpx 0;
  font-size: 32rpx;
  border-radius: 50rpx;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

/* 悬浮按钮 */
.floating-btn {
  position: fixed;
  bottom: 40rpx;
  right: 40rpx;
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.2);
  z-index: 10;
}
</style>


<!-- <script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';

/* 状态 */
const activeTab        = ref('rank');
const showAddModal     = ref(false);
const preview          = ref('');
const description      = ref('');
const points           = ref('');
const logDesc          = ref('');
const studentIdx       = ref(0);

/* 静态数据 */
const tabs = [
  { key: 'rank',     name: '积分排行榜' },
  { key: 'students', name: '学生列表' },
  { key: 'upload',   name: '今日照片' }
];

const rankList = [
  { id: 1, name: '小红', points: 450 },
  { id: 2, name: '小明', points: 428 },
  { id: 3, name: '小丽', points: 310 }
];

const studentList = [
  { id: 1, name: '小明', avatar: '👦' },
  { id: 2, name: '小红', avatar: '👧' }
];

const studentNames = computed(() => studentList.map(s => s.name));

/* tools */
function switchTab(key) { activeTab.value = key }
function openStudent(id) { uni.navigateTo({ url: `/pages/student/detail?id=${id}` }) }
function choosePhoto() {
  uni.chooseImage({
    count: 1,
    success: (res) => (preview.value = res.tempFilePaths[0])
  });
}
function uploadPhoto() {
  if (!preview.value) return uni.showToast({ title: '请选择照片', icon: 'none' });
  uni.showLoading({ title: '上传中...' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({ title: '上传成功' });
    preview.value = '';
    description.value = '';
  }, 1000);
}
function showModal() { showAddModal.value = true }
function closeModal() { showAddModal.value = false }
function onStudentChange(e) { studentIdx.value = e.detail.value }
function submitForm() {
  uni.showToast({ title: '已保存' });
  closeModal();
}
</script> -->