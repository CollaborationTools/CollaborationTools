<template>
  <component
    :is="to ? Link : 'button'"
    :to="to"
    :role="to ? 'button' : undefined"
    :class="{
      btn: true,
      'btn-accent': accent && !secondary && !primary && !error,
      'btn-secondary': secondary && !primary && !error,
      'btn-primary': primary && !outline && !error,
      ['bg-transparent ' +
      'text-primary dark:text-violet-400 ' +
      'border-primary dark:border-violet-400 ' +
      'hover:text-white dark:hover:text-white ' +
      'hover:bg-primary-focus dark:hover:bg-primary-focus ' +
      'hover:border-transparent dark:hover:border-transparent']:
        primary && outline && !error,

      'btn-error hover:bg-red-400 dark:hover:bg-red-900': error,
      'btn-disabled text-gray-600 dark:text-gray-300': disabled,
      'btn-block': fullWidth,
    }"
    ><slot
  /></component>
</template>

<script setup lang="ts">
type Props = {
  to?: string
  primary?: boolean
  secondary?: boolean
  accent?: boolean
  error?: boolean
  outline?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

defineProps<Props>()

const Link = defineNuxtLink({
  componentName: 'NuxtButtonLink',
  externalRelAttribute: '',
  activeClass: '',
  exactActiveClass: '',
})
</script>
