<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <ProfileHeader />
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Mobile Dropdown for Tabs -->
        <div class="lg:hidden mb-4">
          <button @click="toggleDropdown" class="w-full bg-white border border-gray-300 rounded-lg p-2 text-left flex justify-between items-center shadow-md hover:bg-gray-100 transition duration-200">
            <span class="font-semibold">{{ currentTabName }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 transition-transform duration-200"
              :class="{ 'rotate-180': isDropdownOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="isDropdownOpen" class="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <ul class="max-h-60 overflow-y-auto">
              <li v-for="tab in tabs" :key="tab.id" @click="selectTab(tab.id)" class="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-200">
                {{ tab.name }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Tabs for Desktop -->
        <ProfileNav v-model="currentTab" class="hidden lg:w-1/4 lg:block" />

        <!-- Content -->
        <div class="flex-1">
          <div class="bg-white rounded-lg shadow-md">
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
import { defineComponent, ref, computed } from 'vue';
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
    const isDropdownOpen = ref(false);
    const tabs = [
      { id: 'profile', name: 'Profile' },
      { id: 'security', name: 'Security' },
      { id: 'connections', name: 'Connections' },
      { id: 'settings', name: 'Settings' },
    ];

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const selectTab = (tabId) => {
      currentTab.value = tabId;
      isDropdownOpen.value = false; // Close dropdown after selection
    };

    const currentTabName = computed(() => {
      const tab = tabs.find(t => t.id === currentTab.value);
      return tab ? tab.name : 'Select Tab';
    });

    return { currentTab, isDropdownOpen, toggleDropdown, selectTab, tabs, currentTabName };
  },
});
</script>

<style scoped>
/* No additional CSS needed since we're using Tailwind CSS */
</style> 