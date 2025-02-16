<template>
  <div class="h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <h1 class="text-xl font-semibold text-gray-900">Profile Settings</h1>
          <router-link
            to="/chat"
            class="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Profile Information -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6">
            <div class="mb-4">
              <h2 class="text-lg font-medium text-gray-900">Profile Information</h2>
              <p class="mt-1 text-sm text-gray-500">
                Update your account's profile information and email address.
              </p>
            </div>
            <form @submit.prevent="handleProfileSubmit" class="space-y-2">
              <!-- Avatar Section -->
              <div class="flex items-center gap-6 mb-4">
                <div class="relative">
                  <img
                    :src="avatar || user.avatar"
                    :alt="user.name"
                    class="w-20 h-20 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    class="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50"
                    @click="$refs.fileInput.click()"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </button>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleAvatarChange"
                  />
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Profile Picture</h3>
                  <p class="text-sm text-gray-500">JPG, PNG or GIF (max. 2MB)</p>
                </div>
              </div>

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
                  :loading="isProfileLoading"
                  loading-text="Saving..."
                >
                  Save Profile
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>

        <!-- Password Change -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6">
            <div class="mb-4">
              <h2 class="text-lg font-medium text-gray-900">Change Password</h2>
              <p class="mt-1 text-sm text-gray-500">
                Ensure your account is using a secure password for better protection.
              </p>
            </div>
            <form @submit.prevent="handlePasswordSubmit" class="space-y-2">
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
                  :loading="isPasswordLoading"
                  loading-text="Updating..."
                >
                  Update Password
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>

        <!-- Connected Accounts -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6">
            <div class="mb-4">
              <h2 class="text-lg font-medium text-gray-900">Connected Accounts</h2>
              <p class="mt-1 text-sm text-gray-500">
                Link your accounts to enable quick sign-in and access additional features.
              </p>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <svg class="w-6 h-6 text-gray-700" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <div>
                    <div class="font-medium">GitHub</div>
                    <div class="text-sm text-gray-500">
                      {{ user.githubEmail || 'Not connected' }}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="text-sm font-medium"
                  :class="user.githubEmail ? 'text-red-600 hover:text-red-500' : 'text-[#242427] hover:opacity-80'"
                  @click="user.githubEmail ? disconnectGithub() : connectGithub()"
                >
                  {{ user.githubEmail ? 'Disconnect' : 'Connect' }}
                </button>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <svg class="w-6 h-6 text-gray-700" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  <div>
                    <div class="font-medium">Google</div>
                    <div class="text-sm text-gray-500">
                      {{ user.googleEmail || 'Not connected' }}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="text-sm font-medium"
                  :class="user.googleEmail ? 'text-red-600 hover:text-red-500' : 'text-[#242427] hover:opacity-80'"
                  @click="user.googleEmail ? disconnectGoogle() : connectGoogle()"
                >
                  {{ user.googleEmail ? 'Disconnect' : 'Connect' }}
                </button>
              </div>
            </div>
          </div>
        </div>
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
  name: 'Profile',
  components: {
    Input,
    PrimaryButton,
  },
  setup() {
    const { user, updateProfile, updatePassword } = useAuth();
    const fileInput = ref<HTMLInputElement | null>(null);
    const isProfileLoading = ref(false);
    const isPasswordLoading = ref(false);
    const avatar = ref('');
    const name = ref(user.value.name);
    const email = ref(user.value.email);
    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const errors = ref({
      name: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    const handleAvatarChange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert('File size must be less than 2MB');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          avatar.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    const handleProfileSubmit = async () => {
      if (!name.value.trim()) {
        errors.value.name = 'Name is required';
        return;
      }

      if (!email.value.trim()) {
        errors.value.email = 'Email is required';
        return;
      }

      isProfileLoading.value = true;
      try {
        await updateProfile({
          name: name.value,
          email: email.value,
          avatar: avatar.value,
        });
      } catch (err: any) {
        errors.value.email = err.message;
      } finally {
        isProfileLoading.value = false;
      }
    };

    const handlePasswordSubmit = async () => {
      errors.value.currentPassword = '';
      errors.value.newPassword = '';
      errors.value.confirmPassword = '';

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

      isPasswordLoading.value = true;
      try {
        await updatePassword(currentPassword.value, newPassword.value);
        currentPassword.value = '';
        newPassword.value = '';
        confirmPassword.value = '';
      } catch (err: any) {
        errors.value.currentPassword = err.message;
      } finally {
        isPasswordLoading.value = false;
      }
    };

    const connectGithub = () => {
      // Implement GitHub OAuth connection
    };

    const disconnectGithub = () => {
      // Implement GitHub disconnection
    };

    const connectGoogle = () => {
      // Implement Google OAuth connection
    };

    const disconnectGoogle = () => {
      // Implement Google disconnection
    };

    return {
      user,
      fileInput,
      isProfileLoading,
      isPasswordLoading,
      avatar,
      name,
      email,
      currentPassword,
      newPassword,
      confirmPassword,
      errors,
      handleAvatarChange,
      handleProfileSubmit,
      handlePasswordSubmit,
      connectGithub,
      disconnectGithub,
      connectGoogle,
      disconnectGoogle,
    };
  },
});
</script> 