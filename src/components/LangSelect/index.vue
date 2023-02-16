<script lang="ts" setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElTooltip } from 'element-plus'
import { useLocaleStore } from '@/store/modules/locale'
import { useLocale } from '@/hooks/useLocale'
import { computed, unref } from 'vue'
import { useI18n } from '@/hooks/useI18n'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value as string) !== -1
    }
  }
})

const { t } = useI18n()

const localeStore = useLocaleStore()

const langMap = computed(() => localeStore.getLocaleMap)

const currentLang = computed(() => localeStore.getCurrentLocale)

const setLang = (lang: LocaleType) => {
  if (lang === unref(currentLang).lang) return
  // 需要重新加载页面让整个语言多初始化
  window.location.reload()
  localeStore.setCurrentLocale({
    lang
  })
  const { changeLocale } = useLocale()
  changeLocale(lang)
}
</script>

<template>
  <el-dropdown trigger="click" class="international" @command="setLang">
    <div>
      <el-tooltip :content="t('navBar.lang')" :effect="effect">
        <svg-icon icon="language"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langMap"
          :key="item.lang"
          :disabled="item.lang === currentLang.lang"
          :command="item.lang"
          >{{ item.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
