<template>
  <div class="flex flex-row gap-4">
    <div
      class="grid w-24 h-24 rounded-full bg-white dark:bg-base-300 place-content-center place-self-end"
    >
      <AtomIcon name="person" class="w-14 h-14 text-accent" />
    </div>
    <div>
      <h3 class="!mt-3 sm:!mt-2">{{ member.name }}</h3>
      <div>since {{ new Date(member.joiningDate).toDateString() }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Member } from 'core/user'

type Props = {
  member: Member
}

const { member } = defineProps<Props>()
</script>
