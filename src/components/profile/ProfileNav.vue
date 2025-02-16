<template>
  <nav class="w-56 flex-shrink-0">
    <div class="bg-white rounded-lg shadow-sm p-4">
      <div class="space-y-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="$emit('update:modelValue', tab.id)"
          :class="[
            'w-full flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg cursor-pointer',
            modelValue === tab.id
              ? 'bg-[#242427] text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
          ]"
        >
          <component :is="tab.icon" class="w-5 h-5" />
          {{ tab.name }}
        </button>
      </div>
      <div class="border-t border-gray-200 mt-4 pt-4">
        <ul>
          <li
            @click="logout"
            class="px-4 py-2 rounded-lg text-sm hover:bg-gray-100 cursor-pointer text-red-600"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { tabs } from "@/constants/profile-tabs";

export default defineComponent({
  name: "ProfileNav",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup() {
    return { tabs };
  },
});
</script>
