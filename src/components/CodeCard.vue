<script setup lang="ts">
defineProps<{
  modelValue: string
}>()
</script>

<template>
  <div>
    <v-card class="codeCard">
      <v-card-text class="codeText">
        <code>{{ modelValue }}</code>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.codeCard {
  background-color: #f0f0f0;
  font-family: 'Segoe UI Mono';
}

.codeText {
  font-family: monospace;
  font-size: 16px;
  white-space: pre;
}
</style>
