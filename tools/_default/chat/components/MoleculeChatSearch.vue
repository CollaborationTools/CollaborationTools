<template>
  <div class="flex gap-2 p-2 md:p-4 pt-0 md:pt-0">
    <div class="flex-1">
      <AtomInput
        v-model="searchString"
        class="caret-secondary"
        @keyup="search"
      />
    </div>
    <div class="flex place-items-end">
      <button class="btn btn-square btn-ghost opacity-30">
        <AtomIcon class="h-9 w-9" name="search" @click="search" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
type Emits = {
  (eventName: 'search', searchString: string): void
}

const emit = defineEmits<Emits>()

const searchString = $ref('')

const search = (): void => {
  emit('search', searchString.trim())
}
</script>
