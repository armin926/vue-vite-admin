<script lang="ts" setup>
import AppMain from './components/AppMain.vue';
import NavBar from './components/NavBar.vue';
import SideBar from './components/Sidebar/index.vue'
import config from '@/styles/export.module.scss'
import { useAppStoreExternal } from '@/store/modules/app'

const useAppStore = useAppStoreExternal()

</script>

<template>
  <div class="app-wrapper" :class="[useAppStore.getSidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧 menu -->
    <SideBar id="guide-sidebar" class="sidebar-container" :style="{ backgroundColor: config.menuBg }" />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 navbar -->
        <NavBar />
      </div>
      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>