<template>
  <div class="bg-gray-100">
    <div class="flex p-4 h-full">
      <!-- 显示所有帖子 -->
      <div class="flex flex-grow-1 h-full p-4">
        <ul
          class="flex-1 flex flex-col gap-2 bg-white rounded-lg shadow overflow-auto"
        >
          <li
            v-for="post in posts"
            :key="post.id"
            @click="
              () => {
                displayDetail = !displayDetail
              }
            "
          >
            <RouterLink
              to="/home/forum/threadDetail"
              class="block hover:bg-gray-100 p-4 rounded"
            >
              <h3 class="text-lg font-bold">{{ post.title }}</h3>
              <p class="text-gray-600 text-sm">
                {{ post.author }} · {{ post.time }}
              </p>
            </RouterLink>
          </li>
        </ul>
      </div>

      <transition name="slide">
        <div v-if="displayDetail" class="flex flex-grow p-4">
          <div class="flex bg-white p-6 rounded-lg shadow">
            <RouterView />
          </div>
        </div>
      </transition>

      <!-- 显示用户信息 -->
      <div class="w-64 p-4 border-r">
        <div class="flex flex-col space-y-2">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-green-500 rounded-full"></div>
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

<script setup>
import Button from '@/components/ui/button/Button.vue'
import post from '../../components/threadPost.vue'
import { ref } from 'vue'

const posts = ref([
  {
    id: 1,
    title: 'How to quickly retrieve flight numbers from an API?',
    author: 'NoOneNoBody',
    time: '32 minutes ago',
  },
  {
    id: 2,
    title: 'How to retrieve keywords from META tags',
    author: 'billc2024',
    time: '50 minutes ago',
  },
  {
    id: 3,
    title: 'How to turn off MIUI splash screen?',
    author: 'LZWRDWEB',
    time: '19 minutes ago',
  },
  {
    id: 4,
    title: 'SQL performance optimization techniques',
    author: 'cs5117155',
    time: '26 minutes ago',
  },
  {
    id: 5,
    title: 'How to turn off MIUI splash screen?',
    author: 'pinoc012',
    time: '13 minutes ago',
  },
  {
    id: 6,
    title: 'How to turn off MIUI splash screen?',
    author: 'NoOneNoBody',
    time: '28 minutes ago',
  },
  {
    id: 7,
    title: 'How to analyze the CPU requirements?',
    author: 'HuPu',
    time: '28 minutes ago',
  },
  {
    id: 8,
    title: 'How to retrieve keywords from META tags',
    author: 'LOL',
    time: '16 minutes ago',
  },
  {
    id: 9,
    title: 'Understanding WebSocket in real-time apps',
    author: 'drymonfieldia',
    time: '34 minutes ago',
  },
  {
    id: 10,
    title: 'Exploring Rust programming in systems design',
    author: '3kkdd',
    time: '13 minutes ago',
  },
  {
    id: 11,
    title: 'Is Flutter still relevant in 2024?',
    author: 'lisongeee',
    time: '44 minutes ago',
  },
  {
    id: 12,
    title: "Learning React in 2024: What's new?",
    author: 'cs5117155',
    time: '42 minutes ago',
  },
  {
    id: 13,
    title: 'How to retrieve keywords from META tags',
    author: 'LOL',
    time: '29 minutes ago',
  },
  {
    id: 14,
    title: 'Windows 11 Enterprise LTSC 2024 Update',
    author: 'jackmod',
    time: '15 minutes ago',
  },
  {
    id: 15,
    title: "Learning React in 2024: What's new?",
    author: 'billc2024',
    time: '31 minutes ago',
  },
  {
    id: 16,
    title: 'Windows 11 Enterprise LTSC 2024 Update',
    author: 'LOL',
    time: '50 minutes ago',
  },
  {
    id: 17,
    title: 'How to analyze the CPU requirements?',
    author: 'billc2024',
    time: '56 minutes ago',
  },
  {
    id: 18,
    title: 'Claude is open, but is it useful?',
    author: 'cs5117155',
    time: '19 minutes ago',
  },
  {
    id: 19,
    title: 'SQL performance optimization techniques',
    author: 'Tiger5',
    time: '29 minutes ago',
  },
  {
    id: 20,
    title: 'SQLServer migrating to MySQL, 1W+DB solution',
    author: 'guiyiminn',
    time: '17 minutes ago',
  },
])

const postQuestion = () => {
  // 显示发布帖子的对话框
}

const displayDetail = ref(false)
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
