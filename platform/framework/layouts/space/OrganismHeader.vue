<template>
  <header class="navbar h-20 min-w-40 bg-stone-50 dark:bg-base-200 shadow-b">
    <div>
      <AtomButtonSpace
        class="md:hidden text-secondary"
        data-id="sidebar-toggle"
        @click.stop="toggleSidebar"
      >
        {{ useSpaces().getAbbreviation(currentSpace?.name) }}
      </AtomButtonSpace>
    </div>
    <div class="flex-1 min-w-min">
      <div class="w-40 px-4 prose text-xl font-medium truncate">
        {{ getSpaceLinkLabelForPath(route.path, currentSpace?.id) }}
      </div>
    </div>
    <div>
      <MoleculeConnectionsState />
      <MoleculeColorMode />
    </div>
  </header>
</template>

<script setup lang="ts">
import useSpaces from '@/composables/useSpaces'
import useSpaceStore from '@/stores/useSpaceStore'
import useRouting, { getSpaceLinkLabelForPath } from 'composables/useRouting'

import AtomButtonSpace from './AtomButtonSpace.vue'
import MoleculeColorMode from './MoleculeColorMode.vue'
import MoleculeConnectionsState from './MoleculeConnectionsState.vue'

const route = useRouting().getRoute()

type Props = {
  isSidebarVisible: boolean
}

type Emits = {
  (event: 'toggleSidebar'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const toggleSidebar = (): void => emit('toggleSidebar')

const currentSpace = $computed(() => useSpaceStore().getCurrentSpace())
</script>
