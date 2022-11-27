<template>
  <div class="grid grid-cols-1 gap-4 w-full">
    <MoleculeChatSearch @search="refreshSearch" />
    <MoleculeFoundItems :items="foundMembers" />
  </div>
</template>

<script setup lang="ts">
import useChats from 'composables/useChats'
import { MemberId } from 'core/space'
import useSpaceStore from 'stores/useSpaceStore'
import useUserStore from 'stores/useUserStore'

import MoleculeChatSearch from './components/MoleculeChatSearch.vue'
import MoleculeFoundItems from './components/MoleculeFoundItems.vue'
import { ChatItem } from './core/ChatItem'

let searchString = $ref('')
const currentSpace = $computed(() => useSpaceStore().getCurrentSpace())
const members = useUserStore().getMembers(currentSpace?.id ?? '', {
  excludeSelf: true,
})

const startChatWith = (memberId: MemberId): void =>
  useChats().startChatWith(memberId, currentSpace?.id ?? '')

const foundMembers = $computed<ChatItem[]>(
  () =>
    members
      ?.filter((member) => member.name.includes(searchString))
      .map((member) => ({
        action: (): void => startChatWith(member.id),
        id: member.id,
        name: member.name,
        type: 'member',
      })) ?? [],
)

const refreshSearch = (newSearchString: string): void => {
  searchString = newSearchString
}
</script>
