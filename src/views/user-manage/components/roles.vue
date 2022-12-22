<template>
  <el-dialog
    :title="t('excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
  <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ t("universal.cancel") }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          t("universal.confirm")
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import { ElDialog, ElCheckboxGroup, ElCheckbox, ElMessage } from 'element-plus';
import { useI18n } from "@/hooks/useI18n"
import { roleList } from '@/api/role'
import { updateRole, userRoles } from '@/api/user-manage';

const { t } = useI18n()
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(["update:modelValue", "updateRole"])

// 所有角色
const allRoleList = ref<any>([])
// 获取所有角色数据的方法
const getListData = async () => {
  allRoleList.value = await roleList()
}

getListData()
// 当前用户角色
const userRoleTitleList = ref([])
// 获取当前用户角色
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item: { title: any; }) => item.title)
}
watch(
  () => props.userId,
  (val: any) => {
    if (val) getUserRoles()
  }
)

/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  // 处理数据结构
  const roles = userRoleTitleList.value.map(title => {
    return allRoleList.value.find((role: { title: any; }) => role.title === title)
  })
  await updateRole(props.userId, roles)

  ElMessage.success(t('role.updateRoleSuccess'))
  // 角色更新成功
  emits('updateRole')
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits("update:modelValue", false)
}
</script>

<style lang="scss" scoped></style>
