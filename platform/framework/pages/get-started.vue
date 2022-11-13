<template>
  <main class="flex flex-col md:flex-row gap-4">
    <div class="flex-1 grid gap-4 prose prose-sm md:prose-base">
      <h2 class="m-0">Create new space<AtomDot /></h2>

      <AtomInfoBox
        >A&nbsp;space allows you to use Collaboration&nbsp;Tools together
        with&nbsp;others.</AtomInfoBox
      >

      <AtomInfoBox
        >Once you create a space, your data will not leave your device until you
        start inviting people to join your group. It means you might safely
        create a&nbsp;new one, just experiment with it and no&nbsp;one
        will&nbsp;know. You might also delete everything and start
        again.</AtomInfoBox
      >
      <OrganismNewSpaceSimpleForm />
    </div>

    <div class="divider md:divider-horizontal">OR</div>

    <div
      class="flex-1 grid content-start items-start gap-4 prose prose-sm md:prose-base"
    >
      <h2 class="m-0">Join existing space<AtomDot /></h2>

      <AtomInfoBox
        >When you know that there is already a space that you would like to join
        you should ask any space member to give you an&nbsp;invite link.
        <strong
          >There is no&nbsp;other way to join an&nbsp;existing space.</strong
        ></AtomInfoBox
      >

      <AtomInfoBox
        >In the meanwhile, you can create a&nbsp;new space to get familiar with
        Collaboration&nbsp;Tools.</AtomInfoBox
      >

      <AtomButton
        :to="visitorRoutes.guideJoinSpace"
        primary
        outline
        class="mb-8"
        >Learn more</AtomButton
      >
    </div>
  </main>
</template>

<script setup lang="ts">
import { visitorRoutes } from '@/config'

useHead({
  title: 'Get started',
})

definePageMeta({
  layout: 'center',
  middleware: ['open-current-space-if-exists'],
})
</script>
