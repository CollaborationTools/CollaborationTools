<template>
  <AtomButton v-if="hasHistory" primary outline @click="goBack"
    >Go back</AtomButton
  >
</template>

<script setup lang="ts">
const router = useRouter()
const hasHistory = !!router.options.history.state.back
const goBack = (): void => router.back()
</script>
