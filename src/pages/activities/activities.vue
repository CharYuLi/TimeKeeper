<template>
  <view class="page">
    <!-- 顶部栏 -->
    <view class="header">
      <view class="title">活动</view>
    </view>

    <!-- 加载状态 -->
    <view v-if="loading" class="loading">
      <view class="loading-icon">加载中...</view>
    </view>

    <!-- 错误提示 -->
    <view v-if="error" class="error" @tap="fetchData">
      <view class="error-icon">加载失败，点击重试</view>
    </view>

    <!-- 活动列表 -->
    <scroll-view class="list" scroll-y>
      <!-- 空状态 -->
      <view v-if="renderList.length === 0" class="empty">
        暂无活动数据
      </view>
      <view v-for="item in renderList" :key="item.id" class="card" @tap="openDetail(item.id)">
        <image :src="item.image" mode="aspectFill" class="card-img" />
        <view class="card-info">
          <view class="card-title">{{ item.title }}</view>
          <view class="card-date">{{ item.date }}</view>
          <view class="card-location">{{ item.location }}</view>
          <view class="card-price">{{ item.price }}</view>
          <view class="card-status">{{ item.status }}</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

/* 静态数据（示例） */
const activityList = [
  {
    id: 1,
    title: '深业上城会员体验日',
    date: '2025-07-12 09:00-17:00',
    location: '笔架山体育公园1号足球场',
    price: '免费',
    status: '已截止',
    image: 'https://dummyimage.com/375x180/667eea/fff&text=深业上城'
  },
  {
    id: 2,
    title: '校园开放日',
    date: '2025-06-16 09:00-12:00',
    location: '深圳哈罗外籍人士子女学校',
    price: '免费',
    status: '已截止',
    image: 'https://dummyimage.com/375x180/764ba2/fff&text=校园开放日'
  }
];

/* 状态 */
const activeTab = ref('all');
const activeFilter = ref('all');

/* 计算属性：渲染列表 */
const renderList = computed(() =>
  activityList.filter(item => {
    const matchTab = activeTab.value === 'all' || item.price === activeTab.value;
    const matchFilter = activeFilter.value === 'all' || item.price === activeFilter.value;
    return matchTab && matchFilter;
  })
);

/* 事件 */
function switchTab(key) { activeTab.value = key; }
function filterList(key) { activeFilter.value = key; }
function openDetail(id) { uni.navigateTo({ url: `/pages/activities/actDetails?id=${id}` }); }
function join(id) { uni.navigateTo({ url: `/pages/activity/detail?id=${id}` }); }
function share(id) { uni.share({ title: '活动分享', path: `/pages/activity/detail?id=${id}` }); }
function publish() { uni.navigateTo({ url: '/pages/activity/publish' }); }
function goPage(page) { uni.switchTab({ url: `/pages/${page}/index` }); }

</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  max-width: 375px;
  margin: 0 auto;
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

.list {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  overflow-y: auto;
  width: auto !important;
}

.card {
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20rpx;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.card-img {
  width: 100%;
  height: 240rpx;
  object-fit: cover;
}

.card-info {
  padding: 20rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.card-date,
.card-location {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 4rpx;
}

.card-price {
  font-size: 32rpx;
  color: #667eea;
}

.card-status {
  font-size: 28rpx;
  color: #f44336;
}
</style>