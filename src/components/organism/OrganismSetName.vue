<template>
  <div class="contents">
    <MoleculeModal
      v-model="isModalOpen"
      outline
      label="Set different display name"
      data-id="set-display-name"
      @confirm="updateName"
      @cancel="resetFields"
    >
      <h3 class="font-bold text-lg text-center">Set display name</h3>
      <AtomInput
        v-model="state.name"
        label="Display name in current organisation"
        data-id="name-field"
        :errors="v$.name.$errors"
        @blur="v$.name.$touch"
      />
    </MoleculeModal>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

type Emits = {
  (eventName: 'update', name: string): void
}
const emit = defineEmits<Emits>()

const isModalOpen = ref(false)

const state = reactive({
  name: '',
})
const rules = {
  name: { required },
}

const v$ = useVuelidate(rules, state)

const resetFields = (): void => {
  state.name = ''
  v$.value.$reset()
}

const updateName = async (): Promise<void> => {
  const result = await v$.value.$validate()
  if (!result) {
    return
  }

  emit('update', state.name)
  isModalOpen.value = false
}
</script>
