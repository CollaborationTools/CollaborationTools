<template>
  <div v-if="connections" class="dropdown dropdown-end">
    <div class="indicator">
      <span
        class="indicator-item indicator-bottom bottom-2 right-2 badge badge-secondary"
        >{{ connections.size }}</span
      >
      <button class="btn btn-circle btn-ghost" data-id="connection-stats">
        <AtomIcon name="team" class="w-8 h-8" />
      </button>
    </div>
    <ul
      class="menu dropdown-content mt-6 p-2 shadow bg-white dark:bg-base-300 rounded-box min-w-max max-w-sm"
    >
      <li
        v-for="connection in connections.values()"
        :key="connection.id"
        :data-uuid="connection.id"
      >
        {{ getName(connection.remoteDeviceId) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const connections = useConnectionHub().getConnections()
const getName = useOrganisationMembers().getOrgMemberNameByDeviceId
</script>
