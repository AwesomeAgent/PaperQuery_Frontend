<!-- 这是内容区域 -->
<template>
  <div class="flex flex-col overflow-hidden">
    <Header class="flex-none h-1/8" />
    <Main class="flex-1" />
    <Footer class="h-1/8" />
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import Header from './components/HeaderArea.vue'
import Main from './components/MainArea.vue'
import Footer from './components/FooterArea.vue'
</script>
