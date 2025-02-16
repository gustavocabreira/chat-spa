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
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="contact in filteredContacts"
        :key="contact.id"
        class="p-4 hover:bg-gray-50 cursor-pointer"
        :class="{ 'bg-gray-50': selectedContactId === contact.id }"
        @click="$emit('select-contact', contact)"
      >
        <div class="flex items-center gap-3">
          <img
            :src="contact.avatar"
            alt="Contact Avatar"
            class="w-10 h-10 rounded-full"
          />
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

    <!-- Bottom User Profile Bar -->
    <div class="border-t border-gray-200 p-4 bg-white">
      <div class="flex items-center justify-between">
        <button
          @click.stop="toggleDropdown"
          class="flex items-center flex-1 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-150"
        >
          <div class="relative">
            <img
              :src="
                user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
              "
              :alt="user?.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div
              class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
              :class="{
                'bg-green-500': userStatus === 'online',
                'bg-yellow-500': userStatus === 'busy',
                'bg-orange-500': userStatus === 'occupied',
                'bg-gray-500': userStatus === 'offline',
              }"
            ></div>
          </div>
          <div class="ml-3 text-left">
            <div class="font-medium text-gray-900">{{ user?.name || "User Name" }}</div>
            <div class="text-xs text-gray-500 capitalize">{{ userStatus }}</div>
          </div>
        </button>
        <router-link
          to="/profile"
          class="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </router-link>
      </div>

      <!-- Status Dropdown (absolute positioned) -->
      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="isDropdownOpen"
          class="absolute bottom-20 left-4 w-56 bg-white rounded-lg shadow-xl z-50"
        >
          <div class="p-3">
            <p class="text-sm font-medium text-gray-900 mb-2">Set Status</p>
            <div class="space-y-1">
              <button
                @click="setStatus('online')"
                class="flex items-start w-full px-3 py-2 text-sm text-gray-700 rounded-md text-left transition-colors duration-150 ease-in-out hover:bg-gray-50"
                :class="{ 'bg-gray-50': userStatus === 'online' }"
              >
                <div class="w-2.5 h-2.5 bg-green-500 rounded-full mr-2.5 mt-1"></div>
                <div>
                  <div class="font-medium">Online</div>
                  <div class="text-xs text-gray-500">Available for chat</div>
                </div>
              </button>
              <button
                @click="setStatus('busy')"
                class="flex items-start w-full px-3 py-2 text-sm text-gray-700 rounded-md text-left transition-colors duration-150 ease-in-out hover:bg-gray-50"
                :class="{ 'bg-gray-50': userStatus === 'busy' }"
              >
                <div class="w-2.5 h-2.5 bg-yellow-500 rounded-full mr-2.5 mt-1"></div>
                <div>
                  <div class="font-medium">Busy</div>
                  <div class="text-xs text-gray-500">May be slow to respond</div>
                </div>
              </button>
              <button
                @click="setStatus('occupied')"
                class="flex items-start w-full px-3 py-2 text-sm text-gray-700 rounded-md text-left transition-colors duration-150 ease-in-out hover:bg-gray-50"
                :class="{ 'bg-gray-50': userStatus === 'occupied' }"
              >
                <div class="w-2.5 h-2.5 bg-orange-500 rounded-full mr-2.5 mt-1"></div>
                <div>
                  <div class="font-medium">Occupied</div>
                  <div class="text-xs text-gray-500">In a meeting or focused work</div>
                </div>
              </button>
              <button
                @click="setStatus('offline')"
                class="flex items-start w-full px-3 py-2 text-sm text-gray-700 rounded-md text-left transition-colors duration-150 ease-in-out hover:bg-gray-50"
                :class="{ 'bg-gray-50': userStatus === 'offline' }"
              >
                <div class="w-2.5 h-2.5 bg-gray-500 rounded-full mr-2.5 mt-1"></div>
                <div>
                  <div class="font-medium">Offline</div>
                  <div class="text-xs text-gray-500">Currently unavailable</div>
                </div>
              </button>
            </div>
          </div>

          <div class="h-[1px] bg-gray-100 mx-3"></div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import type { Contact } from "@/types/chat";
import { useAuth } from "@/composables/useAuth";

export default defineComponent({
  name: "ChatSidebar",
  props: {
    selectedContactId: {
      type: Number,
      default: null,
    },
  },
  emits: ["search", "select-contact", "toggle-sidebar"],
  setup() {
    const searchQuery = ref("");
    const { user } = useAuth();
    const isDropdownOpen = ref(false);
    const userStatus = ref<'online' | 'busy' | 'occupied' | 'offline'>('online');

    // Sample contacts
    const contacts = ref([
      { id: 1, name: 'Alice', lastMessage: 'Hey there!', lastMessageTime: '10:00 AM', avatar: `https://api.adorable.io/avatars/285/alice.png` },
      { id: 2, name: 'Bob', lastMessage: 'How are you?', lastMessageTime: '9:45 AM', avatar: `https://api.adorable.io/avatars/285/bob.png` },
      { id: 3, name: 'Charlie', lastMessage: 'Lets meet up!', lastMessageTime: 'Yesterday', avatar: `https://api.adorable.io/avatars/285/charlie.png` },
      { id: 4, name: 'David', lastMessage: 'See you soon!', lastMessageTime: '2:30 PM', avatar: `https://api.adorable.io/avatars/285/david.png` },
      { id: 5, name: 'Eva', lastMessage: 'Good morning!', lastMessageTime: '8:00 AM', avatar: `https://api.adorable.io/avatars/285/eva.png` },
      { id: 6, name: 'Frank', lastMessage: 'Whats up?', lastMessageTime: '11:15 AM', avatar: `https://api.adorable.io/avatars/285/frank.png` },
      { id: 7, name: 'Grace', lastMessage: 'Lets catch up!', lastMessageTime: '3:00 PM', avatar: `https://api.adorable.io/avatars/285/grace.png` },
      { id: 8, name: 'Hannah', lastMessage: 'Are you free?', lastMessageTime: '4:45 PM', avatar: `https://api.adorable.io/avatars/285/hannah.png` },
      { id: 9, name: 'Ian', lastMessage: 'See you later!', lastMessageTime: '5:30 PM', avatar: `https://api.adorable.io/avatars/285/ian.png` },
      { id: 10, name: 'Jack', lastMessage: 'Lets go!', lastMessageTime: '6:00 PM', avatar: `https://api.adorable.io/avatars/285/jack.png` },
      { id: 11, name: 'Kathy', lastMessage: 'Whats new?', lastMessageTime: '7:00 PM', avatar: `https://api.adorable.io/avatars/285/kathy.png` },
      { id: 12, name: 'Leo', lastMessage: 'Ready for the game?', lastMessageTime: '8:30 PM', avatar: `https://api.adorable.io/avatars/285/leo.png` },
    ]);

    // Computed property to filter contacts based on search query
    const filteredContacts = computed(() => {
      return contacts.value.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const setStatus = (status: 'online' | 'busy' | 'occupied' | 'offline') => {
      userStatus.value = status;
      isDropdownOpen.value = false;
      // Here you can add logic to update the status in your backend
    };

    // Close dropdown when clicking outside
    onMounted(() => {
      document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (!target.closest(".relative")) {
          isDropdownOpen.value = false;
        }
      });
    });

    return {
      searchQuery,
      user,
      isDropdownOpen,
      userStatus,
      toggleDropdown,
      setStatus,
      filteredContacts,
    };
  },
});
</script>
