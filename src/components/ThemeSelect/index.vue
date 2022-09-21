<script lang="ts" setup>
import { ElTooltip, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { useI18n } from '@/hooks/useI18n'
import SelectColor from './components/SelectColor.vue';
import { ref } from 'vue';

const { t } = useI18n()

const selectColorVisible = ref(false)
const handleSetTheme = (command: string) => {
  selectColorVisible.value = true
}
</script>

<template>
  <!-- 主题图标 -->
  <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetTheme">
    <div>
      <el-tooltip :content="t('navBar.themeChange')">
        <svg-icon icon="change-theme" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ t('theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 展示弹出层 -->
  <div>
    <SelectColor v-model="selectColorVisible"></SelectColor>
  </div>
</template>