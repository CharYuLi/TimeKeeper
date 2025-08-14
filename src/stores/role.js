import { ref } from 'vue';

// 创建全局角色状态
const role = ref('');

// 尝试从本地存储加载角色
try {
  const storedRole = uni.getStorageSync('role');
  if (storedRole) {
    role.value = storedRole;
  }
} catch (e) {
  console.error('读取角色信息失败', e);
}

// 设置角色的方法
const setRole = (newRole) => {
  role.value = newRole;
  
  try {
    uni.setStorageSync('role', newRole);
  } catch (e) {
    console.error('保存角色信息失败', e);
  }
  
  // 触发全局事件通知角色变化
  uni.$emit('roleUpdated', newRole);
};

// 重置角色的方法
const resetRole = () => {
  setRole('');
};

// 暴露给其他组件使用的接口
export const useRoleStore = () => {
  return {
    role,
    setRole,
    resetRole
  };
};