<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useMessageSender } from '@/views/chat/hooks/useMessageSender'
import { useStore } from 'vuex'
import { defineProps } from 'vue'
import { type ChatRequest } from '@/types/type'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  selectedText: {
    type: String,
    required: true,
  },
  knowledgeID: {
    type: String,
    required: true,
  },
  documentID: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
})

const store = useStore()
const { sendMessage } = useMessageSender(store)

const inputValue = ref('')
const sending = ref(false)

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    if (e.shiftKey) {
      // Shift + Enter 换行
      // e.preventDefault()
      inputValue.value += '\n'
      console.log('换行')
    } else if (!e.shiftKey) {
      e.preventDefault()
      // Enter 发送消息
      // 防止重复发送
      if (sending.value) return
      handleInputSubmit()
    }
  }
}

// 发送消息
const handleInputSubmit = () => {
  // console.log(props.page)
  if (inputValue.value.trim()) {
    const chatRequest: ChatRequest = {
      question: inputValue.value.trim(),
      ref: {
        knowledgeID: props.knowledgeID,
        documentID: props.documentID,
        selectedText: props.selectedText,
        page: props.page,
      },
      context: store.state.context,
    }
    sending.value = true
    sendMessage(chatRequest).then(() => {
      sending.value = false
    })
    inputValue.value = ''
  }
}

const scrollToBottom = () => {
  const textarea = document.getElementById('textarea_id')
  nextTick(() => {
    if (!textarea) return
    textarea.scrollTop = textarea.scrollHeight
  })
}
</script>

<template>
  <div
    v-if="isVisible"
    class="floating-input fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-96 h-14 shadow-lg flex items-center p-4"
  >
    <div class="relative w-full flex items-center">
      <Textarea
        id="textarea_id"
        v-model="inputValue"
        placeholder="输入你的问题..."
        rows="1"
        class="custom-textarea w-full h-10"
        @input="scrollToBottom"
        @keydown="handleKeyDown"
      />
    </div>
    <Button
      variant="default"
      class="ml-4 px-4 py-2"
      :disabled="!inputValue || sending"
      @click="handleInputSubmit"
      >发送</Button
    >
  </div>
</template>

<style scoped>
.floating-input {
  z-index: 1000;
}

.el-card {
  padding: 0 !important;
}

.custom-textarea {
  min-height: 0; /* 确保没有最小高度限制 */
  padding: 0.5rem; /* 去除内边距 */
  resize: none; /* 防止用户调整大小 */
}
</style>
