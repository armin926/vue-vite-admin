<script lang="ts" setup>
import { ElMenu } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { usePublicStoreExternal } from '@/store/modules/public'
import { useAppStoreExternal } from '@/store/modules/app'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

const usePublicStore = usePublicStoreExternal()
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})

const useAppStore = useAppStoreExternal()
</script>
<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse="!useAppStore.getSidebarOpened"
    :default-active="activeMenu"
    :background-color="usePublicStore.getCss.menuBg"
    :text-color="usePublicStore.getCss.menuText"
    :active-text-color="usePublicStore.getCss.menuActiveText"
    :uniqueOpened="true"
    router
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>
