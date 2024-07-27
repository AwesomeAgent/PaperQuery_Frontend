<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import '@tato30/vue-pdf/style.css'
import FloatingButton from '@/views/chat/floatButton.vue'
import { useStore } from 'vuex'
import { useScroll } from '@vueuse/core'
import { translateText } from '@/api/data'
import { debounce } from 'lodash'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

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
)
const store = useStore()

// 用户选中文本
const selectedText = ref('')

// 是否显示浮动按钮
const isFloatingButtonVisible = ref(true)

// 当前页码
const page = ref(1)

// 监听容器的滚动状态
const container = ref(null)
const { y, arrivedState } = useScroll(container)

// 判断是否已经到达底部 防止一次滚动就换页
const bottomReachedOnce = ref(false)
const topReachedOnce = ref(false)

// 滚动事件 防抖处理 防止滚动过快一次换多页
const handleWheel = debounce((event: any) => {
  if (event.deltaY > 0 && arrivedState.bottom) {
    if (bottomReachedOnce.value) {
      page.value = Math.min(page.value + 1, pages.value)
      y.value = 0
    } else {
      bottomReachedOnce.value = true
    }
  } else if (event.deltaY < 0 && arrivedState.top) {
    if (topReachedOnce.value) {
      page.value = Math.max(page.value - 1, 1)
      y.value = 0
    } else {
      topReachedOnce.value = true
    }
  }
}, 300)

// 监听滚动状态 重置底部和顶部状态
watch(arrivedState, (newValue) => {
  if (!newValue.bottom) {
    bottomReachedOnce.value = false
  }
  if (!newValue.top) {
    topReachedOnce.value = false
  }
})

// 发送翻译请求
const getSelectedText = async () => {
  const selection = window.getSelection()
  if (selection && selection.toString().length > 0) {
    let text = selection.toString()
    selectedText.value = text
    try {
      const res = await translateText(text)
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

onMounted(() => {
  const div1 = document.getElementById('div1')
  if (div1) {
    div1.addEventListener('mouseup', handleMouseUp)
    div1.addEventListener('wheel', handleWheel)
  }
})

onBeforeUnmount(() => {
  const div1 = document.getElementById('div1')
  if (div1) {
    div1.removeEventListener('mouseup', handleMouseUp)
    div1.removeEventListener('wheel', handleWheel)
  }
})

const handleButtonLastPage = () => {
  page.value = Math.max(page.value - 1, 1)
  y.value = 0
}

const handleButtonNextPage = () => {
  page.value = Math.min(page.value + 1, pages.value)
  y.value = 0
}
</script>

<template>
  <div class="flex flex-row w-full">
    <div class="flex items-center justify-center w-full">
      <Button variant="ghost" @click="handleButtonLastPage">《</Button>
      <Input class="w-10 h-5 text-sm font-bold" :value="`${page}`" />
      <Button variant="ghost" @click="handleButtonNextPage">》</Button>
    </div>
  </div>

  <div id="div1" ref="container" class="pdf-container">
    <VuePDF :pdf="pdf" :page="page" text-layer fit-parent />
    <!-- <div class="flex items-center justify-center mb-10 w-full"></div> -->
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
  max-height: 100vh;
}
</style>
