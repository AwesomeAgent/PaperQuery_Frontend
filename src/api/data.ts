import api from '@/api/api'

export const getLibraryInfo = async () => {
  // 向后端请求 libraryInfo
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
  token: string,
  knowledgeName: string,
  knowledgeDescription?: string,
) => {
  // 模拟向后端请求创建知识
  // 后端返回知识ID
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status_code: 200,
        msg: '创建知识成功',
        data: {
          knowledgeID: '3',
          knowledgeName: knowledgeName,
          knowledgeDescription: knowledgeDescription,
        },
      })
    }, 1000)
  })
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
