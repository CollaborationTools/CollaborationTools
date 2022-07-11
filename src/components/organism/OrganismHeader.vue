<template>
  <header class="navbar bg-white dark:bg-base-300 shadow">
    <div class="flex-1">
      <MoleculeDropdownNav :recent-orgs="recentOrgs" />
    </div>
    <div class="flex-none">
      <MoleculeColorMode />
    </div>
  </header>
</template>

<script setup lang="ts">
import { RecentOrgWithLink } from '@/layouts/org.vue'

type Props = {
  recentOrgs: RecentOrgWithLink[]
}

const props = defineProps<Props>()
</script>
