<template>
  <footer
    class="flex place-self-center fixed max-w-3xl md:max-w-2xl lg:max-w-4xl w-full h-16 bottom-0 md:bottom-2 md:rounded-2xl bg-white dark:bg-base-300 md:shadow-xl"
  >
    <AtomNavLink
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :label="link.label"
    >
      <AtomIcon :name="link.icon" class="h-6 w-6" />
    </AtomNavLink>
  </footer>
</template>

<script setup lang="ts">
import { NavLink } from '@/composable/useRouting'

type Props = {
  links: NavLink[]
}

const props = defineProps<Props>()
</script>
