<template>
  <div v-for="(message, index) in messages" :key="index" class="">
    <div
      v-if="message.sender === 'user'"
      class="flex justify-end ml-[25%] mb-5"
    >
      <el-card class="bg-gray-200 p-2 rounded-lg" shadow="hover">
        <div v-html="renderMarkdown(message.text)" />
      </el-card>
    </div>
    <div v-else class="flex justify-start mr-[25%] mb-5">
      <el-card class="bg-gray-50 p-2 rounded-lg" shadow="hover"
        ><div v-html="renderMarkdown(message.text)"
      /></el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus'
import { useStore } from 'vuex'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { getDocumentSummary } from '@/api/data'

import { TypewriterQueue } from './hooks/typeWriter'

const props = defineProps({
  knowledgeId: String,
  documentId: String,
})

const md = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    // 当前时间加随机数生成唯一的id标识
    const codeIndex = (
      Date.now() + Math.floor(Math.random() * 10000000)
    ).toString()
    // 复制功能主要使用的是 clipboard.js
    // let html = `<Button class="copy-btn" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">复制</Button>`
    let html = ``
    const linesLength = str.split(/\n/).length - 1
    // 生成行号
    let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
    for (let index = 0; index < linesLength; index++) {
      linesNum = linesNum + '<span></span>'
    }
    linesNum += '</span>'
    if (lang && hljs.getLanguage(lang)) {
      try {
        // highlight.js 高亮代码
        const preCode = hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true,
        }).value
        html = html + preCode
        // if (linesLength) {
        //   html += '<b class="name">' + lang + '</b>'
        // }
        // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "&lt;" 代替，不影响复制功能
        return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`
      } catch (error) {
        console.log(error)
      }
    }

    const preCode = md.utils.escapeHtml(str)
    html = html + preCode
    return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`
  },
})

const renderMarkdown = (text: string) => {
  return md.render(text)
}

const store = useStore()

const messages = computed(() => store.getters.messageList)

onMounted(() => {
  getDocumentSummary(props.knowledgeId as string, props.documentId as string)
    .then((res) => {
      messages.value.push({
        text: '',
        sender: 'bot',
      })
      // 将字符串中每个字符弄成一个数组
      const a: string[] = res.data.summarize.split('')
      console.log(a)
      const typewritter = new TypewriterQueue(a, store)
      typewritter.typeOut(30)
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  // 清空消息列表
  store.commit('clearMessage')
})
</script>

<style scoped></style>
