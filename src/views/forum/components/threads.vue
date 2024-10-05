<template>
  <div class="flex p-4 w-[750px] overflow-hidden">
    <div
      class="flex-1 flex flex-col bg-white rounded-lg shadow overflow-hidden"
    >
      <div class="flex justify-start p-2">
        <div v-for="(button, index) in buttonList" :key="index" class="m-2">
          <!-- 判断第一个按钮设置 variant 为 outline，其他设置为 default -->
          <Button :variant="index === 0 ? 'default' : 'outline'">
            {{ button }}
          </Button>
        </div>
      </div>
      <ul class="flex-1 flex flex-col overflow-auto">
        <li
          v-for="post in posts"
          :key="post.postid"
          @click="
            () => {
              console.log(post.postid)
              router.push({
                name: 'threadDetail',
                params: { postid: post.postid },
              })
            }
          "
        >
          <div class="flex hover:bg-gray-100 p-4 rounded border items-center">
            <Avatar username="" class="h-10 w-10 rounded-sm bg-black mr-4" />
            <div>
              <h3 class="text-lg font-bold">{{ post.title }}</h3>
              <p class="text-gray-600 text-sm">
                {{ post.username }} ·
                {{ formatterTime(post.publishtime_timestamp) }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getForumPosts } from '@/api/forum'
import { formatterTime } from '@/components/utils'
import { Button } from '@/components/ui/button'
import Avatar from './avatar.vue'

// 定义post 结构体
interface Post {
  postid: string
  title: string
  content: string
  publishtime_timestamp: string
  updatetime_timestamp: string
  lid: string
  username: string
}

// 列表：存储所有帖子
const posts = ref<Post[]>([])

const router = useRouter()

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

onMounted(() => {
  // 获取所有帖子
  getForumPosts().then((res) => {
    posts.value = res.data
  })
})
</script>

<style scoped>
/* 定义进入和离开的滑动效果 */
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 1s ease,
    opacity 1s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to,
.slide-leave {
  transform: translateX(0);
  opacity: 1;
}
</style>
