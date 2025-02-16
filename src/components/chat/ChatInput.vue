<template>
  <div class="p-4 border-t border-gray-200 bg-white">
    <div class="flex items-center gap-3">
      <input
        type="text"
        placeholder="Type a message..."
        class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        v-model="message"
        @keyup.enter="sendMessage"
      />
      <div>
        <PrimaryButton
          @click="sendMessage"
          :disabled="!message.trim()"
          class="!px-4 !py-2 !text-sm"
        >
          Send
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";

export default defineComponent({
  name: "ChatInput",
  components: {
    PrimaryButton,
  },
  emits: ["send"],
  setup(props, { emit }) {
    const message = ref("");

    const sendMessage = () => {
      if (!message.value.trim()) return;
      emit("send", message.value);
      message.value = "";
    };

    return {
      message,
      sendMessage,
    };
  },
});
</script>
