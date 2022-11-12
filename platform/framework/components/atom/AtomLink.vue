<template>
  <NuxtLink :to="to" role="button">
    <div class="flex flex-row items-center gap-2">
      <AtomIcon v-if="icon" :name="icon" class="h-8 w-8" />
      <span>{{ label }}</span>
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
