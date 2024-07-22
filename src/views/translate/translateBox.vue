<template>
  <div class="flex-col h-full w-full border">
    <div class="flex items-center justify-between p-4 border-b">
      <h1 class="text-xl font-bold">翻译</h1>
    </div>
    <div class="flex-grow p-4">
      <Textarea v-model="selectedText" class="w-full h-full" resize-none />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea'
import { useStore } from 'vuex'

const store = useStore()

const selectedText = computed(() => store.getters.selectedText)
</script>

<style scoped>
.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-grow {
  flex-grow: 1;
}
</style>
