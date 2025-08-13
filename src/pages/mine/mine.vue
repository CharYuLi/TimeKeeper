<template>
  <view class="page">
    <!-- 页面内容 -->
    <!-- 顶部头像区 -->
    <view class="header">
      <image class="avatar" src="../../static/1.jpg" @tap="showRegister = true"></image>
      <view class="name-row">
        <view class="name">{{ name }}</view>
        <text class="account-btn" @tap="openAccountPicker">▼</text>
      </view>
      <view class="role">{{ role }}</view>
    </view>

    <!-- 注册弹窗（蒙层+表单） -->
    <RegisterForm v-if="showRegister" @close="showRegister = false" @registered="onRegistered" />

    <!-- 功能菜单 -->
    <view class="content">
      <view class="menu-item" @tap="openPage('profile')">
        <view class="icon">👤</view>
        <view class="text">
          <view class="title">个人资料</view>
          <view class="desc">查看和编辑个人信息</view>
        </view>
        <view class="arrow">›</view>
      </view>
      <view class="menu-item" @tap="openPage('notification')">
        <view class="icon">🔔</view>
        <view class="text">
          <view class="title">消息通知</view>
          <view class="desc">积分变动和系统通知</view>
        </view>
        <view class="arrow">›</view>
      </view>
      <view class="menu-item" @tap="openPage('help')">
        <view class="icon">💡</view>
        <view class="text">
          <view class="title">帮助中心</view>
          <view class="desc">常见问题和使用指南</view>
        </view>
        <view class="arrow">›</view>
      </view>

      <!-- 退出登录 -->
      <view class="logout">
        <button class="btn" hover-class="hover" @tap="handleLogout">退出登录</button>
      </view>
    </view>
  </view>

  <!-- 账号选择弹窗 -->
  <view v-if="showAccountPicker" class="account-modal" @tap="closeAccountPicker">
    <view class="account-list" @tap.stop>
      <view v-for="account in accountList" class="account-item" @tap="switchAccount(account)">
        <image class="account-avatar" :src="account.avatar"></image>
        <view>
          <view class="account-name">{{ account.name }}</view>
        </view>
      </view>
      <view class="account-item" @tap="showRegister = true">
        <view class="plus-icon">＋</view>
        <view class="account-name">添加新学生</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { me } from "../../api/mine.js"
import RegisterForm from "../../components/registerForm.vue"

const showRegister = ref(false)
const name = ref("")
const role = ref("")

const loadProfile = async () => {
  const token = uni.getStorageSync('jwt')
  if (!token) {
    name.value = '游客'
    role.value = '点击头像登录'
    return
  }

  try {
    const { success, data, message } = await me()
    if (success) {
      name.value = data.name
      role.value = data.role ? (data.role === "student" ? "学生" : "教师") : "游客"
    } else {
      throw new Error(message)
    }
  } catch (e) {
    name.value = '游客'
  }
}

// 首次加载
onMounted(loadProfile)

function openPage(page) {
  uni.navigateTo({ url: `/pages/mine/${page}/index` })
}

function onRegistered({ realName }) {
  name.value = realName
  showRegister.value = false
}
// console.log(name.value, role.value)

function handleLogout() {
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
    success(res) {
      if (res.confirm) {
        uni.removeStorageSync('TOKEN')
        name.value = '游客'
        role.value = '请登录'
        uni.showToast({ title: '已退出', icon: 'none' })
      }
    }
  })
}

/* 账号列表示例 */
const accountList = ref([
  { name: 'Char YuLi', avatar: 'https://dummyimage.com/60/667eea/fff&text=CY' },
  { name: 'Char_YuLi2', avatar: 'https://dummyimage.com/60/764ba2/fff&text=CY' }
])
const showAccountPicker = ref(false)

/* 账号相关方法 */
function openAccountPicker() { showAccountPicker.value = true }
function closeAccountPicker() { showAccountPicker.value = false }
function switchAccount(account) {
  uni.setStorageSync('CURRENT_ACCOUNT', account.id)
  uni.showToast({ title: '已切换为 ' + account.name, icon: 'none' })
  closeAccountPicker()
}
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
  padding: 40rpx 0 30rpx;
  text-align: center;
}

.avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  background: white;
  margin: 0 auto 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60rpx;
}

.name-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8rpx;
}

.name {
  font-size: 36rpx;
  font-weight: bold;
  color: white;
  /* margin-bottom: 8rpx; */
}

.role {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

.content {
  padding: 20rpx;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  background: white;
  margin-bottom: 20rpx;
}

.menu-hover {
  background: #f8f9ff;
}

.icon {
  width: 60rpx;
  height: 60rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 34rpx;
  margin-right: 24rpx;
}

.title {
  font-weight: 600;
  font-size: 32rpx;
  color: #333;
  margin-bottom: 8rpx;
}

.desc {
  font-size: 28rpx;
  color: #666;
}

.arrow {
  color: #ccc;
  font-size: 36rpx;
  margin-left: auto;
}

.logout {
  position: fixed;
  bottom: 175rpx;
  left: 50%;
  transform: translateX(-50%);   /* 居中 */
  width: 100%;
  padding: 0 40rpx;             /* 留出左右安全边距 */
  box-sizing: border-box;
  z-index: 10;
}

.btn {
  width: 100%;
  height: 88rpx;
  background: #fff0f0;
  color: #f44336;
  border: 1rpx solid #f44336;
  border-radius: 50rpx;
  font-size: 32rpx;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn.hover:active {
  opacity: 0.9;
}

/* 账号切换按钮 */
.account-btn {
  margin-left: 8rpx;
  font-size: 28rpx;
  color: #fff;
}

/* 账号弹窗 */
.account-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
}

.account-list {
  width: 100%;
  background: #fff;
  border-top-left-radius: 50rpx;
  border-top-right-radius: 50rpx;
  padding-top: 25rpx;
  padding-left: 40rpx;
  padding-right: 40rpx;
  max-height: 70vh;
  overflow-y: auto;
}

.account-item {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.account-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.account-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.account-id {
  font-size: 24rpx;
  color: #666;
}

.plus-icon {
  width: 80rpx;
  height: 80rpx;
  background: #ececec;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  color: #8f8f8f;
  margin-right: 30rpx;
}
</style>