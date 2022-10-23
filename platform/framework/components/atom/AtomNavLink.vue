<template>
  <NavLink
    :to="to"
    role="button"
    :class="{
      'nav-link flex-1 grid place-items-center place-self-center hover:text-secondary-focus': true,
    }"
  >
    <div class="flex flex-col items-center">
      <slot />
      <span v-if="label">{{ label }}</span>
    </div>
  </NavLink>
</template>

<script setup lang="ts">
type Props = {
  to: string
  label?: string
}

defineProps<Props>()

const NavLink = defineNuxtLink({
  componentName: 'NuxtNavLink',
  externalRelAttribute: '',
  activeClass: 'active-nav',
  exactActiveClass: 'exact-nav',
})
</script>

<style scoped lang="postcss">
.nav-link:active:hover,
.nav-link:active:focus {
  animation: none;
}
.nav-link:active:hover,
.nav-link:active:focus {
  transform: scale(var(--btn-focus-scale, 0.95));
}

.active-nav {
  @apply text-secondary;
}
</style>
