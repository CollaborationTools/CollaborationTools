<template>
  <header class="navbar bg-white dark:bg-base-300 shadow">
    <div class="flex-1">
      <MoleculeDropdownNav :org-name="orgName" />
    </div>
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
