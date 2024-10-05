<!-- 发布帖子组件 -->
<template>
  <Dialog :open="isDialogOpen">
    <DialogTrigger as-child
      ><Button
        variant="outline"
        class="font-bold"
        @click="
          () => {
            isDialogOpen = true
          }
        "
        >发布帖子</Button
      >
    </DialogTrigger>
    <DialogContent class="sm:max-w-4xl">
      <DialogHeader>
        <DialogTitle>创建新主题</DialogTitle>
        <DialogDescription>
          请输入主题标题，如果标题能够表达完整内容，则正文可以为空
        </DialogDescription>
      </DialogHeader>

      <!-- Post Form -->
      <div class="grid gap-4 py-4">
        <!-- Title Input -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="postTitle" class="text-right">标题</Label>
          <Input
            id="postTitle"
            v-model="post.title"
            placeholder="请输入主题标题"
            class="col-span-3"
            required
          />
        </div>

        <!-- Text Editor (for Post Content) -->
        <div class="grid grid-cols-4 items-start gap-4">
          <Label class="text-right pt-2">正文</Label>
          <div class="col-span-3">
            <textarea
              v-model="post.content"
              placeholder="请输入正文"
              class="w-full h-48 p-2 border rounded-md"
            ></textarea>

            <!-- Syntax options (tabs) -->
            <div class="flex space-x-4 mt-2">
              <Button variant="outline">Syntax</Button>
              <Button variant="outline">V2EX 原生格式</Button>
              <Button variant="outline">Markdown</Button>
            </div>
          </div>
        </div>

        <!-- Topic Dropdown -->
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="topic" class="text-right">主题节点</Label>
          <select
            id="topic"
            v-model="post.topic"
            class="col-span-3 p-2 border rounded-md"
            required
          >
            <option value="">请选择一个节点</option>
            <option value="programming">编程</option>
            <option value="technology">科技</option>
            <option value="life">生活</option>
          </select>
        </div>
      </div>

      <!-- Post and Cancel Buttons -->
      <DialogFooter>
        <Button type="submit" @click="submitPost">发布</Button>
        <DialogTrigger>
          <Button variant="outline" @click="closeDialog">取消</Button>
        </DialogTrigger>
        <!-- <Button type="button" @click="closeDialog">取消</Button> -->
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ElNotification } from 'element-plus'
import { postForumPost } from '@/api/forum'

const isDialogOpen = ref(false)

const post = ref({
  title: '',
  content: '',
  topic: '',
})

const submitPost = () => {
  if (post.value.title.trim() === '' || post.value.content.trim() === '') {
    ElNotification({
      title: '错误',
      message: '标题和主题节点为必填项',
      type: 'error',
      duration: 3000,
    })
    // alert('标题和主题节点为必填项')
    return
  }

  // You can replace this with the actual function to save the post
  console.log('Post submitted:', post.value)
  postForumPost(post.value.title, post.value.content)
    .then((res) => {
      closeDialog()
      ElNotification({
        title: '成功',
        message: '帖子发布成功',
        type: 'success',
        duration: 3000,
      })
    })
    .catch((err) => {
      ElNotification({
        title: '错误',
        message: '帖子发布失败',
        type: 'error',
        duration: 3000,
      })
      console.error(err)
    })
}

const closeDialog = () => {
  console.log('closeDialog')
  isDialogOpen.value = false
  // Reset post content when closing the dialog
  post.value.title = ''
  post.value.content = ''
  post.value.topic = ''
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
