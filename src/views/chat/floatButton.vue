<template>
  <div
    v-if="isVisible"
    class="floating-input fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-96 h-14 shadow-lg flex items-center p-4"
  >
    <div class="relative w-full">
      <el-card
        v-if="showCommandList"
        :body-style="{ padding: '10px' }"
        class="el-card command-list absolute bottom-full mb-2 bg-white border rounded shadow-lg w-full"
      >
        <div
          v-for="(command, index) in commands"
          :key="index"
          class="p-1 cursor-pointer hover:bg-gray-100"
          @click="selectCommand(command)"
        >
          <Button variant="outline" class="w-full">{{ command }}</Button>
        </div>
      </el-card>
      <Input
        v-model="inputValue"
        placeholder="输入你的问题..."
        class="w-full"
        @input="checkForCommand"
        @keyup.enter="handleInputSubmit"
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

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
const showCommandList = ref(false)
const commands = ref(['翻译', '引用'])
const sending = ref(false)

const handleInputSubmit = () => {
  // console.log(props.page)
  if (inputValue.value.trim()) {
    const chatRequest: ChatRequest = {
      input: inputValue.value.trim(),
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
    showCommandList.value = false
  }
}

const checkForCommand = () => {
  if (inputValue.value.includes('/')) {
    showCommandList.value = true
  } else {
    showCommandList.value = false
  }
}

const selectCommand = (command: any) => {
  inputValue.value = command
  showCommandList.value = false
}
</script>

<style scoped>
.floating-input {
  z-index: 1000;
}

.command-list {
  z-index: 1001;
  max-height: 200px;
  overflow-y: auto;
}

.command-list li {
  list-style: none;
}
.el-card {
  padding: 0 !important;
}
</style>
