<template>
  <component
    :is="to ? Link : 'button'"
    :to="to"
    :role="to ? 'button' : undefined"
    :class="[
      'btn',
      { 'btn-accent': accent && !primary && !secondary },
      { 'btn-secondary': secondary && !primary },
      { 'btn-primary': !outline && primary },
      outline && primary
        ? 'btn bg-transparent ' +
          'text-primary dark:text-violet-400 ' +
          'border-primary dark:border-violet-400 ' +
          'hover:text-white dark:hover:text-white ' +
          'hover:bg-violet-900 dark:hover:bg-violet-900 ' +
          'hover:border-transparent dark:hover:border-transparent'
        : '',
      { 'btn-disabled text-gray-600 dark:text-gray-300': disabled },
      { 'min-w-full': fullWidth },
    ]"
    ><slot
  /></component>
</template>

<script setup lang="ts">
type Props = {
  to?: string
  primary?: boolean
  secondary?: boolean
  accent?: boolean
  outline?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

defineProps<Props>()

const Link = defineNuxtLink({
  componentName: 'AtomButtonLink',
  externalRelAttribute: '',
  activeClass: '',
  exactActiveClass: '',
})
</script>
