// 获取缓存里的登录信息
const loginRes = wx.getStorageSync('data') || {};
const role = loginRes.role || 'student';

// 角色对应的 tab 列表
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
};

Page({
  data: {
    tabList: roleTabListMap[role] || [],
    currentPath: '',          // 当前页面路径
  },

  onLoad() {
    // 获取当前页面路径
    const pages = getCurrentPages();
    const curPage = pages[pages.length - 1];
    const route = curPage.route || '';
    this.setData({ currentPath: route });
  },

  // 点击 tab 切换
  switchTab(e) {
    const path = e.currentTarget.dataset.path;
    wx.switchTab({ url: `/${path}` });
  },
});