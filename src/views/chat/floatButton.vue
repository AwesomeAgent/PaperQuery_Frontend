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
          <el-button type="default" class="w-full">{{ command }}</el-button>
          <!-- {{ command }} -->
        </div>
      </el-card>
      <el-input
        v-model="inputValue"
        placeholder="输入你的问题..."
        class="w-full"
        @input="checkForCommand"
        @keyup.enter="handleInputSubmit"
      />
    </div>
    <el-button type="primary" class="ml-4 px-4 py-2" @click="handleInputSubmit">
      发送
    </el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElInput, ElButton } from 'element-plus'
import { useMessageSender } from '@/views/chat/hooks/useMessageSender'
import { useStore } from 'vuex'

export default {
  name: 'FloatingInput',
  components: {
    ElInput,
    ElButton,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    selectedText: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore()
    const { sendMessage } = useMessageSender(store)

    const inputValue = ref('')
    const showCommandList = ref(false)
    const commands = ref(['翻译', '引用'])

    const handleInputSubmit = () => {
      if (inputValue.value.trim()) {
        console.log(`Sending message: ${inputValue.value}`)
        sendMessage(inputValue.value)
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

    const selectCommand = (command) => {
      inputValue.value = command
      showCommandList.value = false
    }

    return {
      inputValue,
      handleInputSubmit,
      showCommandList,
      commands,
      checkForCommand,
      selectCommand,
    }
  },
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
