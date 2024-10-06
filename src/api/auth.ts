// import axios from 'axios'
import { LoginResponse } from '@/types/type'
import api from '@/api/api'

export const login = async (user: any): Promise<LoginResponse> => {
  try {
    console.log(import.meta.env.VITE_API_BASE_URL)
    const response = await api.post<LoginResponse>('/login', user)
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
