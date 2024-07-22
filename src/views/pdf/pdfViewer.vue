<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import '@tato30/vue-pdf/style.css'
import FloatingButton from '@/views/chat/floatButton.vue'
import { useStore } from 'vuex'

const { pdf, pages } = usePDF('/file/ditto.pdf')
const selectedText = ref('')
const isFloatingButtonVisible = ref(true)

const currentPage = ref(1)

const store = useStore()

const pageVisible = ref(Array(pages.value).fill(false))

// 前三个是可见的

pageVisible.value[0] = true
pageVisible.value[1] = true

// 使用防抖函数
const throttle = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null

  return function (this: unknown, ...args: Parameters<T>): void {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

const setFloatingButtonVisible = (isVisible: boolean) => {
  isFloatingButtonVisible.value = isVisible
}

const getSelectedText = () => {
  const selection = window.getSelection()
  if (selection) {
    selectedText.value = selection.toString()
    store.dispatch('updateSelectedText', selection.toString())
    // console.log(selectedText.value)
  }
}

const handleMouseUp = () => {
  getSelectedText()
}

const handleMouseDown = () => {
  // setFloatingButtonVisible(false)
}

const updateTextLayerVisibility = (page: number, visible: boolean) => {
  const visiblePages = [page - 2, page - 1, page]
  for (let i = 0; i < pages.value; i++) {
    if (visiblePages.includes(i)) {
      const pageElement = document.getElementById(`${i + 1}`)
      if (pageElement && pageElement instanceof HTMLElement) {
        const textLayer = pageElement.querySelector('.textLayer')
        if (textLayer && textLayer instanceof HTMLElement) {
          textLayer.style.display = visible ? 'block' : 'none'
        }
      }
    }
  }
}

// 修改updateCurrentPage函数以动态加载文本层
const updateCurrentPage = (page: number) => {
  currentPage.value = page
  const visiblePages = [page - 2, page - 1, page]
  for (let i = 0; i < pages.value; i++) {
    pageVisible.value[i] = visiblePages.includes(i)
    // 动态设置文本层可见性
    // updateTextLayerVisibility(i, visiblePages.includes(i))
  }
}

onMounted(() => {
  const div1 = document.getElementById('div1')
  if (div1) {
    div1.addEventListener('mouseup', handleMouseUp)
    div1.addEventListener('mousedown', handleMouseDown)
    // div1.addEventListener(
    //   'scroll',
    //   throttle(() => {
    //     const pageHeight = div1.scrollHeight / pages.value // 每页的高度
    //     const newPage = Math.floor(div1.scrollTop / pageHeight) + 1
    //     updateCurrentPage(Math.min(Math.max(newPage, 1), pages.value))
    //   }, 100),
    // ) // 100ms 节流
  }

  // Simulate updating current page, replace this with actual page navigation logic
})

onBeforeUnmount(() => {
  const div1 = document.getElementById('div1')
  if (div1) {
    div1.removeEventListener('mouseup', handleMouseUp)
    div1.removeEventListener('mousedown', handleMouseDown)
    // div1.removeEventListener('scroll', () => {
    //   const newPage = Math.floor(div1.scrollTop / (div1.clientHeight * 0.8)) + 1
    //   updateCurrentPage(Math.min(Math.max(newPage, 1), pages.value))
    // })
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
    <!-- <div v-for="page in pages" :id="`${page}`" :key="page" class="pdf-page">
      <VuePDF :pdf="pdf" :page="1" text-layer fit-parent />
    </div> -->
    <VuePDF :pdf="pdf" :page="page" text-layer fit-parent />
  </div>
  <FloatingButton
    :is-visible="isFloatingButtonVisible"
    :selected-text="selectedText"
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
  overflow-x: hidden;
  max-height: 100vh; /* Adjust height as needed */
}
</style>
