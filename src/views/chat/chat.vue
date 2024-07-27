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
import { useStore } from 'vuex'

const store = useStore()

const messagecontainer = ref<HTMLElement | null>(null)

const ifBottom = ref(false)

const handleButtonClick = () => {
  ifBottom.value = !ifBottom.value
}

// 自动滑动到聊天框底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messagecontainer.value) {
      messagecontainer.value.scrollTop = messagecontainer.value.scrollHeight
    }
  })
}

// 监听回调函数
watch(
  ifBottom,
  (newValue) => {
    nextTick(() => {
      scrollToBottom()
    })
  },
  { deep: true, immediate: false },
)

// 监听消息列表变化 滑动到底部
watch(store.getters.messageList, (newValue) => {
  if (newValue) {
    scrollToBottom()
  }
})
</script>
