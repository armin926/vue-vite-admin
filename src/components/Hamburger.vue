<script lang="ts" setup>
import { useAppStoreExternal } from '@/store/modules/app'
import { computed } from 'vue'

const useAppStore = useAppStoreExternal()
const toggleClick = () => {
  useAppStore.triggerSidebarOpened()
}

const icon = computed(() => {
  return useAppStore.getSidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hanmburger" :icon="icon"></svg-icon>
  </div>
</template>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
