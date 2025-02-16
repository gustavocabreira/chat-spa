<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <ProfileHeader />
      </div>

      <div class="flex gap-8">
        <!-- Tabs -->
        <ProfileNav v-model="currentTab" />

        <!-- Divider -->
        <div class="w-px bg-gray-200"></div>

        <!-- Content -->
        <div class="flex-1">
          <div class="bg-white rounded-lg shadow-sm">
            <ProfileInformation v-if="currentTab === 'profile'" />
            <SecuritySettings v-if="currentTab === 'security'" />
            <ConnectedAccounts v-if="currentTab === 'connections'" />
            <ChatSettings v-if="currentTab === 'settings'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProfileHeader from '@/components/profile/ProfileHeader.vue';
import ProfileNav from '@/components/profile/ProfileNav.vue';
import ProfileInformation from '@/components/profile/ProfileInformation.vue';
import SecuritySettings from '@/components/profile/SecuritySettings.vue';
import ConnectedAccounts from '@/components/profile/ConnectedAccounts.vue';
import ChatSettings from '@/components/profile/ChatSettings.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    ProfileHeader,
    ProfileNav,
    ProfileInformation,
    SecuritySettings,
    ConnectedAccounts,
    ChatSettings,
  },
  setup() {
    const currentTab = ref('profile');
    return { currentTab };
  },
});
</script> 