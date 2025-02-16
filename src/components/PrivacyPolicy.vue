<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Privacy Policy</h1>
    
    <div class="space-y-4">
      <section>
        <h2 class="text-xl font-semibold mb-2">Demo Software Notice</h2>
        <p>This is a demonstration software. The creator of this demo has no access to or control over any data you may input or process while using this application.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-2">Data Collection</h2>
        <p>This demo software does not intentionally collect, store, or transmit any personal information. Any data entered during the use of this demo remains in your local environment.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-2">Third-Party Services</h2>
        <p>If you modify this demo to connect to external services or databases, you are responsible for ensuring compliance with relevant privacy laws and regulations.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-2">Changes to Privacy Policy</h2>
        <p>As this is a demo software, this privacy policy may be modified at any time without notice.</p>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrivacyPolicy'
});
</script> 