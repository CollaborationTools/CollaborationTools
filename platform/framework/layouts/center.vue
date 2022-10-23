<template>
  <div class="grid min-h-screen place-items-center">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
div:first-child {
  @apply p-8 sm:p-16;
}
</style>
