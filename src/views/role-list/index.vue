<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column :label="t('role.index')" type="index" width="120" />
        <el-table-column :label="t('role.name')" prop="title" />
        <el-table-column :label="t('role.desc')" prop="describe" />
        <el-table-column :label="t('role.action')" prop="action" width="260">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onDistributePermissionClick(row)" v-permission="['distributePermission']">{{ t('role.assignPermissions') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission v-model="distributePermissionVisible" :role-id="selectRoleId" />
  </div>
</template>

<script lang="ts" setup>
import { roleList } from '@/api/role';
import { ref } from 'vue'
import { ElCard, ElTable, ElTableColumn } from 'element-plus'
import DistributePermission from './components/DistributePermission.vue';
import { useI18n } from '@/hooks/useI18n'

const { t } = useI18n()

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}

getRoleList()

/**
 * 分配权限
 */
const distributePermissionVisible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = (row: any) => {
  distributePermissionVisible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped></style>
