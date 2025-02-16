<template>
  <div class="bg-white rounded-lg shadow-sm">
    <div class="px-6 py-3 border-b border-gray-200">
      <div class="flex items-center gap-2">
        <router-link
          to="/chat"
          class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Chat
        </router-link>
      </div>
    </div>
    <div class="p-6">
      <div class="flex items-center gap-6">
        <img
          :src="user.avatar"
          :alt="user.name"
          class="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">{{ user.name }}</h1>
          <p class="text-sm text-gray-500 mt-1">{{ user.email }}</p>
          <div class="flex items-center gap-2 mt-2">
            <ConnectionBadge type="github" :connected="!!user.githubEmail" />
            <ConnectionBadge type="google" :connected="!!user.googleEmail" />
            <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
              <span class="w-1.5 h-1.5 rounded-full bg-green-600"></span>
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuth } from '@/composables/useAuth';
import ConnectionBadge from './ConnectionBadge.vue';

export default defineComponent({
  name: 'ProfileHeader',
  components: {
    ConnectionBadge,
  },
  setup() {
    const { user } = useAuth();
    return { user };
  },
});
</script> 