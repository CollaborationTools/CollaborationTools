<template>
  <label class="swap swap-rotate mx-4">
    <input type="checkbox" :checked="isLightMode" @change="setColorMode" />
    <IconSun class="swap-on fill-current w-6 h-6" />
    <IconMoon class="swap-off fill-current w-6 h-6" />
    <span class="sr-only">Color mode</span>
  </label>
</template>

<script setup lang="ts">
import IconMoon from 'public/icons/moon.svg?component'
import IconSun from 'public/icons/sun.svg?component'
const colorMode = useColorMode()
const isLightMode = computed(() => colorMode.preference === 'light')
const setColorMode = (event: Event): void => {
  colorMode.preference = (event.target as HTMLInputElement).checked
    ? 'light'
    : 'dark'
}
</script>
