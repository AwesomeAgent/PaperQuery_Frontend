// import axios from 'axios'
import { LoginResponse } from '@/types/api'
import api from '@/api/api'

export const login = async (user: any): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', user)
    return response.data
  } catch (e: any) {
    throw new Error(e.response.data.msg)
  }
}
