<template>
  <component
    :is="url ? NuxtLink : 'div'"
    v-if="member"
    :to="url"
    :role="url ? 'button' : undefined"
    :class="{
      'flex flex-row gap-4 p-4 no-underline': true,
      'hover:bg-base-content/10 hover:rounded-xl': !!url,
    }"
  >
    <div
      class="grid w-24 h-24 rounded-full bg-white dark:bg-base-300 place-content-center place-self-end"
    >
      <AtomIcon name="person" class="w-14 h-14 text-accent" />
    </div>
    <div>
      <h3 class="!mt-3 sm:!mt-2">{{ member.name }}</h3>
      <div>since {{ new Date(member.joiningDate).toDateString() }}</div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { Member } from 'core/space'

type Props = {
  member: Member
  url?: string
}

const { member, url } = defineProps<Props>()

const NuxtLink = defineNuxtLink({
  componentName: 'MemberLink',
})
</script>
