<template>
  <div class="grid h-screen place-items-center">
    <main class="flex flex-col gap-2 prose">
      <AtomLogo with-header />
      <AtomButton primary>Get started</AtomButton>
      <AtomButton primary outline>Learn more</AtomButton>
      <AtomButton secondary disabled>Browse tools</AtomButton>
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Welcome',
})
</script>
