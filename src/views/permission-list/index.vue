<template>
  <div class="">
    <el-card>
      <el-table
        :data="allPermission"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="permissionName" :label="t('permission.name')" width="180" />
        <el-table-column prop="permissionMark" :label="t('permission.mark')" width="180" />
        <el-table-column prop="permissionDesc" :label="t('permission.desc')" />
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { permissionList } from "@/api/permission"
import { ElCard, ElTable, ElTableColumn } from "element-plus"
import { useI18n } from '@/hooks/useI18n'

const { t } = useI18n()
/**
 * 权限分级：
 * 1. 一级权限为页面权限
 * permissionMark 对应 路由名称
 * 2. 二级权限为功能权限
 * permissionMark 对应 功能权限表
 */
// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}
getPermissionList()
</script>

<style lang="scss" scoped></style>
