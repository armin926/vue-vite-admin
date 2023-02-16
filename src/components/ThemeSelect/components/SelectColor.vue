<script lang="ts" setup>
import { ElDialog, ElColorPicker } from 'element-plus'
import { useI18n } from '@/hooks/useI18n'
import { ref } from 'vue'
import { useThemeStoreExternal } from '@/store/modules/theme'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const { t } = useI18n()

const useThemeStore = useThemeStoreExternal()

// 默认色值
const mColor = ref(useThemeStore.getMainColor)

// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}
// 确定
const comfirm = async () => {
  // 获取主题色
  const newStyleText = await generateNewStyle(mColor.value)
  // 写入最新主题色
  writeNewStyle(newStyleText)
  // 保存最新主题色
  useThemeStore.setMainColor(mColor.value)
  closed()
}
</script>

<template>
  <el-dialog title="提示" :model-value="modelValue" @close="closed" width="22%">
    <div class="center">
      <p class="title">{{ t('theme.themeColorChange') }}</p>
      <el-color-picker v-model="mColor" :predefine="predefineColors"></el-color-picker>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ t('universal.cancel') }}</el-button>
        <el-button type="primary" @click="comfirm">{{ t('universal.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
