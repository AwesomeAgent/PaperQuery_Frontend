<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ElNotification } from 'element-plus'
import { login } from '@/api/auth'

const username = ref('')
const password = ref('')
const router = useRouter()

const url = ref('http://localhost:8000')

// 向后端发送登录请求并将用户信息存储到 Vuex 和 localStorage 中
const Login = async () => {
  const user = {
    username: username.value,
    password: password.value,
  }

  try {
    await login(url.value, user)
    ElNotification({
      title: '登录成功',
      type: 'success',
    })
    router.push('/home')
  } catch (error) {
    if (error instanceof Error) {
      ElNotification({
        title: '登录失败',
        type: 'error',
        message: error.message,
      })
      console.error('登录失败:', error)
    } else {
      // 处理非 Error 对象的情况
      ElNotification({
        title: '登录失败',
        type: 'error',
        message: '发生未知错误',
      })
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen">
    <Card class="w-[350px]">
      <form @submit.prevent="Login">
        <CardHeader>
          <CardTitle>PaperQuery</CardTitle>
        </CardHeader>

        <CardContent>
          <div class="grid items-center w-full gap-4">
            <!-- <div class="flex flex-col space-y-1.5">
              <Label for="url">网址</Label>
              <Input id="url" v-model="url" placeholder="url" required />
            </div> -->
            <div class="flex flex-col space-y-1.5">
              <Label for="username">用户名</Label>
              <Input
                id="username"
                v-model="username"
                placeholder="username"
                required
              />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="password">密码</Label>
              <Input
                id="password"
                v-model="password"
                type="password"
                placeholder="password"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button variant="outline"> 忘记密码 </Button>
          <Button type="submit"> 登录 </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>

<style scoped></style>
