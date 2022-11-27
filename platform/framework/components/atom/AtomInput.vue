<template>
  <div class="form-control w-full">
    <label
      v-if="label"
      :for="fieldId"
      :class="{ 'label label-text': true, 'text-red': hasError }"
    >
      <span>{{ label }}</span>
      <span v-if="optional" class="label-text-alt">(optional)</span>
    </label>
    <input
      :id="fieldId"
      type="text"
      :class="{
        'input input-bordered w-full': true,
        'border-accent': accent && !secondary && !primary && !hasError,
        'border-secondary': secondary && !primary && !hasError,
        'border-primary': primary && !hasError,
        'border-red': hasError,
      }"
      :data-id="dataId"
      v-bind="$attrs"
      :value="value"
      @input="setValue"
    />
    <div v-if="hasError" class="label label-text text-red font-semibold">
      <label v-for="error in errors" :key="error.$uid" :for="fieldId">{{
        error.$message
      }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createUUID } from 'services/crypto/uuid'

import type { ErrorObject } from '@vuelidate/core'

type Props = {
  modelValue: string
  accent?: boolean
  dataId?: string
  errors?: ErrorObject[]
  label?: string
  optional?: boolean
  primary?: boolean
  secondary?: boolean
}

type Emits = {
  (eventName: 'update:modelValue', modelValue: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const attrs = useAttrs()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const fieldId = computed(() => {
  return attrs.id ? `${attrs.id}` : `${props.label}[${createUUID()}]`
})

const hasError = computed(() => !!props.errors?.length)

const setValue = (event: Event): void => {
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  value.value = (event.target as HTMLInputElement).value
}
</script>
