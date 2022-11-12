<template>
  <div :class="{ 'tooltip tooltip-right z-10': !!name }" :data-tip="name">
    <AtomButtonBase
      :to="to"
      class="btn btn-ghost h-14 w-14 p-2 bg-base-100 shadow-md rounded-xl text-lg"
    >
      <slot />
    </AtomButtonBase>
  </div>
</template>

<script setup lang="ts">
type Props = {
  name?: string
  to?: string
}

defineProps<Props>()
</script>

<style scoped lang="postcss">
.active-nav {
  @apply text-secondary;
}
</style>
