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
        <div v-for="item in sidebarItems" :key="item.header" class="px-3 py-2">
          <h3
            v-if="!isCollapsed"
            class="px-4 text-lg font-semibold tracking-tight"
          >
            {{ item.header }}
          </h3>
          <span v-else class="px-4 text-lg font-semibold tracking-tight" />
          <div
            v-for="subItem in item.subItems"
            :key="subItem.title"
            class="mt-2 flex flex-col space-y-1.5"
          >
            <router-link :to="subItem.link" class="flex">
              <Button
                class="justify-start w-full"
                variant="ghost"
                :class="{ 'bg-secondary': subItem.selected }"
                @click="handleButtonClick(subItem)"
              >
                <component
                  :is="subItem.icon"
                  class="h-4 w-4 transition-all duration-1000 ease-in-out"
                />
                <span
                  v-if="!isCollapsed"
                  class="ml-2 transition-all duration-1000 ease-in-out"
                  >{{ subItem.title }}</span
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

const handleButtonClick = (subItem: any) => {
  for (const sidebarItem of sidebarItems) {
    for (const subItem of sidebarItem.subItems) {
      subItem.selected = false
    }
  }
  subItem.selected = true
}
</script>

<style scoped></style>
