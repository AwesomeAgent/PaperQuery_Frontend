<template>
  <div class="bg-gray-100">
    <div class="flex p-4 h-full w-full justify-center">
      <!-- 显示所有帖子 -->
      <RouterView />

      <!-- 显示用户信息 -->
      <div class="w-64 p-4 border-r">
        <div class="flex flex-col space-y-2">
          <div class="flex items-center space-x-4">
            <Avatar username="hoyi" class="h-10 w-10 rounded-sm bg-black" />
            <div>
              <p class="font-bold">hoyiyang</p>
              <p class="text-xs text-gray-500">0 未读提醒</p>
            </div>
          </div>
          <post />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import post from '../../components/threadPost.vue'
import { ref } from 'vue'
import { getForumPosts } from '@/api/forum'
import Avatar from '../../components/avatar.vue'

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

onMounted(() => {
  // 获取所有帖子
  getForumPosts().then((res) => {
    posts.value = res.data
  })
})

// 列表：存储所有帖子
const posts = ref<Post[]>([])
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
