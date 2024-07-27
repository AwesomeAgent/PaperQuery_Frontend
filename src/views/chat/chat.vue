<template>
  <div class="border">
    <el-container class="h-full">
      <el-header class="flex items-center justify-between p-4 border-b">
        <h1 class="text-xl font-bold">问答助手</h1>
        <el-button type="default" @click="handleButtonClick">⬇️</el-button>
      </el-header>
      <el-main class="flex">
        <div ref="messagecontainer" class="w-full overflow-y-auto">
          <MessageList />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ElHeader, ElMain, ElContainer } from 'element-plus'
import MessageList from '@/views/chat/MessageList.vue'

const messagecontainer = ref<HTMLElement | null>(null)

const ifBottom = ref(false)

const handleButtonClick = () => {
  ifBottom.value = !ifBottom.value
}

// 自动滑动到聊天框底部
const scrollToBottom = () => {
  if (messagecontainer.value) {
    messagecontainer.value.scrollTop = messagecontainer.value.scrollHeight
  }
}

// 监听回调函数
watch(
  ifBottom,
  (newValue) => {
    console.log('ifBottom changed:', newValue)
    nextTick(() => {
      console.log('nextTick callback')
      scrollToBottom()
    })
  },
  { deep: true, immediate: false },
)
</script>
