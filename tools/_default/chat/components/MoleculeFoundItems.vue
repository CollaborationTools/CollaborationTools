<template>
  <ul class="menu">
    <li v-for="item in items" :key="item.id">
      <button @click="item.action">
        <div class="avatar">
          <div class="w-16 rounded">
            <AtomIcon name="person" class="w-16 h-16 text-accent" />
          </div>
        </div>
        <h2 class="card-title">{{ item.name }}</h2>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ChatItem } from '../core/ChatItem'

type Props = {
  items: ChatItem[]
}

const { items } = defineProps<Props>()
</script>
