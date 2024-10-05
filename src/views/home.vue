<template>
  <div id="home" class="flex h-full">
    <!-- <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        :default-size="265"
        :min-size="15"
        :max-size="15"
        :collapsed-size="10"
        collapsible
        :class="
          cn(
            isCollapsed &&
              'min-w-[100px] transition-all duration-500 ease-in-out',
          )
        "
        @expand="onExpand"
        @collapse="onCollapse"
      >
        <SideBar :is-collapsed="isCollapsed" />
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel class="flex h-screen overflow-auto"></ResizablePanel>
      <router-view />
    </ResizablePanelGroup> -->
    <SideBar :is-collapsed="isCollapsed" />
    <router-view class="flex-grow" />
  </div>
</template>

<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { cn } from '@/lib/utils'
const isCollapsed = ref(false)

function onCollapse() {
  console.log('onCollapse')
  isCollapsed.value = true
}

function onExpand() {
  console.log('onExpand')
  isCollapsed.value = false
}
</script>

<style lang="less" scoped>
.left {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // width: 100%;
  // // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // color: var(--c-text);
  // padding: calc(var(--w-space) * 3) 0;
  // margin: 0 auto;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
}
</style>
