<template>
  <div
    v-if="spaceId"
    class="grid gap-2 prose prose-sm md:prose-base mx-auto"
    data-id="members"
  >
    <h2 class="text-center">Members</h2>
    <MoleculeMember
      v-for="member in members"
      :key="member.id"
      :member="member"
      :url="getPath(spaceId, member.id)"
    />
  </div>
</template>

<script setup lang="ts">
import useMembers from 'composables/useMembers'
import { Members, SpaceId } from 'core/space'

type Props = {
  members: Members
  spaceId?: SpaceId
}

const getPath = useMembers().getMemberPath
const { members, spaceId } = defineProps<Props>()
</script>
