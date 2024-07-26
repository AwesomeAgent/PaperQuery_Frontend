<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import '@tato30/vue-pdf/style.css'
import FloatingButton from '@/views/chat/floatButton.vue'
import { useStore } from 'vuex'

import { translateText } from '@/api/data'

const props = defineProps({
  knowledgeID: {
    type: String,
    required: true,
  },
  documentID: {
    type: String,
    required: true,
  },
})
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const { pdf, pages } = usePDF(
  `${apiBaseUrl}/document/getFile?documentID=${props.documentID}&knowledgeID=${props.knowledgeID}`,
  // '/file/ditto.pdf',
)
const selectedText = ref('')
const isFloatingButtonVisible = ref(true)

const store = useStore()

// 发送翻译请求
const getSelectedText = async () => {
  const selection = window.getSelection()
  if (selection && selection.toString().length > 0) {
    let text = selection.toString()
    // 删除 text 里面的换行符
    // text.replaceAll('/\n', ' ')
    selectedText.value = selection.toString()
    try {
      const res = await translateText(selectedText.value)
      if (res) {
        text = res.data.text
      }
    } catch (error) {
      console.error('翻译失败:', error)
    } finally {
      store.dispatch('updateTranslatedText', text)
    }
  }
}

const handleMouseUp = () => {
  getSelectedText()
}

const handleMouseDown = () => {
  // setFloatingButtonVisible(false)
}

onMounted(() => {
  const div1 = document.getElementById('div1')
  if (div1) {
    div1.addEventListener('mouseup', handleMouseUp)
    div1.addEventListener('mousedown', handleMouseDown)
  }
})

onBeforeUnmount(() => {
  const div1 = document.getElementById('div1')
  if (div1) {
    div1.removeEventListener('mouseup', handleMouseUp)
    div1.removeEventListener('mousedown', handleMouseDown)
  }
})

const handleButtonLastPage = () => {
  page.value = Math.max(page.value - 1, 1)
}

const handleButtonNextPage = () => {
  page.value = Math.min(page.value + 1, pages.value)
}

const page = ref(1)
</script>

<template>
  <button @click="handleButtonLastPage">上一页</button>
  <button @click="handleButtonNextPage">下一页</button>
  <div id="div1" class="pdf-container">
    <VuePDF :pdf="pdf" :page="page" text-layer fit-parent />
  </div>
  <FloatingButton
    :is-visible="isFloatingButtonVisible"
    :selected-text="selectedText"
    :knowledge-i-d="knowledgeID"
    :document-i-d="documentID"
    :page="page"
  />
</template>

<style scoped>
.pdf-page {
  width: 100%;
  margin-bottom: 0; /* Add spacing to avoid overlap */
}

.pdf-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: auto;
  max-height: 100vh; /* Adjust height as needed */
}
</style>
