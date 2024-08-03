<template>
  <div class="h-screen w-screen">
    <router-view :key="key" class="h-full" />
  </div>
</template>

<script setup lang="ts">
import { isMobile, watchResize } from '@bassist/utils'
const route = useRoute()
const key = computed(() => `${String(route.name || route.path)}-${new Date()}`)

watchResize(() => {
  document.body.className = `platform-${isMobile() ? 'mobile' : 'desktop'}`
})
</script>
