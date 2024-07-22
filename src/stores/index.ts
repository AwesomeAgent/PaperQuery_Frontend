import { createStore } from 'vuex'

import { login as apiLogin } from '@/api/auth'

export interface TokenData {
  access_token: string
  token_type: string
  expire: number
}

export interface User {
  username: string
  password: string
  libraryID: string | ''
  knowledgeID: string | ''
  tokenData: TokenData
}

export type Message = {
  text: string
  sender: 'user' | 'gpt'
}

export const store = createStore({
  state: {
    user: null as User | null,
    selectedText: '',
    messageList: [] as Message[],
  },
  mutations: {
    // 用户身份信息
    setUser(state, user: User | null) {
      state.user = user
      user == null
        ? localStorage.removeItem('user')
        : localStorage.setItem('user', JSON.stringify(user))
    },
    setLibraryID(state, libraryID: string) {
      if (state.user) {
        state.user.libraryID = libraryID
      }
    },
    setSelectedText(state, text) {
      state.selectedText = text
    },
    addMessage(state, message) {
      state.messageList.push(message)
    },
    clearMessage(state) {
      state.messageList = []
    },
  },
  actions: {
    // 用户登录
    async login({ commit }, user) {
      let resp = {
        status: true,
        msg: '',
      }
      // 模拟向后端发送登录请求
      // 这里拿到服务器返回的token
      try {
        const response = await apiLogin(user)
        if (response.status_code !== 200) {
          throw new Error(response.msg)
        }
        const new_user: User = {
          ...user,
          tokenData: response.data,
        }
        commit('setUser', new_user)
      } catch (e: any) {
        // console.error('登录失败', e)
        resp.status = false
        resp.msg = e.message
      }
      return resp
    },
    // 用户退出登录/注销
    logout({ commit }) {
      console.log('退出登录')
      commit('setUser', null)
    },
    updateSelectedText({ commit }, text) {
      commit('setSelectedText', text)
    },
    addMessage({ commit }, message) {
      commit('addMessage', message)
    },
  },
  getters: {
    getUser: (state) => {
      if (!state.user) {
        const user = localStorage.getItem('user')
        if (user) {
          state.user = JSON.parse(user)
        }
      }
      return state.user
    },
    selectedText: (state) => state.selectedText,
    messageList: (state) => state.messageList,
  },
})
