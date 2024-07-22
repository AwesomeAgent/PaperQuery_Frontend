<script setup lang="ts">
// import { Button } from '@/components/ui/button'
import overview from './overview.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const logoutButton = () => {
  console.log('logout')
  store.dispatch('logout')
  router.push('/login')
}
</script>

<template>
  <div class="flexs-col w-full p-8">
    <div class="flex justify-between items-center mb-8 h-32px">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <Button variant="outline" class="text-1xl" @click="logoutButton"
        >注销</Button
      >
    </div>
    <div class="w-full">
      <Tabs default-value="overview">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="overview"> 概览 </TabsTrigger>
          <TabsTrigger value="other"> 其他 </TabsTrigger>
        </TabsList>
        <div class="w-full mb-6" />
        <TabsContent value="overview">
          <overview />
        </TabsContent>
        <TabsContent value="other">
          <overview />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
