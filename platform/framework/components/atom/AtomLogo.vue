<template>
  <div>
    <component
      :is="isThemeLight ? LogoLight : LogoDark"
      alt="logo"
      class="mb-8 mx-auto w-40 sm:w-52"
    />

    <h1 v-if="withHeader" class="text-violet-800 dark:text-white text-center">
      Collaboration Tools
    </h1>
  </div>
</template>

<script setup lang="ts">
import LogoLight from '@/assets/images/logo-light.svg?component'
import LogoDark from '@/assets/images/logo.svg?component'

const colorMode = useColorMode()
const isThemeLight = colorMode.value === 'light'

defineProps<{
  withHeader?: boolean
}>()
</script>
