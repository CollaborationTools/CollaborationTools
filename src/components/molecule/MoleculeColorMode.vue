<template>
  <label class="swap swap-rotate mx-4">
    <input type="checkbox" :checked="isLightMode" @change="setColorMode" />
    <AtomIcon name="sun" class="swap-on w-6 h-6" />
    <AtomIcon name="moon" class="swap-off w-6 h-6" />
    <span class="sr-only">Color mode</span>
  </label>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isLightMode = computed(() => colorMode.preference === 'light')
const setColorMode = (event: Event): void => {
  colorMode.preference = (event.target as HTMLInputElement).checked
    ? 'light'
    : 'dark'
}
</script>
