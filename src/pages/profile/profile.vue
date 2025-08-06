<template>
  <view class="page">
    <!-- 顶部头像区 -->
    <view class="header">
      <image class="avatar" src="../../static/1.jpg"></image>
      <view class="name">长期素食</view>
      <view class="role">{{ roleText }}</view>
    </view>

    <!-- 功能菜单 -->
    <view class="content">
      <view class="menu-item" hover-class="menu-hover" @tap="openPage('profile')">
        <view class="icon">👤</view>
        <view class="text">
          <view class="title">个人资料</view>
          <view class="desc">查看和编辑个人信息</view>
        </view>
        <view class="arrow">›</view>
      </view>
      <view class="menu-item" @tap="openPage('notifications')">
        <view class="icon">🔔</view>
        <view class="text">
          <view class="title">消息通知</view>
          <view class="desc">积分变动和系统通知</view>
        </view>
        <view class="arrow">›</view>
      </view>

      <view class="menu-item" @tap="openPage('privacy')">
        <view class="icon">🔒</view>
        <view class="text">
          <view class="title">隐私设置</view>
          <view class="desc">管理数据权限和隐私</view>
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
        <button class="btn" @tap="handleLogout">退出登录</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
// import { useUserStore } from "@/stores/user";

// const userStore = useUserStore();

const avatar = ref("👦");
const name = ref("小明同学");
const roleText = computed(() => {
  switch (userStore.role) {
    case "teacher":
      return "老师";
    case "parent":
      return "家长";
    default:
      return "学生";
  }
});

const menuList = [
  { key: "profile", icon: "👤", title: "个人资料", desc: "查看和编辑个人信息" },
  { key: "notify", icon: "🔔", title: "消息通知", desc: "积分变动和系统通知" },
  { key: "privacy", icon: "🔒", title: "隐私设置", desc: "管理数据权限和隐私" },
  { key: "help", icon: "💡", title: "帮助中心", desc: "常见问题和使用指南" },
];

function openPage(page) {
  alert(`即将打开：${page}`);
}

// function handleClick(key) {
//   uni.navigateTo({ url: `/pages/${key}/index` });
// }

function handleLogout() {
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
    success: (res) => res.confirm && userStore.logout(),
  });
}
</script>

<style scoped>
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

.name {
  font-size: 36rpx;
  font-weight: bold;
  color: white;
  margin-bottom: 8rpx;
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
  margin-top: 60rpx;
  padding: 0 40rpx;
}

.btn {
  width: 100%;
  padding: 30rpx 0;
  background: #fff0f0;
  color: #f44336;
  border: none;
  border-radius: 50rpx;
  font-size: 32rpx;
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

.navbar {
  height: 100rpx;
  background: #fff;
  display: flex;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #666;
}

.nav-item.active {
  color: #667eea;
}

.nav-icon {
  font-size: 40rpx;
  margin-bottom: 6rpx;
}
</style>
