<template>
  <NuxtLayout name="center">
    <main
      class="flex flex-col max-w-md prose prose-sm md:prose-base text-center"
    >
      <h2
        class="!mb-3 font-extrabold !text-9xl text-gray-300 dark:text-gray-600"
      >
        <span class="sr-only">Error</span>
        404
      </h2>
      <p class="!mb-0 text-2xl font-semibold md:text-3xl">
        Sorry, we couldn't find this page<AtomDot />
      </p>
      <p>But don't worry, you can find plenty of other things around.</p>
      <div>
        <AtomBackButton class="mr-4" />
        <AtomButton to="/" primary outline class="m-4"
          >Go to homepage</AtomButton
        >
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: 'Page not found - Collaboration Tools',
})
</script>
