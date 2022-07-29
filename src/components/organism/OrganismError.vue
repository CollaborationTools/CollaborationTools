<template>
  <main class="flex flex-col max-w-md prose prose-sm md:prose-base text-center">
    <h2 class="!mb-3 font-extrabold !text-9xl text-gray-300 dark:text-gray-600">
      <span class="sr-only">Error</span>
      {{ error }}
    </h2>
    <p class="!mb-0 text-2xl font-semibold md:text-3xl">
      {{ errorMessage }}<AtomDot />
    </p>
    <p>{{ recommendedAction }}</p>
    <div>
      <AtomBackButton class="mr-4" />
      <AtomButton to="/" primary outline class="m-4">Go to homepage</AtomButton>
    </div>
  </main>
</template>

<script setup lang="ts">
type Props = {
  error: string
  errorMessage: string
  recommendedAction: string
}

defineProps<Props>()
</script>
