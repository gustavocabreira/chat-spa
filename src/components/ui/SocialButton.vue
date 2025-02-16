<template>
  <button
    type="button"
    class="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    @click="$emit('click')"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SocialButton',
  emits: ['click']
})
</script> 