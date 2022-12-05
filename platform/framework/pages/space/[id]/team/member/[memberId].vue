<template>
  <div class="flex flex-col lg:flex-row gap-4 w-full">
    <div v-if="member" class="flex-1 prose prose-sm md:prose-base">
      <MoleculeMember :member="member" />
    </div>
    <div class="flex-1">
      <template v-if="isMe">
        <AtomButton primary outline full-width :to="privateRoutes.profile">
          My profile
        </AtomButton>
      </template>
      <template v-else>
        <AtomButton primary outline full-width @click="startChat">
          Chat
        </AtomButton>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { privateRoutes } from '@/config'
import useChats from 'composables/useChats'
import useRouting from 'composables/useRouting'
import useSpaceStore from 'stores/useSpaceStore'
import useUserStore from 'stores/useUserStore'

const maybeMemberId = $computed(
  () => useRouting().getRouteParameter('memberId').value,
)

const currentSpace = $computed(() => useSpaceStore().getCurrentSpace())
const member = $computed(() =>
  useUserStore().getMember(currentSpace?.id ?? '', maybeMemberId ?? ''),
)
const isMe = $computed(() => useUserStore().getMe()?.id === member?.id)

const startChat = (): void => {
  if (member && currentSpace) {
    useChats().startChatWith(member.id, currentSpace.id)
  }
}

useHead({
  title: `${member?.name} | ${currentSpace?.name}`,
})

definePageMeta({
  layout: 'space',
})
</script>
