<template>
  <div class="flex-1 flex flex-col bg-gray-50 w-full">
    <template v-if="contact">
      <!-- Chat Header when chat is selected -->
      <div class="p-4 border-b border-gray-200 bg-white">
        <div class="flex items-center gap-3">
          <button 
            class="lg:hidden p-1 -ml-1 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            @click="handleToggle"
          >
            <svg
              v-if="!isSidebarOpen"
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
            <svg
              v-else
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            :src="contact.avatar"
            :alt="contact.name"
            class="w-10 h-10 rounded-full object-cover"
          />
          <div class="flex-1">
            <h3 class="font-medium text-gray-900">{{ contact.name }}</h3>
            <p class="text-sm text-gray-500">
              {{ contact.online ? 'Online' : 'Offline' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex"
          :class="[
            message.senderId === currentUserId ? 'justify-end' : 'justify-start'
          ]"
        >
          <div
            :class="[
              'max-w-[75%] rounded-2xl px-4 py-2 text-sm',
              message.senderId === currentUserId 
                ? 'bg-[#242427] text-white rounded-br-md'
                : 'bg-white border border-gray-200 rounded-bl-md'
            ]"
          >
            <p>{{ message.content }}</p>
            <span 
              :class="[
                'text-[11px] mt-1 block',
                message.senderId === currentUserId 
                  ? 'text-gray-400'
                  : 'text-gray-500'
              ]"
            >
              {{ message.timestamp }}
            </span>
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <ChatInput @send="handleSend" />
    </template>

    <!-- No Chat Selected State -->
    <template v-else>
      <!-- Empty state header with toggle -->
      <div class="p-4 border-b border-gray-200 bg-white">
        <button 
          class="lg:hidden p-1 -ml-1 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          @click="handleToggle"
        >
          <svg
            v-if="!isSidebarOpen"
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
          <svg
            v-else
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="flex-1 flex items-center justify-center text-gray-500 px-4 text-center">
        <p class="lg:text-lg">
          Select a chat to start messaging
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ChatInput from './ChatInput.vue';
import type { Contact, Message } from '@/types/chat';

export default defineComponent({
  name: 'ChatArea',
  components: {
    ChatInput,
  },
  props: {
    contact: {
      type: Object as () => Contact | null,
      default: null,
    },
    isSidebarOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['send-message', 'toggle-sidebar'],
  setup(props, { emit }) {
    const currentUserId = 1; // This should come from your auth system
    
    // Sample messages - this should come from your backend
    const messages = ref<Message[]>([
      {
        id: 1,
        content: "Hey! How are you?",
        timestamp: "10:00 AM",
        senderId: 2,
        receiverId: 1
      },
      {
        id: 2,
        content: "I'm good, thanks! Just working on the new project. How about you?",
        timestamp: "10:02 AM",
        senderId: 1,
        receiverId: 2
      },
      {
        id: 3,
        content: "Same here! The deadline is approaching fast 😅",
        timestamp: "10:03 AM",
        senderId: 2,
        receiverId: 1
      },
      {
        id: 4,
        content: "Don't worry, we'll get it done in time! Let me know if you need any help.",
        timestamp: "10:05 AM",
        senderId: 1,
        receiverId: 2
      },
      {
        id: 5,
        content: "Thanks! Really appreciate it 🙏",
        timestamp: "10:06 AM",
        senderId: 2,
        receiverId: 1
      }
    ]);

    const handleSend = (message: string) => {
      if (!message.trim()) return;
      
      // Add new message to the list
      messages.value.push({
        id: Date.now(),
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderId: currentUserId,
        receiverId: props.contact?.id || 0
      });
    };

    const handleToggle = () => {
      emit('toggle-sidebar');
    };

    return { 
      messages,
      currentUserId,
      handleSend,
      handleToggle
    };
  },
});
</script>

<style scoped>
.messages-area {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}

.messages-area::-webkit-scrollbar {
  width: 4px;
}

.messages-area::-webkit-scrollbar-track {
  background: transparent;
}

.messages-area::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 2px;
}
</style> 