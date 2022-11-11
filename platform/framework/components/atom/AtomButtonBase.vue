<template>
  <component
    :is="to ? Link : 'button'"
    :to="to"
    :role="to ? 'button' : undefined"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type Props = {
  to?: string
}

defineProps<Props>()

const Link = defineNuxtLink({
  componentName: 'NuxtButtonLink',
  externalRelAttribute: '',
  activeClass: '',
  exactActiveClass: '',
})
</script>
