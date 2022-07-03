<template>
  <div class="grid h-screen place-items-center p-16">
    <main class="flex flex-col gap-2 prose">
      <AtomLogo with-header />
      <AtomButton to="/org" primary data-id="get-started"
        >Get started</AtomButton
      >
      <AtomButton to="/guide" primary outline data-id="learn-more"
        >Learn more</AtomButton
      >
      <AtomButton to="/tools" secondary disabled data-id="browse-tools"
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
