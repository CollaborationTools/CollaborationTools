<template>
  <div class="contents">
    <AtomButton primary v-bind="$attrs" @click="isModalOpen = true">{{
      label
    }}</AtomButton>

    <Teleport to="body">
      <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
      <div
        v-if="isModalOpen"
        :class="{
          'modal modal-bottom sm:modal-middle': true,
          'modal-open': isModalOpen,
        }"
        @click="cancelAction"
      >
        <div class="modal-box grid gap-4" @click.stop>
          <slot />
          <div class="contents">
            <AtomButton
              primary
              outline
              data-id="modal-cancel"
              @click="cancelAction"
              >{{ cancelLabel }}</AtomButton
            >
            <AtomButton
              primary
              data-id="modal-confirm"
              @click="confirmAction"
              >{{ confirmLabel }}</AtomButton
            >
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
type Props = {
  label: string
  modelValue: boolean
  cancelLabel?: string
  confirmLabel?: string
}

type Emits = {
  (eventName: 'cancel'): void
  (eventName: 'confirm'): void
  (eventName: 'update:modelValue', modelValue: boolean): void
}

const {
  label,
  modelValue,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
} = defineProps<Props>()
const emit = defineEmits<Emits>()

const isModalOpen = computed({
  get() {
    return modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  },
})
const cancelAction = (): void => {
  emit('cancel')
  isModalOpen.value = false
}
const confirmAction = (): void => {
  emit('confirm')
}
</script>
