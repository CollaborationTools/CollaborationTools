<template>
  <LogoLight v-if="isThemeLight" />
  <LogoDark v-else />
</template>

<script setup lang="ts">
import LogoLight from 'public/images/logo-light.svg?component'
import LogoDark from 'public/images/logo.svg?component'

const colorMode = useColorMode()
const isThemeLight = colorMode.value === 'light'
</script>
