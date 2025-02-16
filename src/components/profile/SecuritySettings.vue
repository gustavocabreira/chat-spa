<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-lg font-medium text-gray-900">Security Settings</h2>
      <p class="mt-1 text-sm text-gray-500">
        Manage your password and two-factor authentication settings.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-2">
      <Input
        label="Current Password"
        type="password"
        v-model="currentPassword"
        :error="errors.currentPassword"
        required
      />
      <Input
        label="New Password"
        type="password"
        v-model="newPassword"
        :error="errors.newPassword"
        required
      />
      <Input
        label="Confirm New Password"
        type="password"
        v-model="confirmPassword"
        :error="errors.confirmPassword"
        required
      />
      <div class="flex justify-end pt-4">
        <PrimaryButton
          type="submit"
          :loading="isLoading"
          loading-text="Updating..."
        >
          Update Password
        </PrimaryButton>
      </div>
    </form>

    <div class="mt-8 pt-6 border-t border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
      <p class="mt-1 text-sm text-gray-500">
        Add additional security to your account using two-factor authentication.
      </p>
      <div class="mt-4">
        <PrimaryButton>Enable 2FA</PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import Input from '@/components/ui/Input.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';

export default defineComponent({
  name: 'SecuritySettings',
  components: {
    Input,
    PrimaryButton,
  },
  setup() {
    const { updatePassword } = useAuth();
    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const isLoading = ref(false);
    const errors = ref({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    const handleSubmit = async () => {
      errors.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      };

      if (!currentPassword.value) {
        errors.value.currentPassword = 'Current password is required';
        return;
      }
      if (!newPassword.value) {
        errors.value.newPassword = 'New password is required';
        return;
      }
      if (newPassword.value !== confirmPassword.value) {
        errors.value.confirmPassword = 'Passwords do not match';
        return;
      }

      isLoading.value = true;
      try {
        await updatePassword(currentPassword.value, newPassword.value);
        currentPassword.value = '';
        newPassword.value = '';
        confirmPassword.value = '';
      } catch (err: any) {
        errors.value.currentPassword = err.message;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      currentPassword,
      newPassword,
      confirmPassword,
      isLoading,
      errors,
      handleSubmit,
    };
  },
});
</script> 