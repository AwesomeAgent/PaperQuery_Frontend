<!-- markdown 编辑器组件 -->
<template>
  <div id="vditor"></div>
</template>

<style scoped></style>

<script setup>
import { ref, onMounted } from 'vue'
import Vditor from 'vditor' // 确保你已经安装并引入了 Vditor
import 'vditor/dist/index.css';

// 定义响应式变量
const contentEditor = ref(null)

onMounted(() => {
  // 初始化 Vditor 编辑器
  contentEditor.value = new Vditor('vditor', {
    height: "100%",
    width: "100%",
    toolbarConfig: {
      pin: false,
      hide: true
    },
    cache: {
      enable: false,
    },
    after: () => {
      contentEditor.value.setValue('# 我的笔记')
    },
  })
})
</script>