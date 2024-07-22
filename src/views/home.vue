<template>
  <div id="app" class="flex h-screen">
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel :default-size="15" :min-size="15">
        <SideBar />
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel><router-view /></ResizablePanel>
    </ResizablePanelGroup>
    <!-- <div>
      <embed src="/assets/sample.pdf" type="application/pdf" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
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
