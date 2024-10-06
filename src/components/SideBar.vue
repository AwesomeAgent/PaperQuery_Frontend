<template>
  <nav>
    <div
      :class="[' border-border pb-12 lg:block']"
      class="min-w-[20px] transition-all duration-300 ease-in-out w-full"
    >
      <div class="p-4">
        <Button variant="outline" class="w-full justify-center">
          <Avatar class="mr-2 h-5 w-5">
            <AvatarImage src="https://avatar.vercel.sh/personal.png" />
          </Avatar>
          <p class="text-xl font-bold">PaperQuery</p>
        </Button>
      </div>
      <div class="space-y-4 py-4">
        <div v-for="item in sidebarItems" :key="item.title" class="px-3 py-2">
          <h3
            v-if="!isCollapsed"
            class="px-4 text-lg font-semibold tracking-tight"
          >
            {{ item.title }}
          </h3>
          <span v-else class="px-4 text-lg font-semibold tracking-tight" />
          <div class="mt-2 flex flex-col space-y-1.5">
            <router-link :to="item.link" class="flex">
              <Button
                class="justify-start w-full"
                variant="ghost"
                :class="{ 'bg-secondary': selectedItem.title === item.title }"
                @click="selectItem(item)"
              >
                <component
                  :is="item.icon"
                  class="h-4 w-4 transition-all duration-1000 ease-in-out"
                />
                <span
                  v-if="!isCollapsed"
                  class="ml-2 transition-all duration-1000 ease-in-out"
                  >{{ item.title }}</span
                >
              </Button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { sidebarItems } from './utils/sidebar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from '@/components/ui/button'

defineProps({
  isCollapsed: Boolean,
})

const selectItem = (item: any) => {
  selectedItem.value = item
}

const route = useRoute()

const selectedItem = ref(sidebarItems[0])

onMounted(() => {
  // 在加载页面的时候根据当前的路由设置选中的按钮
  console.log(route.path)
  sidebarItems.forEach((item) => {
    if (item.link === route.path) {
      selectedItem.value = item
    }
  })
  if (
    route.path.indexOf('pdfInfo') != -1 ||
    route.path.indexOf('knowledge') != -1
  ) {
    selectedItem.value = sidebarItems[1]
  }

  if (route.path.indexOf('forum') != -1) {
    selectedItem.value = sidebarItems[3]
  }
})
</script>

<style scoped></style>
