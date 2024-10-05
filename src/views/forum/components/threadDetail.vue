<!-- 显示帖子详情 -->
<template>
  <div class="flex p-4 w-[750px] overflow-hidden">
    <div
      class="flex-grow flex flex-col bg-white rounded-lg shadow overflow-hidden"
    >
      <div class="flex flex-col p-4 overflow-auto">
        <!-- 帖子标题和作者信息 -->
        <div class="flex justify-between border-b pb-4 mb-4">
          <div>
            <h1 class="text-2xl font-bold mb-2">
              {{ post.title }}
            </h1>
            <div class="text-sm text-gray-600">
              <span>{{ post.username }}</span> -
              <span>{{ formatterTime(post.publishtime_timestamp) }}</span>
            </div>
          </div>
          <div class="flex items-center">
            <Avatar username="" class="h-15 w-15 rounded-sm bg-black mr-4" />
          </div>
        </div>

        <!-- 帖子内容 -->
        <div class="mb-8">
          <p>{{ post.content }}</p>
        </div>

        <!-- 评论部分 -->
        <div class="border-t pt-4">
          <h2 class="text-lg font-semibold mb-4">
            {{ post.comments.length > 0 ? '评论' : '暂无评论' }}
          </h2>
          <div class="space-y-4">
            <!-- 使用 v-for 渲染每个评论 -->
            <div
              v-for="(comment, index) in post.comments"
              :key="index"
              class="border p-4 rounded-lg"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="text-gray-700 font-bold">
                  {{ comment.username }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatterTime(comment.publishtime_timestamp) }}
                </div>
              </div>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
        <!-- 回复输入框 -->
        <div v-if="true" class="mt-4">
          <textarea
            class="w-full p-2 border rounded"
            rows="3"
            placeholder="添加新回复"
            v-model="replyContent"
          ></textarea>
        </div>
        <div>
          <div class="flex justify-between h-20">
            <Button class="px-4 py-2 mt-2 rounded" @click="reply">
              回复
            </Button>
            <Button
              variant="outline"
              class="px-4 py-2 mt-2 rounded"
              @click="goback"
            >
              返回
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getForumPost, postForumComment } from '@/api/forum'
import Button from '@/components/ui/button/Button.vue'
import { formatterTime } from '@/components/utils'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
import Avatar from './avatar.vue'

interface Comment {
  lid: string
  postid: string
  username: string
  content: string
  publishtime_timestamp: string
}

interface PostContent {
  lid: string
  postid: string
  title: string
  content: string
  publishtime_timestamp: string
  updatetime_timestamp: string
  username: string
  comments: Comment[]
}

const route = useRoute()

const router = useRouter()

const postid = route.params.postid as string

const replyContent = ref('')

const buttonList = [
  '技术',
  '生活',
  '学习',
  '创意',
  '好玩',
  '问与答',
  '城市',
  '其他',
]

const post = ref<PostContent>({
  lid: '',
  postid: '',
  title: '',
  content: '',
  publishtime_timestamp: '',
  updatetime_timestamp: '',
  username: '',
  comments: [],
})

onMounted(() => {
  getForumPost(postid)
    .then((res) => {
      // 将返回的数据结构解构，并单独处理 commits
      const { commits, ...otherData } = res.data

      // 赋值时，将 commits 赋值给 comments，其他字段保持原样
      post.value = {
        ...otherData, // 保持其他字段不变
        comments: commits, // 将服务器返回的 commits 赋值给 comments
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

const goback = () => {
  router.go(-1)
}

const reply = () => {
  if (replyContent.value.trim() === '') {
    ElNotification({
      title: '错误',
      message: '回复内容不能为空',
      type: 'error',
      duration: 1000,
    })
    return
  }
  postForumComment(postid, replyContent.value)
    .then(() => {
      ElNotification({
        title: '成功',
        message: '回复成功',
        type: 'success',
        duration: 1000,
      })
      replyContent.value = ''
    })
    .catch((err) => {
      ElNotification({
        title: '错误',
        message: '未知错误',
        type: 'error',
        duration: 3000,
      })
      console.error(err)
    })
}
</script>

<style scoped>
/* 如果有自定义样式需要，可以在这里添加 */
</style>
