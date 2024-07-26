<template>
  <div class="flex h-screen">
    <ResizablePanelGroup id="group_1" direction="horizontal" class="w-full">
      <ResizablePanel id="panel-1" :min-size="60">
        <div class="w-full h-screen">
          <pdfViewer :knowledge-i-d="knowledgeID" :document-i-d="documentID" />
        </div>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel id="panel-2">
        <div class="flex flex-col w-full h-screen">
          <ResizablePanelGroup id="group_2" direction="vertical">
            <ResizablePanel id="panel-2-1" :min-size="30">
              <div class="flex flex-1 h-full">
                <translateBox />
              </div>
            </ResizablePanel>
            <ResizableHandle with-handle />
            <ResizablePanel id="panel-2-2">
              <div class="flex flex-1 h-full">
                <chat class="flex-1" />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<script setup lang="ts">
import pdfViewer from '@/views/pdf/pdfViewer.vue'
import chat from '@/views/chat/chat.vue'
import translateBox from '@/views/translate/translateBox.vue'
import { useRoute } from 'vue-router'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const knowledgeID = route.params.knowledgeID as string
const documentID = route.params.documentID as string

onMounted(async () => {
  console.log(`context:${store.getters.context}`)
})
</script>

<style scoped></style>
