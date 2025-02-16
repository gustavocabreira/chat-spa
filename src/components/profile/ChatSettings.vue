<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-lg font-medium text-gray-900">Chat Settings</h2>
      <p class="mt-1 text-sm text-gray-500">
        Customize your chat experience and privacy settings.
      </p>
    </div>

    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-900">Online Status</h3>
          <p class="text-sm text-gray-500">
            Allow others to see when you're online
          </p>
        </div>
        <Switch v-model="settings.showOnlineStatus" />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-900">Read Receipts</h3>
          <p class="text-sm text-gray-500">
            Show others when you've read their messages
          </p>
        </div>
        <Switch v-model="settings.showReadReceipts" />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-900">Message Preview</h3>
          <p class="text-sm text-gray-500">
            Show message preview in notifications
          </p>
        </div>
        <Switch v-model="settings.showMessagePreview" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Switch from '@/components/ui/Switch.vue';

export default defineComponent({
  name: 'ChatSettings',
  components: {
    Switch,
  },
  setup() {
    const settings = ref({
      showOnlineStatus: true,
      showReadReceipts: true,
      showMessagePreview: false,
    });

    return { settings };
  },
});
</script> 