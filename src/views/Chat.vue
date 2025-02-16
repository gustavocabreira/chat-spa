<template>
  <div class="flex h-screen">
    <!-- Sidebar with mobile overlay -->
    <div
      v-show="isSidebarOpen"
      class="lg:hidden fixed inset-0 backdrop-blur-sm bg-black/20 z-40"
      @click="isSidebarOpen = false"
    ></div>
    
    <div
      :class="[
        'fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out',
        'lg:transform-none lg:opacity-100',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <ChatSidebar
        :contacts="filteredContacts"
        :selected-contact-id="selectedContact?.id"
        @search="updateSearch"
        @select-contact="selectContactAndCloseSidebar"
      />
    </div>

    <ChatArea
      :contact="selectedContact"
      :is-sidebar-open="isSidebarOpen"
      @send-message="sendMessage"
      @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
      class="flex-1 lg:ml-0"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import ChatSidebar from '@/components/chat/ChatSidebar.vue';
import ChatArea from '@/components/chat/ChatArea.vue';
import type { Contact } from '@/types/chat';

export default defineComponent({
  name: 'Chat',
  components: {
    ChatSidebar,
    ChatArea,
  },
  setup() {
    const contacts = ref<Contact[]>([
      {
        id: 1,
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        online: true,
        lastMessage: 'Hey, how are you?',
        lastMessageTime: '12:30 PM',
      },
      {
        id: 2,
        name: 'Jane Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        online: false,
        lastMessage: 'See you tomorrow!',
        lastMessageTime: '11:45 AM',
      },
    ]);

    const searchQuery = ref('');
    const selectedContact = ref<Contact | null>(null);
    const isSidebarOpen = ref(window.innerWidth >= 1024); // Open by default on desktop

    const filteredContacts = computed(() => {
      return contacts.value.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const updateSearch = (query: string) => {
      searchQuery.value = query;
    };

    const selectContactAndCloseSidebar = (contact: Contact) => {
      selectedContact.value = contact;
      if (window.innerWidth < 1024) {
        isSidebarOpen.value = false;
      }
    };

    const sendMessage = (message: string) => {
      // TODO: Implement message sending logic
      console.log('Sending message:', message);
    };

    return {
      filteredContacts,
      selectedContact,
      isSidebarOpen,
      updateSearch,
      selectContactAndCloseSidebar,
      sendMessage,
    };
  },
});
</script> 