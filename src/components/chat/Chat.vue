<template>
  <div class="chat-container">
    <div class="messages" ref="messagesContainer">
      <div v-for="message in messages" :key="message.id" class="message">
        <p>{{ message.text }}</p>
      </div>
    </div>
    <div class="input-area">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from "vue";

export default defineComponent({
  name: "Chat",
  setup() {
    const messages = ref([]);
    const newMessage = ref("");
    const messagesContainer = ref<HTMLElement | null>(null);

    const sendMessage = () => {
      if (newMessage.value.trim() !== "") {
        // Add the new message to the messages array
        messages.value.push({ id: Date.now(), text: newMessage.value });
        newMessage.value = ""; // Clear the input

        // Scroll to the bottom after the DOM updates
        nextTick(() => {
          if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
          }
        });
      }
    };

    return {
      messages,
      newMessage,
      sendMessage,
      messagesContainer,
    };
  },
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensure the container takes full height */
}

.messages {
  flex: 1; /* Allow the messages area to grow */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px; /* Optional: for rounded corners */
}

.message {
  margin-bottom: 10px;
}

.input-area {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  margin-left: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
