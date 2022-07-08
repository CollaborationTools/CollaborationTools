<template>
  <header class="navbar bg-white dark:bg-base-300 shadow">
    <h1 class="flex-1 px-4 text-xl">{{ orgName }}<AtomDot /></h1>
    <div class="flex-none">
      <MoleculeColorMode />
    </div>
  </header>
</template>

<script setup lang="ts">
type Props = {
  orgName: string
}

const props = defineProps<Props>()
</script>
