<template>
  <div class="flex w-full h-screen">
    <div class="w-3/4 h-screen">
      <pdfViewer />
    </div>
    <div class="flex flex-col w-1/4 h-screen">
      <div class="flex flex-1">
        <translateBox />
      </div>
      <div class="flex flex-1">
        <chat class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import pdfViewer from '@/views/pdf/pdfViewer.vue'
import chat from '@/views/chat/chat.vue'
import translateBox from '@/views/translate/translateBox.vue'

onMounted(() => {
  console.log('mounted')
})
</script>

<style scoped></style>
