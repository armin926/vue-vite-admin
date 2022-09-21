<script lang="ts" setup>
import { computed } from 'vue'
import { ElConfigProvider } from "element-plus"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import en from "element-plus/lib/locale/lang/en"
import { useAppStoreExternal } from "@/store/modules/app"

const useAppStore = useAppStoreExternal()
const language = computed(() => useAppStore.getLanuage)
</script>

<template>
  <el-config-provider :locale="language === 'en' ? en : zhCn">
    <RouterView />
  </el-config-provider>
</template>

<style lang="scss"></style>
