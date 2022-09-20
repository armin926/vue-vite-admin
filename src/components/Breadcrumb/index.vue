<script lang="ts" setup>
import { ref } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { usePublicStoreExternal } from '@/store/modules/public'

defineProps({
  breadcrumbData: {
    type: Array<any>,
    required: true
  }
})
// 处理点击事件
const router = useRouter()
const onLinkClick = (item: RouteRecordRaw) => {
  console.log(item)
  router.push(item.path)
}

// 将来需要进行主题替换，所以这里获取下动态样式
const usePublicStore = usePublicStoreExternal()

const linkHoverColor = ref(usePublicStore.getCss.menuBg)
</script>
<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
          item.meta.title
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: bold;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
