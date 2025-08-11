<template>
  <view class="tab-bar">
    <view
      v-for="(item, index) in tabList"
      :key="index"
      class="tab-item"
      @click="switchTab(item)"
    >
      <!-- <image
        class="tab-icon"
        :src="currentPath === item.pagePath ? item.selectedIconPath : item.iconPath"
      /> -->
      <text :class="{ active: currentPath === item.pagePath }">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const loginRes = uni.getStorageSync('data') || {}
const role = loginRes.role || 'student'

const currentPath = ref(getCurrentPages()[0]?.route || '')

const roleTabListMap = {
  student: [
    { pagePath: 'pages/index/index', text: '首页' },
    { pagePath: 'pages/points/points', text: '积分' },
    { pagePath: 'pages/logsPage/logs', text: '日志' },
    { pagePath: 'pages/activities/activities', text: '活动' },
    { pagePath: 'pages/mine/mine', text: '我的' },
  ],
  teacher: [
    { pagePath: 'pages/index/index', text: '首页' },
    { pagePath: 'pages/managenment/managenment', text: '管理' },
    { pagePath: 'pages/photoUpload/photoUpload', text: '照片' },
    { pagePath: 'pages/mine/mine', text: '我的' },
  ],
}

const tabList = computed(() => roleTabListMap[role] || [])

function switchTab(item) {
  uni.switchTab({ url: `/${item.pagePath}` })
}
</script>

<style scoped>
.tabbar{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  background: #fff;
  border-top: 1px solid #eee;
}
.item{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
.item img{
  width: 24px;
  height: 24px;
}
.item.active{
  color: #1989fa;
}
</style>