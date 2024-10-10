<!-- 这是底部的输入区域 -->
<template>
  <div class="relative flex w-full justify-center mt-4 mb-4">
    <div class="w-full relative flex">
      <div class="absolute bottom-0 w-full">
        <DocumentList class="w-1/2 resize-none m-auto" />
        <InputBox class="w-1/2 resize-none m-auto"></InputBox>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import DocumentList from '../../components/DocumentList.vue'
import InputBox from '../../components/InputBox.vue'
</script>
