<template>
  <div class="w-full sm:w-[400px] px-4 sm:px-0 mx-auto min-h-screen flex items-center justify-center flex-col gap-6">
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
    <div class="bg-white w-full px-4 sm:px-6 py-6 shadow-md rounded-lg border border-gray-200">
      <div class="mb-6">
        <h1 class="text-xl font-bold tracking-tight text-gray-900">Create an account</h1>
        <p class="mt-1.5 text-sm text-gray-500">Get started with QuickChat</p>
      </div>

      <!-- Social Login Buttons -->
      <div class="mt-6 space-y-3">
        <SocialButton @click="handleGoogleLogin">
          <template #icon>
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </template>
          Continue with Google
        </SocialButton>
        <SocialButton @click="handleGithubLogin">
          <template #icon>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
          </template>
          Continue with GitHub
        </SocialButton>
      </div>

      <!-- Separator -->
      <div class="relative mt-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <!-- Form -->
      <div class="mt-6">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
          <Input
            label="Name"
            type="text"
            name="name"
            id="name"
            v-model="formData.name"
            placeholder="John Doe"
            required
            :error="errors.name"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            id="email"
            v-model="formData.email"
            placeholder="you@example.com"
            required
            :error="errors.email"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            id="password"
            v-model="formData.password"
            placeholder="••••••••"
            required
            :error="errors.password"
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirm-password"
            id="confirm-password"
            v-model="formData.confirmPassword"
            placeholder="••••••••"
            required
            :error="errors.confirmPassword"
          />
          <div class="mt-1">
            <div class="relative flex items-start">
              <div class="flex h-5 items-center">
                <input
                  id="terms"
                  v-model="formData.acceptTerms"
                  name="terms"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300"
                  style="
                    color: #242427;
                    &:focus-visible {
                      --tw-ring-color: #242427;
                    }
                  "
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-medium text-gray-700">
                  I agree to the
                  <a
                    href="/terms"
                    style="
                      color: #242427;
                      &:hover {
                        opacity: 0.9;
                      }
                    "
                    >Terms of Service</a
                  >
                  and
                  <a
                    href="/privacy"
                    style="
                      color: #242427;
                      &:hover {
                        opacity: 0.9;
                      }
                    "
                    >Privacy Policy</a
                  >
                </label>
                <p v-if="errors.acceptTerms" class="mt-1 text-sm text-red-600">
                  {{ errors.acceptTerms }}
                </p>
              </div>
            </div>
          </div>
          <PrimaryButton 
            type="submit"
            :loading="isLoading"
            loading-text="Creating account..."
            class="mt-2"
          >
            Create Account
          </PrimaryButton>
          <p class="mt-2 text-center text-sm text-gray-600">
            Already have an account?
            <router-link
              :to="{ name: 'Login' }"
              class="font-medium hover:opacity-90"
              style="color: #242427"
            >
              Sign in
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Input from "@/components/ui/Input.vue";
import SocialButton from "@/components/ui/SocialButton.vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";

export default defineComponent({
  name: "Register",
  components: {
    Input,
    SocialButton,
    PrimaryButton,
  },
  setup() {
    const formData = ref({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    });

    const errors = ref({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: "",
    });

    const isLoading = ref(false);

    const validateForm = () => {
      errors.value = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: "",
      };

      let isValid = true;

      if (!formData.value.name.trim()) {
        errors.value.name = "Name is required";
        isValid = false;
      }

      if (!formData.value.email.trim()) {
        errors.value.email = "Email is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        errors.value.email = "Please enter a valid email";
        isValid = false;
      }

      if (!formData.value.password) {
        errors.value.password = "Password is required";
        isValid = false;
      } else if (formData.value.password.length < 8) {
        errors.value.password = "Password must be at least 8 characters";
        isValid = false;
      }

      if (formData.value.password !== formData.value.confirmPassword) {
        errors.value.confirmPassword = "Passwords do not match";
        isValid = false;
      }

      if (!formData.value.acceptTerms) {
        errors.value.acceptTerms =
          "You must accept the Terms of Service and Privacy Policy";
        isValid = false;
      }

      return isValid;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      isLoading.value = true;
      try {
        // TODO: Implement your registration logic here
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API call
      } catch (error) {
        console.error("Registration failed:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const handleGoogleLogin = () => {
      // TODO: Implement Google login
      console.log("Google login clicked");
    };

    const handleGithubLogin = () => {
      // TODO: Implement GitHub login
      console.log("GitHub login clicked");
    };

    return {
      formData,
      errors,
      isLoading,
      handleSubmit,
      handleGoogleLogin,
      handleGithubLogin,
    };
  },
});
</script>

<style scoped>
:deep(.focus-visible:focus) {
  --tw-ring-color: #242427;
}

input[type="checkbox"]:checked {
  background-color: #242427;
  border-color: #242427;
}

input[type="checkbox"]:focus {
  --tw-ring-color: #242427;
}
</style>
