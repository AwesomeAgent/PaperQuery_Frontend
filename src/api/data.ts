import api from '@/api/api'
import { type ChatRequest } from '@/types/type'

export const getLibraryInfo = async () => {
  // 向后端请求获取知识库信息
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const resp = await api.get('/knowledges/getLibraryInfo', {
      headers: {
        Authorization: token,
      },
    })
    return resp.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}

export const getKnowledgeList = async () => {
  // 向后端请求获取知识列表
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const resp = await api.get('/knowledges/getKnowledgeList', {
      headers: {
        Authorization: token,
      },
    })
    return resp.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}

export const createKnowledge = async (
  knowledgeName: string,
  knowledgeDescription?: string,
) => {
  // 向后端请求创建知识
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const data = {
      knowledgeName: knowledgeName,
      knowledgeDescription: knowledgeDescription,
    }
    const resp = await api.post('/knowledges/createKnowledge', data, {
      headers: {
        Authorization: token,
      },
    })
    return resp.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}

export const editKnowledge = async (
  token: string,
  knowledgeID: string,
  knowledgeName: string,
  knowledgeDescription?: string,
): Promise<{}> => {
  // 模拟向后端请求编辑知识
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status_code: 200,
        msg: '编辑知识成功',
        data: {
          knowledgeID: knowledgeID,
          knowledgeName: knowledgeName,
          knowledgeDescription: knowledgeDescription,
        },
      })
    }, 1000)
  })
}

export const getDocumentList = async (knowledgeID: string) => {
  // 向后端请求获取文档列表
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const params = {
      knowledgeID: knowledgeID,
    }
    const resp = await api.get(`/document/getDocumentList`, {
      headers: {
        Authorization: token,
      },
      params: params,
    })
    return resp.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}

export const uploadDocument = async (knowledgeID: string, file: File) => {
  // 向后端请求上传文档
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const formData = new FormData()
    formData.append('knowledgeID', knowledgeID)
    formData.append('documentFile', file)
    const resp = await api.post('/document/upload', formData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    })
    return resp.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}

// 获取单个文档状态
export const getDocumentInfo = async (
  knowledgeID: string,
  documentID: string,
) => {
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const params = {
      knowledgeID: knowledgeID,
      documentID: documentID,
    }
    const resp = await api.get('/document/Info', {
      headers: {
        Authorization: token,
      },
      params: params,
    })
    return resp.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}

// 获取文档pdf文件
export const getDocumentFile = async (
  knowledgeID: string,
  documentID: string,
) => {
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const params = {
      knowledgeID: knowledgeID,
      documentID: documentID,
    }
    const resp = await api.get('/document/getFile', {
      headers: {
        Authorization: token,
      },
      params: params,
    })
    return resp.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}

// 删除文档 API接口
export const deleteDocument = async (
  knowledgeID: string,
  documentID: string,
) => {
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const data = {
      knowledgeID: knowledgeID,
      documentID: documentID,
    }
    const resp = await api.post('/document/delete', data, {
      headers: {
        Authorization: token,
      },
    })
    return resp.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}

// 翻译 API接口
export const translateText = async (text: string) => {
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const data = { text: text }
    const resp = await api.post('/translate', data, {
      headers: {
        Authorization: token,
      },
    })
    return resp.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}

// 发送消息 API接口
export const askQuestion = async (req: ChatRequest) => {
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const data = req
    const resp = await api.post('/chat/generate', data, {
      headers: {
        Authorization: token,
      },
    })
    return resp.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}

// 获取gpt流式消息 API接口
export const askQuestionStream = async (req: ChatRequest, store: any) => {
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const url = import.meta.env.VITE_API_BASE_URL
    const response = await fetch(`${url}/chat/generate_flow`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token as string,
      },
    })

    if (!response.body) {
      throw new Error('Network response was not ok')
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder('utf-8')
    let result = ''
    const message = { text: '', sender: 'bot' }
    store.commit('addMessage', message)
    const messageIndex = store.state.messageList.length - 1
    while (true) {
      const { done, value } = await reader!.read()
      if (done) break
      const chunk = parsePack(decoder.decode(value, { stream: true })) as any
      result += chunk
      // console.log(chunk)
      // 不断更新消息到消息列表
      store.commit('appendMessageByIndex', {
        index: messageIndex,
        text: chunk,
      })
    }
    return result
  } catch (e: any) {
    throw new Error(e.message || 'Error fetching stream')
  }
}

// 解析消息格式
const parsePack = (str: string) => {
  const dataPattern = /({.*?})/g
  let match
  const dataList = []

  while ((match = dataPattern.exec(str)) !== null) {
    try {
      const json = JSON.parse(match[1])
      if (json.data) {
        dataList.push(json.data)
      }
    } catch (e) {
      console.log('JSON parse error: ', e)
    }
  }

  return dataList.join('')
}

// 获取记忆力上下文 API接口
export const getMemoryContext = async (
  question: string,
  context: string,
  answer: string,
) => {
  try {
    let token = localStorage.getItem('token')
    if (token) {
      token = `Bearer ${token}`
    }
    const data = {
      question: question,
      context: context,
      answer: answer,
    }
    const resp = await api.post('chat/summarize', data, {
      headers: {
        Authorization: token,
      },
    })
    return resp.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}
