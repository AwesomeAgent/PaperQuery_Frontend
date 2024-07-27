<template>
  <div v-for="(message, index) in messages" :key="index" class="">
    <div
      v-if="message.sender === 'user'"
      class="flex justify-end ml-[25%] mb-5"
    >
      <el-card class="bg-gray-200 p-2 rounded-lg" shadow="hover">
        <div v-html="renderMarkdown(message.text)" />
      </el-card>
    </div>
    <div v-else class="flex justify-start mr-[25%] mb-5">
      <el-card class="bg-gray-50 p-2 rounded-lg" shadow="hover"
        ><div v-html="renderMarkdown(message.text)"
      /></el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus'
import { useStore } from 'vuex'
import MarkdownIt from 'markdown-it'

const md: MarkdownIt = new MarkdownIt({
  breaks: true,
})

const renderMarkdown = (text: string) => {
  return md.render(text)
}

const store = useStore()

const messages = computed(() => store.getters.messageList)

messages.value.push({
  text: '**你好！任何问题都可以问我！**',
  sender: 'bot',
})

onMounted(() => {})

onUnmounted(() => {
  // 清空消息列表
  store.commit('clearMessage')
})
</script>

<style scoped></style>
