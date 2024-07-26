// src/hooks/useMessageSender.ts
import { Store } from 'vuex'
import { askQuestion } from '@/api/data'
import { type ChatRequest } from '@/types/type'

export function useMessageSender(store: Store<any>) {
  const sendMessage = async (chatRequest: ChatRequest) => {
    // 添加消息到消息列表
    store.dispatch('addMessage', { text: chatRequest.input, sender: 'user' })
    try {
      // 问答助手 发送消息
      const resp = await askQuestion(chatRequest)
      if (resp) {
        // 添加消息到消息列表
        store.dispatch('addMessage', { text: resp.data.output, sender: 'gpt' })
        store.dispatch('updateContext', resp.data.context)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    sendMessage,
  }
}
