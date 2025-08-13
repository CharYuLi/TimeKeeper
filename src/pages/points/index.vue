<template>
  <component :is="currentCp" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Points from './points.vue'
import Management from './management.vue'

// 1. 先从接口 /storage 取 role，这里先 mock
const role = ref('')

onMounted(async () => {
  // 真实环境：await uni.request({ url:'/api/me' })
  // 这里直接读 storage 方便演示
  role.value = uni.getStorageSync('data.role') || 'teacher'
})

// 2. 映射表
const roleMap = {
  student: Points,
  teacher: Management
}

// 3. 当前要渲染的组件
const currentCp = computed(() => roleMap[role.value] || Points)
</script>