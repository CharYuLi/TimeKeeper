<template>
  <view class="container">
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

    <view class="content">
      <view class="list">
        <view v-for="stu in studentList" :key="stu.id" class="student-item" hover-class="hover"
          @tap="openStudent(stu.id)">
          <view class="name">{{ stu.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('students');
const studentIdx = ref(0);

const studentList = [
  { id: 1, name: '小明' },
  { id: 2, name: '小红' }
];

const studentNames = computed(() => studentList.map(s => s.name));

function openStudent(id) { uni.navigateTo({ url: `./studentDetails` }) }
function onStudentChange(e) { studentIdx.value = e.detail.value }
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

/* 学生列表 */
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
</style>