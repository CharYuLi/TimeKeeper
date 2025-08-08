<template>
  <view class="container">
    <view class="header">
      <view class="title">小明同学</view>
    </view>

    <view class="nav-tabs">
      <view class="nav-tab" :class="{ active: activeTab === 'points' }" @click="switchTab('points')">积分管理</view>
      <view class="nav-tab" :class="{ active: activeTab === 'logs' }" @click="switchTab('logs')">日志管理
      </view>
      <view class="nav-tab" :class="{ active: activeTab === 'feedback' }" @click="switchTab('feedback')">教师反馈</view>
    </view>

    <view class="content">

      <!-- 积分管理 -->
      <view v-show="activeTab === 'points'" class="tab-content">

        <!-- 今日表现 -->
        <view class="performance-card">
          <h3 style="margin-bottom: 15px; color: #667eea;">🎯 加分明细</h3>
          <view class="behavior-item">
            <span>桌面整洁 +2分</span>
          </view>
          <view class="behavior-item">
            <span>专注听讲 +3分</span>
          </view>
          <view class="behavior-item">
            <span>餐后收拾 +2分</span>
          </view>
          <view class="behavior-item">
            <span>完成数学作业 +2分</span>
          </view>
        </view>

        <view class="performance-card">
          <h3 style="margin-bottom: 15px; color: #667eea;">📊 今日积分</h3>
          <view style="text-align: center;">
            <view style="font-size: 48px; color: #667eea; font-weight: bold;">+9</view>
            <p style="color: #666;">表现优秀，继续努力！</p>
          </view>
        </view>
      </view>

      <!-- 日志管理 -->
      <view v-show="activeTab === 'logs'" class="tab-content">

        <!-- 学科表现 -->
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

        <!-- 作业情况 -->
        <view class="task-item" @click.stop="showTaskDetail('语文', '抄写古诗《静夜思》', '已完成', '字迹工整，很认真')">
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

      <!-- 教师反馈 -->
      <view v-show="activeTab === 'feedback'" class="tab-content">
        <view class="performance-card">
          <h3 style="margin-bottom: 15px; color: #667eea;">📋 教师点评</h3>
          <view style="background: #f8f9ff; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            <textarea placeholder="请输入回复内容..."></textarea>
          </view>
          <button class="btn btn-primary" style="width: 100%;" @click="sendReply">发送</button>
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

    <!-- 添加学生积分模态框显示按钮 -->
    <view class="fab" v-show="activeTab === 'points'" @click="showAddLog">+</view>
    <!-- 添加学生日志模态框显示按钮 -->
    <view class="fab" v-show="activeTab === 'logs'" @click="showAddLog">+</view>
  </view>


  <!-- 添加学生积分模态框 -->
  <view class="modal" v-show="activeTab === 'points' && showAddLogModal" @click.self="closeModal('addLog')">
    <view class="modal-content">
      <span class="close-btn" @click="closeModal('addLog')">×</span>
      <h3>修改学生积分</h3>
      <view class="form-group">
        <label>学生姓名</label>
        <select>
          <option>小明</option>
          <option>小红</option>
          <option>小丽</option>
        </select>
      </view>
      <view class="form-group">
        <label>日志描述</label>
        <textarea placeholder="请输入积分变动原因..."></textarea>
      </view>
      <view class="btn-group">
        <button class="btn btn-secondary" @click="closeModal('addLog')">取消</button>
        <button class="btn btn-primary" @click="saveLog">保存</button>
      </view>
    </view>
  </view>
  <!-- 添加学生日志模态框 -->
  <view class="modal" v-show="activeTab === 'logs' && showAddLogModal" @click.self="closeModal('addLog')">
    <view class="modal-content">
      <span class="close-btn" @click="closeModal('addLog')">×</span>
      <h3>添加学生日志</h3>
      <view class="form-group">
        <label>学生姓名</label>
        <select>
          <option>小明</option>
          <option>小红</option>
          <option>小丽</option>
        </select>
      </view>
      <view class="form-group">
        <label>学科表现</label>
        <select>
          <option>语文 - 优秀</option>
          <option>数学 - 良好</option>
          <option>英语 - 需加强</option>
        </select>
      </view>
      <view class="form-group">
        <label>教师点评</label>
        <textarea placeholder="请输入今日点评..."></textarea>
      </view>
      <view class="btn-group">
        <button class="btn btn-secondary" @click="closeModal('addLog')">取消</button>
        <button class="btn btn-primary" @click="saveLog">保存</button>
      </view>
    </view>
  </view>

</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('points')
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

function goBack() { uni.navigateBack() }
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
function showAddLog() {
  showAddLogModal.value = true
}
function closeModal(modal) {
  if (modal === 'task') showTaskModal.value = false
  if (modal === 'reply') showReplyModal.value = false
  if (modal === 'addLog') showAddLogModal.value = false
}
function sendReply() {
  alert('回复已发送给家长！')
  closeModal('reply')
}
function saveLog() {
  alert('已保存！')
  closeModal('addLog')
}
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
</style>