<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getLibraryInfo } from '@/api/data'
import type { LibraryInfoResponse, LibraryInfo } from '@/types/type'

const libInfo = ref<LibraryInfo | null>(null)

onMounted(async () => {
  const router = useRouter()
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }

  // 获取用户的知识库数据
  try {
    const libResp = (await getLibraryInfo()) as LibraryInfoResponse
    if (libResp) {
      libInfo.value = libResp.data
    }
  } catch (error: any) {
    console.error(error.message)
  }
})
</script>

<template>
  <!-- 表格布局间距 -->
  <div v-if="libInfo" class="grid w-full grid-cols-3 space-x-5">
    <Card class="">
      <CardHeader>
        <CardTitle>知识库数量</CardTitle>
        <CardDescription>knowledge library count</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="text-3xl font-bold">{{ libInfo.knowledgeNumSum }}</div>
        <!-- <div class="text-sm text-green-500">+20.1% from last month</div> -->
      </CardContent>
    </Card>

    <Card class="">
      <CardHeader>
        <CardTitle>文档数量</CardTitle>
        <CardDescription>document count</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="text-3xl font-bold">
          {{ libInfo.documentNumSum || 0 }}
        </div>
      </CardContent>
    </Card>

    <Card class="">
      <CardHeader>
        <CardTitle>向量数量</CardTitle>
        <CardDescription>vector count</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="text-3xl font-bold">{{ libInfo.vectorNumSum || 0 }}</div>
      </CardContent>
    </Card>
  </div>
  <div v-else class="grid w-full grid-cols-3 space-x-5">
    <div class="space-y-2">
      <Skeleton class="h-[125px] w-full rounded-xl" />
      <Skeleton class="h-4 w-2/3" />
      <Skeleton class="h-4 w-1/3" />
    </div>
    <div class="space-y-2">
      <Skeleton class="h-[125px] w-full rounded-xl" />
      <Skeleton class="h-4 w-2/3" />
      <Skeleton class="h-4 w-1/3" />
    </div>
    <div class="space-y-2">
      <Skeleton class="h-[125px] w-full rounded-xl" />
      <Skeleton class="h-4 w-2/3" />
      <Skeleton class="h-4 w-1/3" />
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}
.space-x-4 > * + * {
  margin-left: 1rem;
}
</style>
