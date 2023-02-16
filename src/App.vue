<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import { useThemeStoreExternal } from '@/store/modules/theme'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { useTitle } from '@/hooks/web/useTitle'
const useThemeStore = useThemeStoreExternal()

generateNewStyle(useThemeStore.getMainColor).then((newStyleText) => {
  writeNewStyle(newStyleText)
})

// 监听页面变化和动态改变站点标题
useTitle()
</script>

<template>
  <el-config-provider>
    <RouterView />
  </el-config-provider>
</template>

<style lang="scss"></style>
