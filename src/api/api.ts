import axios from 'axios'

// 获取环境变量
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

// 创建 Axios 实例
const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
})

// // 添加请求拦截器
// api.interceptors.request.use(
//   (config) => {
//     // 在请求发送之前做些什么，比如添加认证头
//     const token = localStorage.getItem(`token`)
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     // 处理请求错误
//     console.error('Request error:', error)
//     return Promise.reject(error)
//   },
// )

// // 添加响应拦截器
// api.interceptors.response.use(
//   (response) => {
//     // 对响应数据做点什么
//     console.log('Response:', response)
//     return response
//   },
//   (error) => {
//     // 处理响应错误
//     if (error.response) {
//       // 服务器响应了一个状态码，它超出了2xx的范围
//       console.error(
//         'Response error:',
//         error.response.status,
//         error.response.data,
//       )
//       if (error.response.status === 401) {
//         // 处理未授权错误，比如重定向到登录页面
//         console.log('Unauthorized, redirecting to login...')
//         // 示例：假设有一个路由器实例 router
//         router.push('/login')
//       }
//     } else if (error.request) {
//       // 请求已经发出，但没有收到响应
//       console.error('No response received:', error.request)
//     } else {
//       // 其他错误
//       console.error('Error:', error.message)
//     }
//     return Promise.reject(error)
//   },
// )

export default api
