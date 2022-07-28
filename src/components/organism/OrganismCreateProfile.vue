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
        v-model="state.userName"
        label="Full name"
        data-id="user-name-field"
        :errors="v$.userName.$errors"
        @blur="v$.userName.$touch"
      />
      <AtomInput
        v-model="state.displayName"
        :label="displayNameLabel"
        data-id="display-name-field"
      />
    </MoleculeModal>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

type Emits = {
  (eventName: 'update', name: string, displayName?: string): void
}

type Props = {
  displayNameLabel?: string
}

const emit = defineEmits<Emits>()
const {
  displayNameLabel = 'Display name in current organisation (optional, if different than full name)',
} = defineProps<Props>()

const isModalOpen = ref(false)

const state = reactive({
  displayName: '',
  userName: '',
})
const rules = {
  userName: { required },
}

const v$ = useVuelidate(rules, state)

const resetFields = (): void => {
  state.displayName = ''
  state.userName = ''
  v$.value.$reset()
}

const createProfile = async (): Promise<void> => {
  const result = await v$.value.$validate()

  if (!result) {
    return
  }

  const displayName =
    state.displayName.length > 0 ? state.displayName : undefined
  emit('update', state.userName, displayName)

  isModalOpen.value = false
}
</script>
