// src/hooks/useMessageSender.ts
import { ref } from 'vue'
import { Store } from 'vuex'

interface Message {
  text: string
  sender: 'user' | 'gpt'
}

export function useMessageSender(store: Store<any>) {
  const inputValue = ref('')

  const sendMessage = async (text: string) => {
    if (text) {
      const message: Message = { text, sender: 'user' }
      store.dispatch('addMessage', message)
      // 模拟向后端发送消息请求
      async function sendMessage(text: string) {
        const response: Message = { text: text, sender: 'gpt' }
        // 延时 1s 模拟后端处理
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return response
      }
      const response = await sendMessage(text)
      store.dispatch('addMessage', response)
    }
  }

  const handleFormSubmit = () => {
    if (inputValue.value) {
      sendMessage(inputValue.value)
      inputValue.value = ''
    }
  }

  return {
    inputValue,
    handleFormSubmit,
    sendMessage,
  }
}
