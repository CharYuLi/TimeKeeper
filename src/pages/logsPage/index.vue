<template>
  <!-- 学生端 -->
  <view v-if="role === 'student'">
    <view class="container">
      <view class="header">
        <view class="user-info">
          <view class="avatar">👦</view>
          <view>
            <h2>小明同学</h2>
          </view>
        </view>
        <view class="date-selector">
          📅 2025年8月2日 星期六
        </view>
      </view>

      <view class="nav-tabs">
        <view class="nav-tab" :class="{ active: activeTab === 'performance' }" @click="switchTab('performance')">今日表现
        </view>
        <view class="nav-tab" :class="{ active: activeTab === 'tasks' }" @click="switchTab('tasks')">作业任务</view>
        <view class="nav-tab" :class="{ active: activeTab === 'feedback' }" @click="switchTab('feedback')">教师反馈</view>
      </view>

      <view class="content">
        <view v-show="activeTab === 'performance'" class="tab-content">
          <view class="performance-card">
            <h3 style="margin-bottom: 15px; color: #667eea;">📚 学科表现</h3>
            <view class="subject-row">
              <span class="subject-name">语文</span>
              <span class="status-tag status-good">完成优秀</span>
            </view>
            <view class="subject-row">
              <span class="subject-name">数学</span>
              <span class="status-tag status-need-improve">需加强口算</span>
            </view>
            <view class="subject-row">
              <span class="subject-name">英语</span>
              <span class="status-tag status-good">完成良好</span>
            </view>
          </view>

          <view class="performance-card">
            <h3 style="margin-bottom: 15px; color: #667eea;">🎯 行为习惯</h3>
            <view class="behavior-item">
              <view class="behavior-icon">🧹</view>
              <span>桌面整洁 +2分</span>
            </view>
            <view class="behavior-item">
              <view class="behavior-icon">🤫</view>
              <span>专注听讲 +3分</span>
            </view>
            <view class="behavior-item">
              <view class="behavior-icon">🍽️</view>
              <span>餐后收拾 +2分</span>
            </view>
          </view>

          <view class="performance-card">
            <h3 style="margin-bottom: 15px; color: #667eea;">📊 今日积分</h3>
            <view style="text-align: center;">
              <view style="font-size: 48px; color: #667eea; font-weight: bold;">+15</view>
              <p style="color: #666;">表现优秀，继续努力！</p>
            </view>
          </view>
        </view>

        <view v-show="activeTab === 'tasks'" class="tab-content">
          <view class="task-item" @click="showTaskDetail('语文', '抄写古诗《静夜思》', '已完成', '字迹工整，很认真')">
            <view class="task-header">
              <span class="task-subject">语文作业</span>
              <span class="task-status task-completed">已完成</span>
            </view>
            <p>抄写古诗《静夜思》</p>
            <view class="image-preview">📸 查看作业照片</view>
          </view>

          <view class="task-item" @click="showTaskDetail('数学', '口算练习50题', '待完成', '需要家长签字')">
            <view class="task-header">
              <span class="task-subject">数学作业</span>
              <span class="task-status task-pending">待完成</span>
            </view>
            <p>口算练习50题</p>
          </view>

          <view class="task-item" @click="showTaskDetail('英语', '朗读课文Unit 3', '已完成', '发音标准，声音洪亮')">
            <view class="task-header">
              <span class="task-subject">英语作业</span>
              <span class="task-status task-completed">已完成</span>
            </view>
            <p>朗读课文Unit 3</p>
            <view class="image-preview">📸 查看朗读视频</view>
          </view>
        </view>

        <view v-show="activeTab === 'feedback'" class="tab-content">
          <view class="performance-card">
            <h3 style="margin-bottom: 15px; color: #667eea;">💬 教师点评</h3>
            <view style="background: #f8f9ff; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
              <p style="margin-top: 5px;">今天小明表现很棒！数学作业完成质量高，英语朗读声音洪亮。建议加强口算练习，继续加油！</p>
            </view>
            <button class="btn btn-primary" style="width: 100%;" @click="showReplyForm">回复</button>
          </view>
        </view>
      </view>
    </view>

    <view class="modal" v-show="showTaskModal" @click.self="closeModal('task')">
      <view class="modal-content">
        <span class="close-btn" @click="closeModal('task')">×</span>
        <h3>{{ taskModalData.title }}</h3>
        <p style="color: #667eea; margin-bottom: 10px;">{{ taskModalData.subject }}</p>
        <p style="margin-bottom: 10px;">{{ taskModalData.content }}</p>
        <p style="margin-bottom: 10px;">{{ taskModalData.status }}</p>
        <p style="background: #f8f9ff; padding: 10px; border-radius: 8px;">{{ taskModalData.comment }}</p>
      </view>
    </view>

    <view class="modal" v-show="showReplyModal" @click.self="closeModal('reply')">
      <view class="modal-content">
        <span class="close-btn" @click="closeModal('reply')">×</span>
        <h3>回复教师</h3>
        <view class="form-group">
          <label>回复内容</label>
          <textarea placeholder="请输入回复内容..."></textarea>
        </view>
        <view class="btn-group">
          <button class="btn btn-secondary" @click="closeModal('reply')">取消</button>
          <button class="btn btn-primary" @click="sendReply">发送</button>
        </view>
      </view>
    </view>
  </view>



  <!-- 教师端 -->
  <view v-else-if="role === 'teacher'">
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
  </view>


</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoleStore } from '../../stores/role'
const { role } = useRoleStore()

onMounted(async () => {
  try {
    role.value = uni.getStorageSync('data.role') || 'student'
  } catch (e) {
    console.error('读取角色信息失败', e)
    role.value = ''
  }
})

/* === logs 逻辑 === */
const activeTab = ref('performance')
const showTaskModal = ref(false)
const showReplyModal = ref(false)
const showAddLogModal = ref(false)
const taskModalData = ref({
  title: '',
  subject: '',
  content: '',
  status: '',
  comment: ''
})

function switchTab(tabName) {
  activeTab.value = tabName
}

function showTaskDetail(subject, content, status, comment) {
  taskModalData.value = {
    title: `${subject}作业详情`,
    subject: `科目：${subject}`,
    content: `内容：${content}`,
    status: `状态：${status}`,
    comment: `点评：${comment}`
  }
  showTaskModal.value = true
}

function showReplyForm() {
  showReplyModal.value = true
}

function showAddLog() {
  showAddLogModal.value = true
}

function closeModal(modal) {
  if (modal === 'task') showTaskModal.value = false
  if (modal === 'reply') showReplyModal.value = false
  if (modal === 'addLog') showAddLogModal.value = false
}

function sendReply() {
  alert('回复已发送给教师！')
  closeModal('reply')
}

function saveLog() {
  alert('学生日志已保存！')
  closeModal('addLog')
}



/* === management 逻辑 === */
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
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.3s;
}

.tab-content.active {
  display: block;
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

/* === logs 样式 === */
.performance-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.performance-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.subject-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.subject-row:last-child {
  border-bottom: none;
}

.subject-name {
  font-weight: bold;
  color: #667eea;
}

.status-tag {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
}

.status-good {
  background: #e8f5e9;
  color: #4caf50;
}

.status-need-improve {
  background: #fff3e0;
  color: #ff9800;
}

.behavior-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background: #f8f9ff;
  border-radius: 10px;
}

.behavior-icon {
  width: 30px;
  height: 30px;
  background: #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
}

.task-item {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s;
}

.task-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.task-subject {
  font-weight: bold;
  color: #667eea;
}

.task-status {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
}

.task-completed {
  background: #e8f5e9;
  color: #4caf50;
}

.task-pending {
  background: #ffebee;
  color: #f44336;
}

.image-preview {
  width: 100%;
  height: 120px;
  background: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  color: #999;
  font-size: 14px;
}

.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  cursor: pointer;
  transition: all 0.3s;
}

.fab:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
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
  max-height: 80vh;
  overflow-y: auto;
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

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #667eea;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.btn-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-secondary {
  background: #f0f0f0;
  color: #666;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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