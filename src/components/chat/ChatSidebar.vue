<template>
  <div class="w-80 h-full border-r border-gray-200 bg-white flex flex-col">
    <!-- Sidebar Header -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <!-- Toggle Button (mobile only) -->
          <button
            class="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            @click="$emit('toggle-sidebar')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <h2 class="text-xl font-semibold text-gray-900">Chats</h2>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <router-link
            to="/profile"
            class="block relative hover:opacity-80 transition-opacity"
          >
            <img
              :src="
                user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
              "
              :alt="user?.name"
              class="w-8 h-8 rounded-full object-cover"
            />
            <div
              class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"
            ></div>
          </router-link>
        </div>
      </div>
      <!-- Search -->
      <div class="mt-4">
       <input
          type="text"
          placeholder="Search contacts..."
          class="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          v-model="searchQuery"
          @input="$emit('search', searchQuery)"
        />
      </div>
    </div>

    <!-- Contact List -->
    <div class="overflow-y-auto h-[calc(100vh-129px)]">
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="p-4 hover:bg-gray-50 cursor-pointer"
        :class="{ 'bg-gray-50': selectedContactId === contact.id }"
        @click="$emit('select-contact', contact)"
      >
        <div class="flex items-center gap-3">
          <div class="relative">
            <img
              :src="contact.avatar"
              :alt="contact.name"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div
              v-if="contact.online"
              class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
            ></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h3 class="font-medium text-gray-900 truncate">{{ contact.name }}</h3>
              <span class="text-xs text-gray-500">{{ contact.lastMessageTime }}</span>
            </div>
            <p class="text-sm text-gray-500 truncate">{{ contact.lastMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Contact } from "@/types/chat";
import { useAuth } from "@/composables/useAuth";

export default defineComponent({
  name: "ChatSidebar",
  props: {
    contacts: {
      type: Array as () => Contact[],
      required: true,
    },
    selectedContactId: {
      type: Number,
      default: null,
    },
  },
  emits: ["search", "select-contact", "toggle-sidebar"],
  setup() {
    const searchQuery = ref("");
    const { user } = useAuth();

    return {
      searchQuery,
      user,
    };
  },
});
</script>
