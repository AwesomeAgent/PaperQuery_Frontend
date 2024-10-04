<template>
  <div class="flex-col h-full w-full border">
    <div class="flex items-center justify-between p-2 border-b">
      <!-- <h1 class="text-xl font-bold">翻译</h1> -->
      <Tabs default-value="translate" class="w-[400px]">
        <TabsList>
          <TabsTrigger value="translate" @click="displayTran">
            翻译
          </TabsTrigger>
          <TabsTrigger value="note" @click="displayNote">
            笔记
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
    <!-- Content area -->
    <div class="flex-grow overflow-hidden"> <!-- 使用 flex-grow 和 overflow-hidden 固定内容区域 -->
      <!-- Translate content -->
      <div v-show="TranDisplay" class="h-full overflow-auto p-4">
        <Textarea v-model="selectedText" class="w-full h-full" resize-none />
      </div>

      <!-- Note content -->
      <div v-show="!TranDisplay" class="h-full overflow-auto p-4">
        <note class="w-full h-full" :knowledgeID="knowledgeID" :documentID="documentID"></note>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStore } from 'vuex'
import note from '@/views/note/note.vue'
const route = useRoute()

const knowledgeID = route.params.knowledgeID as string
const documentID = route.params.documentID as string

const store = useStore()

const TranDisplay = ref(true)

// 显示翻译文字
const selectedText = computed(() => {
  return store.getters.translatedText
})

onMounted(() => {
  store.commit('setTranslatedText', '')
})


const displayTran = () => {
  TranDisplay.value = true
  console.log("显示翻译")
}

const displayNote = () => {
  TranDisplay.value = false
  console.log("显示笔记")
}
</script>

<style scoped>
.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-grow {
  flex-grow: 1;
}
</style>
