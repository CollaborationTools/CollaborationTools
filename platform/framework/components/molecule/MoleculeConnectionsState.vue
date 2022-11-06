<template>
  <div v-if="isDebug" class="dropdown dropdown-end">
    <div class="indicator">
      <span
        class="indicator-item indicator-bottom bottom-2 right-2 badge badge-secondary"
        >{{ activeConnections.length }}</span
      >
      <button class="btn btn-circle btn-ghost" data-id="connection-stats">
        <AtomIcon name="team" class="w-8 h-8" />
      </button>
    </div>
    <ul
      class="menu dropdown-content mt-6 p-2 shadow bg-white dark:bg-base-300 rounded-box min-w-max max-w-sm"
    >
      <li
        v-for="connection in activeConnections"
        :key="connection.id"
        :data-uuid="connection.id"
        class="text-center py-2"
      >
        {{ getName(connection.remoteDeviceId) }}
      </li>
      <li v-if="activeConnections.length > 0" class="divider"></li>
      <li>
        <button class="btn btn-ghost" @click="logConnections">
          Log connections state
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getActiveConnectionsFrom } from 'services/p2p'
import useUserStore from 'stores/useUserStore'

const isDebug = useUserStore().getIsDebug()
const allConnections = useConnectionHub().getConnections()
const activeConnections = $computed(() =>
  allConnections ? getActiveConnectionsFrom(allConnections) : [],
)
const getName = useOrganisationMembers().getOrgMemberNameByDeviceId
const logConnections = (): void =>
  // eslint-disable-next-line no-console
  console.log('all connections', allConnections)
</script>

<style scoped lang="postcss">
.divider:after {
  @apply hidden;
}
</style>
