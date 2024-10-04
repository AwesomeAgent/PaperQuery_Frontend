<template>
  <div class="flex h-screen">
    <ResizablePanelGroup id="group_1" direction="horizontal" class="w-full h-full">
      <ResizablePanel id="panel-1" :min-size="60" class="h-full">
        <div class="w-full h-full">
          <pdfViewer :knowledge-i-d="knowledgeID" :document-i-d="documentID" />
        </div>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel id="panel-2" class="h-full">
        <div class="flex flex-col w-full h-full">
          <ResizablePanelGroup id="group_2" direction="vertical" class="h-full">
            <ResizablePanel id="panel-2-1" :min-size="30" class="h-full">
              <div class="flex flex-1 h-full">
                <translateBox :knowledge-id="knowledgeID" :document-id="documentID" />
              </div>
            </ResizablePanel>
            <ResizableHandle with-handle />
            <ResizablePanel id="panel-2-2" :min-size="50" class="h-full">
              <div class="flex flex-1 h-full">
                <chat class="flex-1" :knowledge-id="knowledgeID" :document-id="documentID" />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import pdfViewer from '@/views/pdf/pdfViewer.vue'
import chat from '@/views/smallChat/chat.vue'
import translateBox from '@/views/translate/translateBox.vue'
import { useRoute } from 'vue-router'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

const route = useRoute()

const knowledgeID = route.params.knowledgeID as string
const documentID = route.params.documentID as string

onMounted(async () => { })
</script>
