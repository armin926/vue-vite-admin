<script lang="ts" setup>
import { ElConfigProvider } from "element-plus"
import { useThemeStoreExternal } from '@/store/modules/theme'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const useThemeStore = useThemeStoreExternal()

generateNewStyle(useThemeStore.getMainColor).then(newStyleText => {
  writeNewStyle(newStyleText)
})
</script>

<template>
  <el-config-provider>
    <RouterView />
  </el-config-provider>
</template>

<style lang="scss"></style>
