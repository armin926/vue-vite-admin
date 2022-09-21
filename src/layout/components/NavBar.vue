<script lang="ts" setup>
import { useUserStoreExternal } from '@/store/modules/user'
import { computed, ref, watch } from 'vue';
import { Tools } from '@element-plus/icons-vue'
import { ElAvatar, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import Hamburger from '@/components/Hamburger.vue';
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import LangSelect from '@/components/LangSelect/index.vue'
import { useRoute } from 'vue-router'
import { useI18n } from '@/hooks/useI18n'


const useStore = useUserStoreExternal()

const { t } = useI18n()

const userInfo = computed(() => {
  return useStore.getUserInfo
})

const logout = () => {
  useStore.logout()
}

const route = useRoute()
// 生成数组数据
const breadcrumbData = ref<any>([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(item => item.meta && item.meta.title)
}
// 监听路由变化时触发
watch(route, () => {
  getBreadcrumbData()
},{ immediate: true})

</script>

<template>
  <div class="navbar">
    <Hamburger class="hamburger-container" />
    <Breadcrumb class="breadcrumb-container" :breadcrumbData="breadcrumbData" />
    <div class="right-menu">
      <lang-select class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="userInfo.avatar"
          ></el-avatar>
          <Tools style="width: 1em; height: 1em; margin-right: 8px;" />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ t('navBar.home') }} </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>{{ t('navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              {{ t('navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
      }
    }

    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          background: transparent;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>