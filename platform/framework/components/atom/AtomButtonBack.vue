<template>
  <AtomButton v-if="hasHistory" primary outline @click="goBack"
    >Go back</AtomButton
  >
</template>

<script setup lang="ts">
const { hasHistory, goBack } = useRouting()
</script>
