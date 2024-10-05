<!-- 这是内容区域 -->
<template>
  <div class="flex flex-col bg-gray-50 h-screen">
    <Header class="flex h-10" />
    <Main class="flex-grow overflow-hidden" />
    <Footer class="h-10" />
  </div>
</template>

<style lang="scss" scoped></style>

<script setup>
import Header from './components/HeaderArea.vue'
import Main from './components/MainArea.vue'
import Footer from './components/FooterArea.vue'
import { ref, onMounted } from 'vue'

const mainHeight = ref(0)

onMounted(() => {})
</script>
