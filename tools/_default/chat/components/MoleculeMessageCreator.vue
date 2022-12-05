<template>
  <div class="flex gap-2 p-2 md:p-4 border-t border-t-base-content/20">
    <div class="flex-1">
      <AtomInput
        v-model="newText"
        class="caret-secondary"
        @focus="focus"
        @keydown.enter="sendMessage"
      />
    </div>
    <div class="flex place-items-end">
      <button class="btn btn-square btn-ghost opacity-30">
        <AtomIcon class="h-9 w-9" name="send" @click="sendMessage" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
type Emits = {
  (eventName: 'send', newText: string): void
  (eventName: 'focus'): void
}

const emit = defineEmits<Emits>()

let newText = $ref('')

const focus = (): void => emit('focus')

const sendMessage = (): void => {
  if (newText.trim().length > 0) {
    emit('send', newText.trim())
  }
  newText = ''
}
</script>
