<template>
  <div class="bg-light-background min-h-screen min-w-screen">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GuestLayout",
});
</script>

<style scoped></style>
