<!-- PdfViewer.vue -->
<template>
  <div>
    <button @click="fetchPdf">获取并显示PDF</button>
    <iframe
      v-if="pdfUrl"
      id="pdf-viewer"
      :src="pdfUrl"
      width="600"
      height="800"
      type="application/pdf"
      @click="handleMouseDown"
    />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const pdfUrl = ref('')

    const params = new URLSearchParams({
      documentID: '4dcb6044af761c6c566f330c9d56422a',
    }).toString()

    const handleMouseDown = (event) => {
      console.log('Mouse down event:', event)
    }

    const fetchPdf = async () => {
      try {
        const response = await fetch(
          `http://172.22.105.201:8000/document/getFile?${params}`,
          {
            headers: {
              Authorization: 'Bearer 2f68dbbf-519d-4f01-9636-e2421b68f379',
            },
          },
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const blob = await response.blob()
        pdfUrl.value = URL.createObjectURL(blob)
      } catch (error) {
        console.error('Error fetching PDF:', error)
      }
    }

    return {
      pdfUrl,
      fetchPdf,
      handleMouseDown,
    }
  },
}
</script>

<style scoped>
button {
  margin-bottom: 20px;
}
</style>
