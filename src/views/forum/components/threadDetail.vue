<template>
    <div class="container mx-auto p-4">
        <!-- 帖子标题和作者信息 -->
        <div class="border-b pb-4 mb-4">
            <h1 class="text-2xl font-bold mb-2">
                怎么分析自己的电脑需要多核 CPU，还是高主频少核 CPU
            </h1>
            <div class="text-sm text-gray-600">
                <span>cs5117155</span> - <span>21 小时前发布</span> - <span>2900 次点击</span>
            </div>
        </div>

        <!-- 帖子内容 -->
        <div class="mb-8">
            <p class="mb-4">
                我目前有台 j4105 电脑，发现开一个 QQ，每天十几个群都有消息，还有微信聊天工具，谷歌浏览器开 15 个窗口，CPU 就经常 80% 了，再随便一个 todesk 远控控制，CPU 就 100%。
            </p>
            <p class="mb-4">
                想问一下怎么知道自己需要多核 CPU 才能满足这样的性能，当前我的负载超过 8 核，10 核肯定能解决，只是价格问题。
            </p>
        </div>

        <!-- 评论部分 -->
        <div class="border-t pt-4">
            <h2 class="text-lg font-semibold mb-4">49 条回复</h2>
            <div class="space-y-4">
                <!-- 单个评论 -->
                <div class="border p-4 rounded-lg">
                    <div class="flex items-center justify-between mb-2">
                        <div class="text-gray-700 font-bold">jinwangyan</div>
                        <div class="text-sm text-gray-500">21 小时前</div>
                    </div>
                    <p>CPU 这东西很难坏，一手也就 600 搞个 12 代 i5, 应付你这功能绰绰有余</p>
                </div>

                <!-- 另一个评论 -->
                <div class="border p-4 rounded-lg">
                    <div class="flex items-center justify-between mb-2">
                        <div class="text-gray-700 font-bold">by</div>
                        <div class="text-sm text-gray-500">21 小时前</div>
                    </div>
                    <p>把谷歌浏览器换成 Firefox，也许 CPU 就够用了</p>
                </div>

                <!-- 更多评论可以用 v-for 渲染 -->
            </div>
        </div>
        <!-- 回复输入框 -->
        <div v-if="true" class="mt-4">
            <textarea class="w-full p-2 border rounded" rows="3" placeholder="添加新回复"></textarea>
            <Button class=" px-4 py-2 mt-2 rounded">
                回复
            </Button>
        </div>
    </div>
</template>

<script setup>
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue'

// 这里可以动态从 API 加载帖子详情和评论数据
// const post = ref({})
// const comments = ref([])
</script>

<style scoped>
/* 如果有自定义样式需要，可以在这里添加 */
</style>