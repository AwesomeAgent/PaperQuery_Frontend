<!-- 这是内容区域的头部 -->
<template>
  <header class="shadow mb-1">
    <div
      class="w-full mx-auto px-8 flex justify-between items-center space-x-20"
    >
      <h1 class="text-3xl font-bold text-gray-900">PaperQuery</h1>
      <div class="flex space-x-4">
        <Button variant="outline" class="px-4 py-2 rounded font-bold"
          >登录</Button
        >
        <Button variant="outline" class="px-4 py-2 rounded font-bold"
          >注册</Button
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
</script>

<style lang="scss" scoped></style>
