<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="primary-button w-full cursor-pointer flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    <span v-if="loading">
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {{ loadingText }}
    </span>
    <span v-else>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrimaryButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: 'Loading...'
    }
  }
});
</script>

<style scoped>
.primary-button {
  background-color: var(--color-primary);
}

.primary-button:hover {
  background-color: var(--color-primary-hover);
}

.primary-button:focus {
  outline: none;
  --tw-ring: 2px;
  --tw-ring-offset: 2px;
  --tw-ring-color: var(--color-primary);
}
</style> 