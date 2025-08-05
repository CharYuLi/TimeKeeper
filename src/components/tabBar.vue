<template>
  <footer class="tabbar">
    <div
      v-for="tab in tabs"
      :key="tab.path"
      :class="{item: true, active: $route.path === tab.path}"
      @click="$router.replace(tab.path)"
    >
      <img :src="$route.path === tab.path ? tab.iconActive : tab.icon" />
      <span>{{ tab.text }}</span>
    </div>
  </footer>
</template>

<script setup>
const tabs = [
  { path: '/',        text: '首页',   icon: '/tab-home.png',   iconActive: '/tab-home-a.png' },
  { path: '/category',text: '分类',   icon: '/tab-cate.png',   iconActive: '/tab-cate-a.png' },
  { path: '/cart',    text: '购物车', icon: '/tab-cart.png',   iconActive: '/tab-cart-a.png' },
  { path: '/user',    text: '我的',   icon: '/tab-user.png',   iconActive: '/tab-user-a.png' }
]
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