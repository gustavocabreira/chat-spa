<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-lg font-medium text-gray-900">Profile Information</h2>
      <p class="mt-1 text-sm text-gray-500">
        Update your account's profile information and email address.
      </p>
    </div>
    <form @submit.prevent="handleSubmit" class="space-y-2">
      <Input
        label="Name"
        v-model="name"
        :error="errors.name"
        required
      />
      <Input
        label="Email"
        type="email"
        v-model="email"
        :error="errors.email"
        required
      />
      <div class="flex justify-end pt-4">
        <PrimaryButton
          type="submit"
          :loading="isLoading"
          loading-text="Saving..."
        >
          Save Profile
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import Input from '@/components/ui/Input.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';

export default defineComponent({
  name: 'ProfileInformation',
  components: {
    Input,
    PrimaryButton,
  },
  setup() {
    const { user, updateProfile } = useAuth();
    const name = ref(user.value.name);
    const email = ref(user.value.email);
    const isLoading = ref(false);
    const errors = ref({ name: '', email: '' });

    const handleSubmit = async () => {
      errors.value = { name: '', email: '' };

      if (!name.value.trim()) {
        errors.value.name = 'Name is required';
        return;
      }

      if (!email.value.trim()) {
        errors.value.email = 'Email is required';
        return;
      }

      isLoading.value = true;
      try {
        await updateProfile({
          name: name.value,
          email: email.value,
        });
      } catch (err: any) {
        errors.value.email = err.message;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      name,
      email,
      isLoading,
      errors,
      handleSubmit,
    };
  },
});
</script> 