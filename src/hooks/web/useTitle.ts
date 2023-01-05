import { watch, unref } from 'vue';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { settings } from '@/setting'

/**
 * 监听页面变化和动态改变站点标题
 */
export function useTitle() {
  const title = settings.title;
  const { currentRoute } = useRouter();
  
  const pageTitle = usePageTitle();

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute);

      if (route.name === 'redirect') {
        return;
      }

      const tTitle = route?.meta?.title as string;
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true },
  );
}
