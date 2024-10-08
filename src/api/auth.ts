// import axios from 'axios'
import { LoginResponse } from '@/types/type'
// import api from '@/api/api'
import axios from 'axios'

export const login = async (url: string, user: any): Promise<LoginResponse> => {
  const api = axios.create({
    baseURL: url,
    timeout: 10000,
  })
  try {
    console.log(url)
    const response = await api.post<LoginResponse>(`/login`, user, {
      headers: {
        // Authorization: 'token 64029ecb13c9dac1df563410cddf6d458c3c7393',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    // 添加header
    const resp = response.data
    if (resp) {
      localStorage.setItem('token', resp.data.access_token)
      localStorage.setItem('username', user.username)
    }
    return response.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}
