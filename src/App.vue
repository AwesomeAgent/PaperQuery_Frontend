<template>
  <div id="main router" class="flex-grow h-full">
    <router-view :key="key" class="" />
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
