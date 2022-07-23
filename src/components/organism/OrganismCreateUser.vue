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
        v-model="state.preferredName"
        label="Display name in current organisation (optional, if different than full name)"
        data-id="display-name-field"
      />
    </MoleculeModal>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import { createOrganisationMember } from '@/core/user'
import useOrganisations from '@/stores/useOrganisations'
import useUsers from '@/stores/useUsers'

const isModalOpen = ref(false)

const userStore = useUsers()

const state = reactive({
  preferredName: '',
  profileName: '',
})
const rules = {
  profileName: { required },
}

const v$ = useVuelidate(rules, state)

const resetFields = (): void => {
  state.preferredName = ''
  state.profileName = ''
  v$.value.$reset()
}

const createProfile = async (): Promise<void> => {
  const result = await v$.value.$validate()
  const currentOrganisation = useOrganisations().getCurrentOrganisation()
  if (!result || currentOrganisation === null) {
    return
  }

  const user = userStore.setMe(state.profileName)

  const preferredName =
    state.preferredName.length > 0 ? state.preferredName : undefined
  const organisationMember = createOrganisationMember(
    user,
    'admin',
    preferredName,
  )
  userStore.setOrganisationMember(currentOrganisation.id, organisationMember)

  isModalOpen.value = false
}
</script>
