<template>
  <div id="home" class="flex h-full">
    <SideBar :is-collapsed="isCollapsed" />
    <router-view class="flex-grow" />
  </div>
</template>

<script setup lang="ts">
const isCollapsed = ref(false)
</script>

<style lang="less" scoped>
.left {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
}
</style>
