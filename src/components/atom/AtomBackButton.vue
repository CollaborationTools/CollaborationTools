<template>
  <AtomButton v-if="hasHistory" primary outline @click="goBack"
    >Go back</AtomButton
  >
</template>

<script setup lang="ts">
import useRouting from '@/composable/useRouting'

const { hasHistory, goBack } = useRouting()
</script>
