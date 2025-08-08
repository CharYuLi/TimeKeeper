<template>
  <view v-if="visible" class="modal" @click.self="closeModal">
    <view class="modal-content">
      <span class="close-btn" @click="closeModal">×</span>
      <h3 style="color: #667eea;">{{ isAdd ? '加分' : '减分' }}</h3>

      <!-- 加减切换 -->
      <view class="toggle-row">
        <view
          class="toggle-btn"
          :class="{ active: isAdd }"
          @click="isAdd = true"
        >加分</view>
        <view
          class="toggle-btn"
          :class="{ active: !isAdd }"
          @click="isAdd = false"
        >减分</view>
      </view>

      <!-- 表单 -->
      <view class="form-group">
        <label>积分</label>
        <textarea
          v-model.number="points"
          type="number"
          class="input"
          placeholder="请输入整数"
        />
      </view>

      <view class="form-group">
        <label>标题</label>
        <textarea v-model.trim="title" class="input" placeholder="例如：完成数学作业" />
      </view>

      <view class="form-group">
        <label>具体描述（可选）</label>
        <textarea
          v-model.trim="desc"
          class="textarea"
          placeholder="积分变动原因..."
        />
      </view>

      <!-- 按钮组 -->
      <view class="btn-group">
        <button class="btn btn-secondary" @click="closeModal">取消</button>
        <button class="btn btn-primary" @click="confirm">保存</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({ visible: Boolean })
const emit = defineEmits(['update:visible', 'confirm'])

const isAdd = ref(true)
const points = ref('')
const title = ref('')
const desc = ref('')

watch(() => props.visible, (v) => { if (v) resetForm() })

function closeModal()  { emit('update:visible', false) }
function confirm() {
  if (!title.value) return alert('请输入标题')
  emit('confirm', {
    title: title.value,
    desc: desc.value,
    points: isAdd.value ? Math.abs(points.value) : -Math.abs(points.value)
  })
  closeModal()
}
function resetForm() {
  isAdd.value = true
  points.value = ''
  title.value = ''
  desc.value = ''
}
</script>

<style scoped>
/* 与父组件 modal 完全一致的类名 & 样式 */
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

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.toggle-row {
  display: flex;
  margin: 15px 0;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #667eea;
}

.toggle-btn {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  color: #667eea;
  background: #fff;
  transition: all 0.3s;
}

.toggle-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
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

.input{
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  max-height: 45px;
}

.textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
}

.textarea {
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

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>