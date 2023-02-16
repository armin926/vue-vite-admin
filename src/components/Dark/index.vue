<template>
  <div>
    <el-switch
      type="small"
      v-model="isDark"
      inline-prompt
      :active-icon="Moon"
      :inactive-icon="Sunny"
    />
  </div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { ElSwitch } from 'element-plus'
import { watch } from 'vue'
import { usePublicStoreExternal } from '@/store/modules/public'

const isDark = useDark()

const usePublicStore = usePublicStoreExternal()

watch(
  () => isDark.value,
  (val) => {
    if (val) {
      usePublicStore.changeCss('#212121')
    } else {
      usePublicStore.changeCss('#001529')
    }
  },
  { immediate: true }
)
</script>
