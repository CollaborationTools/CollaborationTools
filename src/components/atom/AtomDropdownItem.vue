<template>
  <li>
    <NuxtLink :to="url" :class="{ 'justify-between': badge }">
      <slot />
      <span v-if="badge" class="badge badge-secondary font-semibold">{{
        badge
      }}</span>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
type Props = {
  url?: string
  badge?: string | number
}

const props = defineProps<Props>()
</script>
