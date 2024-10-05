<template>
  <img :src="svgURI" :alt="username" v-bind="props" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { minidenticon } from 'minidenticons'

// 定义接收的属性
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  saturation: {
    type: Number,
    default: 50, // 根据需要设置默认值
  },
  lightness: {
    type: Number,
    default: 50, // 根据需要设置默认值
  },
})

// 使用 computed 计算 svgURI
const svgURI = computed(() => {
  // 如果username 为空，随机生成一个字符串
  if (!props.username) {
    return (
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        minidenticon(
          Math.random().toString(36).substring(2),
          props.saturation,
          props.lightness,
        ),
      )
    )
  }
  return (
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      minidenticon(props.username, props.saturation, props.lightness),
    )
  )
})
</script>
