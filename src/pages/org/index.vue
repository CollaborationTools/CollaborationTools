<template>
  <main class="flex flex-col md:flex-row gap-4">
    <div class="flex-1 grid gap-4 prose prose-sm md:prose-base">
      <h2 class="m-0">Create new organisation<AtomDot /></h2>

      <AtomInfoBox
        >Organisation is a&nbsp;space where you might use
        Collaboration&nbsp;Tools together with&nbsp;others.</AtomInfoBox
      >

      <AtomInfoBox
        >Once you create an organisation, your data will not leave your device
        until you start inviting people to join your group. It means you might
        safely create a&nbsp;new one, just experiment with it and no&nbsp;one
        will&nbsp;know. You might also delete everything and start
        again.</AtomInfoBox
      >

      <form class="grid gap-4">
        <AtomInput
          v-model="state.orgName"
          label="Name of the organisation"
          data-id="org-name"
          :errors="v$.orgName.$errors"
          @blur="v$.orgName.$touch"
        />
        <AtomButton
          type="submit"
          primary
          data-id="create-org"
          @click.prevent="createOrg()"
          >Create org</AtomButton
        >
      </form>
    </div>

    <div class="divider md:divider-horizontal">OR</div>

    <div
      class="flex-1 grid content-start items-start gap-4 prose prose-sm md:prose-base"
    >
      <h2 class="m-0">Join existing organisation<AtomDot /></h2>

      <AtomInfoBox
        >When you know that there is already an organisation that you would like
        to join you should ask any org member to give you an&nbsp;invite link.
        <strong
          >There is no&nbsp;other way to join an&nbsp;existing
          organisation.</strong
        ></AtomInfoBox
      >

      <AtomInfoBox
        >In the meanwhile, you can create a&nbsp;new organisation to get
        familiar with Collaboration&nbsp;Tools.</AtomInfoBox
      >

      <AtomButton to="/guide/joining-organisation" primary outline class="mb-8"
        >Learn more</AtomButton
      >
    </div>
  </main>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import useOrganisations from '@/composable/useOrganisations'
import useRouting from '@/composable/useRouting'

definePageMeta({
  layout: 'center',
  middleware: ['current-org'],
  title: 'Get started',
})

const state = reactive({
  orgName: '',
})
const rules = {
  orgName: { required },
}

const v$ = useVuelidate(rules, state)

const createOrg = async (): Promise<void> => {
  const result = await v$.value.$validate()
  if (!result) {
    return
  }

  const org = useOrganisations().addOrganisation(state.orgName)
  useRouting().openOrganisation(org.id)
}
</script>
