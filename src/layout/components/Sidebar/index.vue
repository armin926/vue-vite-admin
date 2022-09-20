<script lang="ts" setup>
import SidebarMenu from './SidebarMenu.vue';
import { useAppStoreExternal } from '@/store/modules/app'
import { ElAvatar } from 'element-plus'

const logoHeight = 44

const useAppStore = useAppStoreExternal()

</script>

<template>
  <div class="">
    <!-- https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png -->
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13536697075%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666167799&t=f204e1fcd96730a6c7b109b63cfd1c4f"
      />
      <h1 class="logo-title" v-if="useAppStore.getSidebarOpened">
       vue3-admin
      </h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>