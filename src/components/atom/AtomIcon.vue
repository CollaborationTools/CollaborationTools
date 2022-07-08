<template>
  <SvgIcon />
</template>

<script setup lang="ts">
const icons = {
  sun: import('~icons/fluent/weather-sunny-28-regular'),
  moon: import('~icons/fluent/weather-moon-28-regular'),
  home: import('~icons/fluent/home-28-regular'),
  team: import('~icons/fluent/people-team-28-regular'),
  chat: import('~icons/fluent/chat-multiple-20-regular'),
}
export type AvailableIcon = keyof typeof icons

interface Props {
  name: AvailableIcon
}

const props = defineProps<Props>()

const iconBody = await icons[props.name]
const SvgIcon = defineComponent(iconBody.default)
</script>
