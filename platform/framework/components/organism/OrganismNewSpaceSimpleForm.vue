<template>
  <form class="contents">
    <AtomInput
      v-model="state.spaceName"
      label="Name of the space"
      data-id="space-name-field"
      :errors="v$.spaceName.$errors"
      @blur="v$.spaceName.$touch"
    />
    <AtomButton
      type="submit"
      primary
      data-id="create-space"
      @click.prevent="createSpace()"
      >Create space</AtomButton
    >
  </form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import useSpaceStore from '@/stores/useSpaceStore'

const state = reactive({
  spaceName: '',
})
const rules = {
  spaceName: { required },
}

const v$ = useVuelidate(rules, state)

const createSpace = async (): Promise<void> => {
  const result = await v$.value.$validate()
  if (!result) {
    return
  }

  const space = useSpaceStore().addSpace(state.spaceName)
  useRouting().openSpace(space.id)
}
</script>
