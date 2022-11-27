<template>
  <SvgIcon />
</template>

<script setup lang="ts">
import { icons, AvailableIcon } from '@/config'

type Props = {
  name: AvailableIcon
}

const props = defineProps<Props>()

const iconBody = await icons[props.name]()
const SvgIcon = defineComponent(iconBody.default)
</script>
