<template>
  <div>
    <label :for="id" class="block">{{ label }}</label>
    <input
      :type="type"
      :name="name"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="flex h-9 w-full rounded-md border border-gray-300 border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
})
</script> 