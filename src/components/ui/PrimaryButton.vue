<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :aria-disabled="disabled"
    class="primary-button w-full cursor-pointer flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    <span v-if="loading" class="mr-2">
      <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    <span>{{ loading ? loadingText : $slots.default?.()?.[0]?.children || 'Submit' }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  loadingText?: string
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  loading: false,
  disabled: false,
  loadingText: 'Loading...'
})
</script>

<style scoped>
.primary-button {
  background-color: #242427;
}

.primary-button:hover {
  background-color: #3a3a3e;
}

.primary-button:focus-visible {
  outline: 2px solid #242427;
  outline-offset: 2px;
}

.primary-button svg {
  color: currentColor;
}

.primary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  .primary-button {
    transition: none;
  }
  
  .animate-spin {
    animation: none;
  }
}
</style> 