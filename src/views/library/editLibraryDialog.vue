<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Edit Profile </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="libName" class="text-right"> Lib Name </Label>
          <Input
            id="libName"
            v-model="editedCard.name"
            class="col-span-3"
            required
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="libDes" class="text-right"> Lib Description </Label>
          <Input
            id="libDes"
            v-model="editedCard.description"
            class="col-span-3"
            required
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" @click="save"> 保存 </Button>
        <Button type="button" @click="closeDialog"> 取消 </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps({
  card: {
    type: Object as () => { id: number; name: string; description: string }, // 根据实际情况定义具体类型
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['save', 'close'])

const editedCard = ref({ ...props.card })

const save = () => {
  emit('save', { ...editedCard.value })
}

const closeDialog = () => {
  emit('close')
}

watch(
  () => props.card,
  (newValue) => {
    editedCard.value = { ...newValue }
  },
)
</script>
