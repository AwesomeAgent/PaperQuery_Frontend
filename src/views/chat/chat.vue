<template>
  <div class="flex h-screen overflow-hidden">
    <!-- <SideBar class="flex-none w-1/6"></SideBar> -->
    <Content class="flex-grow" />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import Content from './content/ContentView.vue'
// import { useMessageListStore } from '@/stores/messageList'
// import SideBar from './sidebar/SideBar.vue'

onMounted(() => {
  console.log('Chat page mounted')
})
</script>
