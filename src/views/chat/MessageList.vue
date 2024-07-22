<template>
  <div v-for="(message, index) in messages" :key="index" class="">
    <div
      v-if="message.sender === 'user'"
      class="flex justify-end ml-[25%] mb-5"
    >
      <el-card class="bg-gray-200 p-2 rounded-lg" shadow="hover">{{
        message.text
      }}</el-card>
    </div>
    <div v-else class="flex justify-start mr-[25%] mb-5">
      <el-card class="bg-gray-50 p-2 rounded-lg" shadow="hover">{{
        message.text
      }}</el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus'
import { useStore } from 'vuex'

const store = useStore()

// const messages = ref([
//   {
//     text: 'What are you doing? What are you doing?What are you doing?What are you doing?What are you doing?What are you doing?',
//     sender: 'user',
//   },
//   {
//     text: 'What are you doing? What are you doing?What are you doing?What are you doing?What are you doing?What are you doing?',
//     sender: 'bot',
//   },
//   {
//     text: 'What are you doing? What are you doing?What are you doing?What are you doing?What are you doing?What are you doing?',
//     sender: 'user',
//   },
//   {
//     text: 'What are you doing? What are you doing?What are you doing?What are you doing?What are you doing?What are you doing?',
//     sender: 'bot',
//   },
//   {
//     text: 'What are you doing? What are you doing?What are you doing?What are you doing?What are you doing?What are you doing?',
//     sender: 'user',
//   },
//   {
//     text: 'What are you doing? What are you doing?What are you doing?What are you doing?What are you doing?What are you doing?',
//     sender: 'bot',
//   },
//   { text: 'What are you doing?', sender: 'user' },
//   { text: 'I am working', sender: 'bot' },
//   { text: 'What are you doing?', sender: 'user' },
// ])

const messages = computed(() => store.getters.messageList)

messages.value.push({
  text: '你好！任何问题都可以问我！',
  sender: 'bot',
})

onMounted(() => {
  console.log('你好')
})

onUnmounted(() => {
  // 清空消息列表
  store.commit('clearMessage')
})
</script>

<style scoped></style>
