<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" v-permission="['importUser']">
          {{ t('excel.importExcel') }}</el-button
        >
        <el-button type="success">
          {{ t('excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" :label="t('excel.name')"> </el-table-column>
        <el-table-column prop="mobile" :label="t('excel.mobile')"> </el-table-column>
        <el-table-column :label="t('excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar" :preview-src-list="[row.avatar]"></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="t('excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">{{ item.title }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ t('excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openTime" :label="t('excel.openTime')">
          <template #default="{ row }">{{ $filters.dateFilter(row.openTime) }}</template>
        </el-table-column>
        <el-table-column :label="t('excel.action')" fixed="right" width="260">
          <template #default="{ row }">
            <el-button type="primary" size="small">{{ t('excel.show') }}</el-button>
            <el-button
              type="info"
              size="small"
              @click="onShowRoleClick(row)"
              v-permission="['distributeRole']"
              >{{ t('excel.showRole') }}</el-button
            >
            <el-button type="danger" size="small" v-permission="['removeUser']">{{
              t('excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <RolesDialog v-model="roleDialogVisible" :user-id="selectUserId" @updateRole="getListData" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElCard, ElTable, ElTableColumn, ElPagination, ElImage, ElTag } from 'element-plus'
import { useI18n } from '@/hooks/useI18n'
import RolesDialog from './components/roles.vue'

const { t } = useI18n()
// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()

// 监听语言切换
watchSwitchLang(getListData)

// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize: number) => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage: number) => {
  page.value = currentPage
  getListData()
}

/**
 * 查看角色的点击事件
 */
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleClick = (row: any) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}

// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
