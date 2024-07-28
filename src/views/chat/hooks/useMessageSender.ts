// src/hooks/useMessageSender.ts
import { Store } from 'vuex'
import { askQuestionStream, getMemoryContext } from '@/api/data'
import { type ChatRequest } from '@/types/type'

export function useMessageSender(store: Store<any>) {
  const sendMessage = async (chatRequest: ChatRequest) => {
    // 添加消息到消息列表
    store.dispatch('addMessage', { text: chatRequest.question, sender: 'user' })
    try {
      // 问答助手 发送消息
      const resp = await askQuestionStream(chatRequest, store)
      return resp
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const updateContext = async (
    question: string,
    answer: string,
    context: string,
  ) => {
    try {
      // 获取记忆力上下文
      const resp = await getMemoryContext(question, context, answer)
      return resp.data
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return {
    sendMessage,
    updateContext,
  }
}
