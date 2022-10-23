<template>
  <SvgIcon />
</template>

<script lang="ts">
const icons = {
  chat: import('~icons/fluent/chat-multiple-20-regular'),
  'chevron-down': import('~icons/fluent/chevron-down-24-filled'),
  home: import('~icons/fluent/home-28-regular'),
  info: import('~icons/fluent/info-28-regular'),
  moon: import('~icons/fluent/weather-moon-28-regular'),
  person: import('~icons/fluent/person-circle-20-regular'),
  plus: import('~icons/fluent/add-24-filled'),
  sun: import('~icons/fluent/weather-sunny-28-regular'),
  team: import('~icons/fluent/people-team-28-regular'),
} as const

export type AvailableIcon = keyof typeof icons
</script>

<script setup lang="ts">
type Props = {
  name: AvailableIcon
}

const props = defineProps<Props>()

const iconBody = await icons[props.name]
const SvgIcon = defineComponent(iconBody.default)
</script>
