<template>
  <div class="grid h-screen place-items-center">
    <main class="flex flex-col gap-2 prose">
      <AtomLogo with-header />
      <AtomButton primary data-id="get-started">Get started</AtomButton>
      <AtomButton primary outline data-id="learn-more">Learn more</AtomButton>
      <AtomButton secondary disabled data-id="browse-tools"
        >Browse tools</AtomButton
      >
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Welcome',
})
</script>
