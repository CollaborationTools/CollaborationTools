<template>
  <div class="grid h-screen place-items-center p-8 sm:p-16">
    <main class="flex flex-col md:flex-row gap-4">
      <div class="prose prose-sm md:prose-base">
        <h2 class="mt-0">Create new organisation<AtomDot /></h2>
        <p class="border-info md:border-l-4 md:pl-4">
          Organisation is a&nbsp;space where you might use
          Collaboration&nbsp;Tools together with&nbsp;others.<br />
          When you create an organisation it does not leave your device until
          you start inviting people to join your group. It means you might
          safely create a&nbsp;new one, just experiment with it and no&nbsp;one
          will know.
        </p>
        <AtomButton primary full-width data-id="create-org"
          >Create org</AtomButton
        >
      </div>
      <div class="divider md:divider-horizontal">OR</div>
      <div class="prose prose-sm md:prose-base">
        <h2 class="mt-0">Join existing organisation<AtomDot /></h2>
        <p class="border-info md:border-l-4 md:pl-4">
          When you know that there is already an organisation that you would
          like to join you should ask any org member to give you an&nbsp;invite
          link. There is no&nbsp;other way to join an&nbsp;existing
          organisation.<br />
          In the meanwhile, you can create a&nbsp;new organisation to get
          familiar with Collaboration&nbsp;Tools.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts"></script>
