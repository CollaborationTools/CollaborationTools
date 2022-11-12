<template>
  <div :class="{ 'tooltip tooltip-right z-10': !!name }" :data-tip="name">
    <AtomButtonBase
      :to="to"
      class="btn btn-ghost h-16 w-16 bg-base-100 shadow-md rounded-xl text-xl"
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
