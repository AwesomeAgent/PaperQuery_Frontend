import { createStore } from 'vuex'

export type Message = {
  text: string
  sender: 'user' | 'gpt'
}

export const store = createStore({
  state: {
    selectedText: '',
    translatedText: '',
    messageList: [] as Message[],
    // 对话的上下文
    context: '',
  },
  mutations: {
    setSelectedText(state, text) {
      state.selectedText = text
    },
    setTranslatedText(state, text) {
      state.translatedText = text
    },
    addMessage(state, message) {
      state.messageList.push(message)
    },
    appendMessageByIndex(state, { index, text }) {
      state.messageList[index].text += text
    },
    clearMessage(state) {
      state.messageList = []
    },
    updateContext(state, context) {
      state.context = context
    },
  },
  actions: {
    // 用户退出登录/注销
    logout({ commit }) {
      console.log('退出登录')
      commit('setUser', null)
    },
    updateSelectedText({ commit }, text) {
      commit('setSelectedText', text)
    },
    updateTranslatedText({ commit }, text) {
      commit('setTranslatedText', text)
    },
    addMessage({ commit }, message) {
      commit('addMessage', message)
    },
    updateContext({ commit }, context) {
      commit('updateContext', context)
    },
  },
  getters: {
    selectedText: (state) => state.selectedText,
    translatedText: (state) => state.translatedText,
    messageList: (state) => state.messageList,
    context: (state) => state.context,
  },
})
