<template>
  <AtomButton v-if="hasHistory" primary outline @click="goBack"
    >Go back</AtomButton
  >
</template>

<script setup lang="ts">
import useRouting from 'composables/useRouting'

const { hasHistory, goBack } = useRouting()
</script>
