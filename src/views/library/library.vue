<template>
  <div class="flex-col w-full p-8">
    <h1 class="text-2xl font-bold items-center mb-8">knowledge Library</h1>
    <div v-if="knowCardList" class="flex space-x-4 mb-6">
      <Input type="text" placeholder="Filter apps..." class="w-1/2" />
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            role="combobox"
            :aria-expanded="open"
            class="w-[200px] justify-between"
          >
            {{
              value
                ? knowCardList.find((card) => card.knowledgeName === value)
                    ?.knowledgeDescription
                : 'All Apps'
            }}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
          <Command>
            <CommandInput class="h-9" placeholder="Search apps..." />
            <CommandEmpty>No apps found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="card in knowCardList"
                  :key="card.knowledgeName"
                  :value="card.knowledgeName"
                  @select="
                    (ev) => {
                      if (typeof ev.detail.value === 'string') {
                        value = ev.detail.value
                      }
                      open = false
                    }
                  "
                >
                  {{ card.knowledgeDescription }}
                  <Check
                    :class="
                      cn(
                        'ml-auto h-4 w-4',
                        value === card.knowledgeName
                          ? 'opacity-100'
                          : 'opacity-0',
                      )
                    "
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
    <!-- 知识库卡片 -->
    <div
      v-if="knowCardList !== null"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <!-- 显示创建卡片 -->
      <Card class="flex justify-center items-center w-full">
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="ghost" class="w-full h-full text-xl">
              创建知识
            </Button>
          </DialogTrigger>
          <div>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>知识创建</DialogTitle>
              </DialogHeader>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="libName" class="text-right"> 知识名称 </Label>
                  <Input
                    id="libName"
                    v-model="newCard.knowledgeName"
                    class="col-span-3"
                    required
                    autocomplete="off"
                  />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="libDes" class="text-right"> 知识描述 </Label>
                  <Input
                    id="libDes"
                    v-model="newCard.knowledgeDescription"
                    class="col-span-3"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="flex justify-center gap-4">
                <DialogTrigger>
                  <Button variant="outline">取消</Button>
                </DialogTrigger>
                <DialogTrigger>
                  <Button @click="SaveEvent">确认</Button>
                </DialogTrigger>
              </div>
            </DialogContent>
          </div>
        </Dialog>
      </Card>
      <Card
        v-for="card in knowCardList"
        :key="card.knowledgeName"
        class="flex-col"
      >
        <CardHeader>
          <CardTitle>{{ card.knowledgeName }}</CardTitle>
          <!-- <CardDescription>
            <label class="text-1xl">描述</label>
          </CardDescription> -->
        </CardHeader>
        <CardContent>
          <p class="text-sm text-gray-500">
            {{ card.knowledgeDescription }}
          </p>
        </CardContent>
        <!-- 横向布局 -->
        <CardFooter>
          <div class="flex justify-left w-full">
            <!-- 点击打开按钮 跳转到 knowledge 页面 -->
            <Button
              variant="outline"
              class="text-1xl mr-2"
              @click="router_knowledge(card.knowledgeID)"
              >打开</Button
            >
            <Button variant="outline" class="text-1xl mr-2">对话</Button>
            <Dialog>
              <DialogTrigger as-child>
                <Button
                  variant="outline"
                  class="text-1xl mr-2"
                  @click="openEditDialog(card)"
                >
                  编辑
                </Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>知识编辑</DialogTitle>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="libName" class="text-right"> 知识名称 </Label>
                    <Input
                      id="libName"
                      v-model="tempCard.knowledgeName"
                      class="col-span-3"
                    />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="libDes" class="text-right"> 知识描述 </Label>
                    <Input
                      id="libDes"
                      v-model="tempCard.knowledgeDescription"
                      class="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogTrigger as-child>
                    <Button
                      variant="outline"
                      class="text-1xl"
                      @click="
                        EditEvent(
                          card.knowledgeID,
                          tempCard.knowledgeName,
                          tempCard.knowledgeDescription,
                        )
                      "
                    >
                      保存
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </div>
    <div
      v-else-if="knowCardList === null"
      class="grid w-full grid-cols-3 space-x-5 h-64"
    >
      <div class="space-y-2">
        <Skeleton class="h-2/3 w-full rounded-xl" />
        <Skeleton class="h-1/8 w-2/3" />
        <Skeleton class="h-1/8 w-1/3" />
      </div>
      <div class="space-y-2">
        <Skeleton class="h-2/3 w-full rounded-xl" />
        <Skeleton class="h-1/8 w-2/3" />
        <Skeleton class="h-1/8 w-1/3" />
      </div>
      <div class="space-y-2">
        <Skeleton class="h-2/3 w-full rounded-xl" />
        <Skeleton class="h-1/8 w-2/3" />
        <Skeleton class="h-1/8 w-1/3" />
      </div>
    </div>
  </div>
  <!-- <router-view /> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/components/utils'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getKnowledgeList, createKnowledge, editKnowledge } from '@/api/data'
import {
  type Knowledge,
  type KnowledgeListResponse,
  type KnowledgeResponse,
} from '@/types/type'

import { type User } from '@/stores'
import { ElNotification } from 'element-plus'

const store = useStore()
const router = useRouter()

const knowCardList = ref<Knowledge[] | null>(null)

const newCard = ref({
  knowledgeName: '',
  knowledgeDescription: '',
})

const tempCard = {
  knowledgeName: '',
  knowledgeDescription: '',
}

const openEditDialog = (card: Knowledge) => {
  tempCard.knowledgeName = card.knowledgeName
  tempCard.knowledgeDescription = card.knowledgeDescription
}

onMounted(async () => {
  const router = useRouter()
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }

  try {
    const libResp = (await getKnowledgeList()) as KnowledgeListResponse
    if (libResp) {
      knowCardList.value = libResp.data.knowledgeList
    }
  } catch (error: any) {
    console.error(error.message)
  }
})
const open = ref(false)
const value = ref('')

const router_knowledge = (knowledgeID: string) => {
  router.push({ name: 'knowledge', params: { knowledgeID: knowledgeID } })
}

// 保存新创建的知识卡片
const SaveEvent = async () => {
  const knowledgeName = newCard.value.knowledgeName.trim()
  const knowledgeDescription = newCard.value.knowledgeDescription.trim()
  newCard.value.knowledgeName = ''
  newCard.value.knowledgeDescription = ''
  // 知识名不能为空
  if (knowledgeName === '') {
    ElNotification.error('知识名称不能为空')
    return
  }
  // TODO: 处理服务器500错误
  try {
    const knowResp = (await createKnowledge(
      knowledgeName,
      knowledgeDescription,
    )) as KnowledgeResponse

    if (knowResp) {
      // 添加新创建的知识卡片到列表头
      knowCardList.value?.unshift(knowResp.data)
      ElNotification.success('知识创建成功')
    }
  } catch (error: any) {
    if (error.message == '401') {
      const router = useRouter()
      ElNotification.error('Token过期，请重新登录')
      router.push('/login')
    } else if (error.message == '409') {
      ElNotification.error('知识名称重复')
    }
  }
}

// 编辑知识卡片
// TODO: 编辑知识卡片
const EditEvent = async (
  knowledgeID: string,
  knowledgeName: string,
  knowledgeDescription: string,
) => {
  // 先检测知识名是否为空或重复
  if (knowledgeName === '') {
    ElNotification.error('知识名不能为空')
    return
  }
  const user = store.getters.getUser as User
  const token = `${user.tokenData.token_type} ${user.tokenData.access_token}`
  const knowledgeResp = (await editKnowledge(
    token,
    knowledgeID,
    knowledgeName,
    knowledgeDescription,
  )) as KnowledgeResponse
  if (knowledgeResp.status_code == 401) {
    ElNotification.error('Token过期，请重新登录')
    return
  }
  if (knowledgeResp.status_code == 402) {
    ElNotification.error('知识名重复')
    return
  }
  if (knowledgeResp.status_code === 200) {
    // 更新知识卡片
    const index = knowCardList.value?.findIndex(
      (card) => card.knowledgeID === knowledgeID,
    )
    if (index !== undefined && index !== -1) {
      knowCardList.value?.splice(index, 1, knowledgeResp.data)
      ElNotification.success('知识编辑成功')
    }
  } else {
    console.error('Failed to edit knowledge', knowledgeResp.msg)
  }
  console.log(
    `knowledgeID: ${knowledgeID}, knowledgeName: ${knowledgeName}, knowledgeDescription: ${knowledgeDescription}`,
  )
}
</script>

<style scoped>
/* 添加所需的自定义样式 */
</style>
