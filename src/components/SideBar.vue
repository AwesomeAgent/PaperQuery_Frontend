<template>
  <div class="w-full h-screen bg-white-800 text-black flex flex-col border">
    <div class="p-4 text-3xl font-bold">PaperQuery</div>
    <nav class="flex-1">
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.name"
          class="px-4 py-2 hover:bg-gray-100 text-3xl font-bold"
        >
          <router-link :to="item.route">
            <div class="flex items-center space-x-2 z-40 h-full">
              <div>
                <component
                  :is="resolveComponent(item.icon)"
                  :size="item.size"
                />
              </div>
              <span text-xl>{{ item.name }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { IconLayoutDashboard, IconChecklist } from '@tabler/icons-vue'

const menuItems = ref([
  {
    name: '控制台',
    route: '/home/dashboard',
    icon: 'IconLayoutDashboard',
    size: '23',
  },
  {
    name: '知识库',
    route: '/home/library',
    icon: 'IconChecklist',
    size: '23',
  },
])

const iconComponents = {
  IconLayoutDashboard,
  IconChecklist,
}

const resolveComponent = (name: string) => {
  return iconComponents[name as keyof typeof iconComponents]
}
</script>

<style scoped>
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  transition: background-color 0.3s;
}
</style>
