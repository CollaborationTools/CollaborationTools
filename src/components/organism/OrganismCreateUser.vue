<template>
  <div class="contents">
    <MoleculeModal
      v-model="isModalOpen"
      label="Create profile"
      data-id="create-profile"
      @cancel="resetFields"
      @confirm="createProfile"
    >
      <h3 class="font-bold text-lg text-center">Create your profile</h3>
      <AtomInput
        v-model="state.profileName"
        label="Full name"
        data-id="user-name-field"
        :errors="v$.profileName.$errors"
        @blur="v$.profileName.$touch"
      />
      <AtomInput
        v-model="state.displayName"
        label="Display name in current organisation (optional, if different than full name)"
        data-id="display-name-field"
      />
    </MoleculeModal>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import useOrganisationStore from '@/stores/useOrganisationStore'
import useUserStore from '@/stores/useUserStore'

const isModalOpen = ref(false)

const userStore = useUserStore()
const { addNewOrganisationMember } = useOrganisationMembers()

const state = reactive({
  displayName: '',
  profileName: '',
})
const rules = {
  profileName: { required },
}

const v$ = useVuelidate(rules, state)

const resetFields = (): void => {
  state.displayName = ''
  state.profileName = ''
  v$.value.$reset()
}

const createProfile = async (): Promise<void> => {
  const result = await v$.value.$validate()
  const currentOrganisation = useOrganisationStore().getCurrentOrganisation()
  if (!result || currentOrganisation === null) {
    return
  }

  const user = userStore.setMe(state.profileName)

  const displayName =
    state.displayName.length > 0 ? state.displayName : undefined

  addNewOrganisationMember(user, currentOrganisation.id, {
    role: 'admin',
    displayName,
  })

  isModalOpen.value = false
}
</script>
