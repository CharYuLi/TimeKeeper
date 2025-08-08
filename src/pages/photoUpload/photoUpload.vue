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

    <!-- 今日照片 -->
    <view class="upload-area">
      <view v-if="!preview" class="upload-box" hover-class="hover" @tap="choosePhoto">
        <view class="upload-icon">📸</view>
        <view class="upload-text">点击或拖拽上传今日照片</view>
      </view>
      <image v-else :src="preview" class="preview-img" mode="aspectFill" />
      <input v-model="description" class="desc-input" placeholder="添加描述..." />
      <button class="upload-btn" hover-class="hover" @tap="uploadPhoto">
        {{ preview ? '发布' : '上传照片' }}
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
// import { useUserStore } from '@/stores/user';

const showAddModal = ref(false);
const preview = ref('');
const description = ref('');
const points = ref('');
const logDesc = ref('');

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

/* 上传照片 */
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
</style>