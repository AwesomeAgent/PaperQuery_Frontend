<template>
  <div class="flex-col w-full p-8">
    <h1 class="text-2xl font-bold mb-8">knowledge Documents</h1>
    <div class="flex-col mb-6">
      <div class="flex space-x-4 mb-6 w-full">
        <Input type="text" placeholder="Filter apps..." class="w-1/2" />
        <input
          ref="fileInput"
          type="file"
          style="display: none"
          accept=".pdf"
          multiple="true"
          @change="handleFileUpload"
        />
        <Button variant="default" class="text-sm mr-2" @click="openFilePicker">
          上传文件
        </Button>
      </div>
      <el-table :data="filterTableData" class="w-full" max-height="500">
        <el-table-column
          fixed
          :formatter="formatterName"
          label="Document Name"
          prop="documentName"
        />
        <el-table-column label="Tag" prop="tag">
          <template #default="{ row }">
            <div>
              <el-tag
                v-for="(tag, index) in row.tag"
                :key="index"
                :type="getTagType(index)"
                style="margin-right: 4px"
              >
                {{ tag }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Status" prop="status" />
        <el-table-column label="Query Number" prop="queryNumber" />
        <el-table-column label="Document Size" prop="documentSize" />
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-button
              class="text-sm"
              @click="handleView(scope.$index, scope.row)"
            >
              View
            </el-button>
            <el-button
              class="text-sm"
              @click="handleDelete(scope.$inex, scope.row)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-center p-2">
        <Label class="text-center color-gray">@github/paperQuery</Label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { rand } from '@vueuse/core'
import { computed, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { formatName } from '@/components/utils'
import { Label } from '@/components/ui/label'
import { useRouter } from 'vue-router'

interface Document {
  documentID: string
  documentName: string
  tag: string[]
  status: string
  queryNumber: number
  documentSize: number
}

const search = ref('')

const router = useRouter()

onMounted(() => {
  // 模拟向后端发送请求,获取表格数据
  tableData.value = [
    {
      documentID: '1',
      documentName: 'example1.pdf',
      tag: ['abc', 'def'],
      status: 'success',
      queryNumber: 200,
      documentSize: 100,
    },
    {
      documentID: '2',
      documentName: 'example2.pdf',
      tag: ['abc', 'ghi'],
      status: 'success',
      queryNumber: 300,
      documentSize: 200,
    },
    {
      documentID: '3',
      documentName: 'example3.pdf',
      tag: ['def', 'ghi'],
      status: 'loading',
      queryNumber: 400,
      documentSize: 300,
    },
  ]
})

const filterTableData = computed(() =>
  // 需要对 tableData 的 documentName 和 tag进行搜索
  tableData.value.filter((data) => {
    const searchValue = search.value.toLowerCase()
    const nameMatches = data.documentName.toLowerCase().includes(searchValue)
    const tagMatches = data.tag.some((tag) =>
      tag.toLowerCase().includes(searchValue),
    )
    return !search.value || nameMatches || tagMatches
  }),
)
// const handleEdit = (index: number, row: Document) => {
//   // 编辑该行数据
//   console.log(index, row)
// }

const getDocument = async (documentID: string) => {
  // 模拟向后端发送请求,获取pdf文件
  console.log(documentID)
  router.push({ name: 'pdfInfo', params: { documentID: documentID } })
}

const handleView = async (index: number, row: Document) => {
  // 在这里实现跳转到显示对应pdf的页面
  console.log(index, row)
  if (row) {
    console.log(row.documentName)
    // 模拟向后端发送请求,获取对应的pdf文件
    await getDocument(row.documentID)
  }
  // Todo: 跳转到显示对应pdf的页面
  // router.push(`/viewPdf/${row.documentName}`)
}

const handleDelete = (index: number, row: Document) => {
  // 删除该行数据
  tableData.value.splice(index, 1)
  console.log(index, row)
}

// 整个表格数据
const tableData = ref<Document[]>([])

// 单个页面数据
// const pageData = ref<Document[]>([])

const fileInput = ref<HTMLInputElement | null>(null)
// const selectedFiles = ref<File[]>([])

const openFilePicker = () => {
  fileInput.value!.click()
}

// 上传文件的回调处理函数
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files) {
    // 检查文件名是否重复
    for (const file of files) {
      if (tableData.value.some((item) => item.documentName === file.name)) {
        // 显示重复文件名
        console.log(`文件 ${file.name} 已存在.`)
        continue
      }
      // 将不重复的文件添加到 tableData
      tableData.value.push({
        documentID: String(rand(1, 100)),
        documentName: file.name,
        // 在 abc 中随机选择 0-3 个元素
        tag: ['abc', 'def', 'ghi']
          .sort(() => Math.random() - 0.5)
          .slice(0, rand(0, 3)),
        status: 'loading',
        queryNumber: rand(100, 500),
        documentSize: file.size,
      })
    }
    ElNotification({
      title: '成功',
      message: '文件上传成功',
      type: 'success',
      duration: 3000,
    })
  } else {
    ElNotification({
      title: '提示',
      message: '请选择文件',
      type: 'warning',
      duration: 3000,
    })
    console.log('未选择任何文件.')
  }
  // Todo: 上传文件给服务器,并等待服务器回复
  // 模拟异步给服务器发送请求并携带文件的过程
  async function uploadFile(file: File) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('success')
      }, 3000)
    })
  }
  // 根据文件地址,上传每一个文件
  for (const file of files!) {
    uploadFile(file).then((res) => {
      console.log(`文件 ${file.name} 上传成功.`)
      // 更新文件状态
      const target = tableData.value.find(
        (item) => item.documentName === file.name,
      )
      if (target) {
        target.status = 'success'
      }
    })
  }
}
// const totalItems = ref(100) // 总条目数
// const pageSize = ref(1) // 每页显示的条目数
// const currentPage = ref(1) // 当前页码

// const totalPages = computed(() => {
//   return Math.ceil(totalItems.value / pageSize.value)
// })

// const handlePageChange = (page: any) => {
//   currentPage.value = page
//   console.log(`Current page: ${page}`)
//   // 在这里执行分页数据的获取逻辑
//   // 切换数据
// }

// const onAddItem = () => {
//   tableData.value.push({
//     documentName: 'New Document' + rand(1, 100),
//     status: 'loading',
//     queryNumber: rand(100, 500),
//     documentSize: rand(100, 500),
//   })
// }

const formatterName = (row: Document) => {
  // 定义超过 5 个字符显示省略号
  const maxLength = 20
  // 去除文件名后缀
  return formatName(
    row['documentName'].slice(0, row['documentName'].indexOf('.pdf')),
    maxLength,
  )
}

const getTagType = (index: number) => {
  // 根据索引返回不同的类型
  const colors = ['success', 'info', 'warning', 'danger', 'primary']
  return colors[index % colors.length]
}
</script>

<style scoped>
/* 添加所需的自定义样式 */
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
}
</style>
