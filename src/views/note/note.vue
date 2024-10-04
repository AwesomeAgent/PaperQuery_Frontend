<!-- markdown 编辑器组件 -->
<template>
  <div id="vditor"></div>
</template>

<style scoped></style>

<script setup>
import { ref, onMounted } from 'vue'
import Vditor from 'vditor' // 确保你已经安装并引入了 Vditor
import 'vditor/dist/index.css';
import { getDocumentNote, updateDocumentNote } from '@/api/note';
import { ElNotification } from 'element-plus';
const route = useRoute()

const knowledgeID = route.params.knowledgeID
const documentID = route.params.documentID

// 定义响应式变量
const contentEditor = ref(null)

onMounted(() => {
  // 初始化 Vditor 编辑器
  contentEditor.value = new Vditor('vditor', {
    height: "100%",
    width: "100%",
    toolbarConfig: {
      pin: false,
      hide: true
    },
    cache: {
      enable: false,
    },
    after: () => {
      getDocumentNote(knowledgeID, documentID).then(res => {
        const note = res.data.note
        if (note === null) {
          contentEditor.value.setValue("# 我的笔记")
        } else {
          contentEditor.value.setValue(note)
        }
      }).catch(err => {
        console.log(err)
      })
    },
  })
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// 监听 ctrl + s 保存笔记
const handleKeyDown = (event) => {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault() // 阻止默认的保存行为
    uploadCurrentNote() // 调用上传笔记的函数
  }
}

// 上传笔记的函数
const uploadCurrentNote = () => {
  const noteContent = contentEditor.value.getValue()
  updateDocumentNote(knowledgeID, documentID, noteContent).then(() => {
    ElNotification({
      title: '成功',
      message: '保存成功',
      type: 'success',
      duration: 1000
    })
  }).catch(err => {
    console.log('笔记上传失败', err)
  })
}

</script>