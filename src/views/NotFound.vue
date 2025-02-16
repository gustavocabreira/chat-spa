<template>
  <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-max w-full space-y-8 text-center">
      <div>
        <h1 class="text-9xl font-bold text-gray-900">404</h1>
        <h2 class="mt-3 text-2xl font-semibold text-gray-900">Page not found</h2>
        <p class="mt-4 text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
      </div>
      <div class="mt-6">
        <router-link
          to="/"
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white"
          style="background-color: #242427"
        >
          Go back home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound'
});
</script> 