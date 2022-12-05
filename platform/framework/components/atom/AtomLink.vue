<template>
  <NuxtLink :to="to" role="button" class="p-2">
    <div class="flex flex-row items-center gap-2 w-full">
      <AtomIcon v-if="icon" :name="icon" class="h-7 w-7" />
      <span>{{ label }}</span>
      <slot />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { AvailableIcon } from '@/config'

type Props = {
  label: string
  to: string
  icon?: AvailableIcon
}

defineProps<Props>()

const NuxtLink = defineNuxtLink({
  componentName: 'NuxtLink',
  externalRelAttribute: '',
  activeClass: 'active-link',
  exactActiveClass: 'exact-link',
})
</script>

<style scoped lang="postcss">
.active-link {
  @apply text-secondary;
}
</style>
