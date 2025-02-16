<template>
  <div class="w-full sm:w-[400px] px-4 sm:px-0 mx-auto min-h-screen flex items-center justify-center flex-col gap-6">
    <!-- Logo Header -->
    <a
      href="/"
      class="flex items-center gap-2 self-center text-xl font-semibold text-gray-900 hover:opacity-90 transition-opacity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
        style="color: #242427"
      >
        <path
          fill-rule="evenodd"
          d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
          clip-rule="evenodd"
        />
      </svg>
      <span
        style="
          background: linear-gradient(to right, #242427, #363639);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        "
        >QuickChat</span
      >
    </a>

    <!-- Main Content -->
    <div class="bg-white w-full px-4 sm:px-6 py-6 shadow-md rounded-lg border border-gray-200">
      <div v-if="!isSuccess">
        <div class="mb-6">
          <h1 class="text-xl font-bold tracking-tight text-gray-900">Reset password</h1>
          <p class="mt-1.5 text-sm text-gray-500">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="mt-6">
          <Input
            label="Email"
            type="email"
            name="email"
            id="email"
            v-model="email"
            placeholder="you@example.com"
            required
            :error="error"
          />

          <PrimaryButton 
            type="submit"
            :loading="isLoading"
            loading-text="Sending..."
            class="mt-2"
          >
            Send reset instructions
          </PrimaryButton>
        </form>
      </div>

      <!-- Success State -->
      <div v-else class="text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            class="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Check your email</h3>
        <p class="mt-2 text-sm text-gray-500">
          We've sent password reset instructions to {{ email }}
        </p>
        <p class="mt-4 text-sm text-gray-500">
          Didn't receive the email?
          <button
            @click="handleResend"
            class="font-medium text-gray-900 hover:opacity-90"
          >
            Click to resend
          </button>
        </p>
      </div>

      <!-- Back to Login Link -->
      <div class="mt-6 text-center">
        <router-link
          :to="{ name: 'Login' }"
          class="text-sm font-medium hover:opacity-90"
          style="color: #242427"
        >
          Back to login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Input from "@/components/ui/Input.vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";

export default defineComponent({
  name: "ForgotPassword",
  components: {
    Input,
    PrimaryButton,
  },
  setup() {
    const email = ref("");
    const error = ref("");
    const isLoading = ref(false);
    const isSuccess = ref(false);

    const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async () => {
      error.value = "";
      
      if (!email.value.trim()) {
        error.value = "Email is required";
        return;
      }

      if (!validateEmail(email.value)) {
        error.value = "Please enter a valid email";
        return;
      }

      isLoading.value = true;
      try {
        // TODO: Implement your password reset logic here
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API call
        isSuccess.value = true;
      } catch (err) {
        error.value = "Failed to send reset instructions. Please try again.";
      } finally {
        isLoading.value = false;
      }
    };

    const handleResend = async () => {
      isLoading.value = true;
      try {
        // TODO: Implement resend logic here
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API call
      } catch (err) {
        error.value = "Failed to resend. Please try again.";
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      error,
      isLoading,
      isSuccess,
      handleSubmit,
      handleResend,
    };
  },
});
</script>

<style scoped>
:deep(.focus-visible:focus) {
  --tw-ring-color: #242427;
}
</style> 