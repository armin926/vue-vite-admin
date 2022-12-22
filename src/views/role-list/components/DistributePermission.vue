<template>
  <el-dialog
    :title="t('excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defualtProps"
    ></el-tree>

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
import { defineProps, defineEmits, ref, watch } from "vue"
import { ElDialog, ElTree, ElMessage } from "element-plus"
import { useI18n } from "@/hooks/useI18n"
import { permissionList } from "@/api/permission"
import { rolePermission, distributePermission } from "@/api/role";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(["update:modelValue"])

const { t } = useI18n()

// 属性结构配置
const defualtProps = {
  children: 'children',
  label: 'permissionName'
}
/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(t('role.updateRoleSuccess'))
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits("update:modelValue", false)
}

// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}
getPermissionList()

// tree节点
const treeRef = ref<any>(null)

// 获取当前用户角色的权限
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}

watch(() => props.roleId, val => {
  if (val) getRolePermission()
})
</script>
