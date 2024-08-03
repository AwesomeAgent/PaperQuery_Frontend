<!-- 这是底部的输入区域 -->
<template>
  <div>
    <div class="flex flex-col items-center mt-4 mb-8">
      <DocumentList /> <InputBox />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import DocumentList from '../../components/DocumentList.vue'
import InputBox from '../../components/InputBox.vue'
</script>
