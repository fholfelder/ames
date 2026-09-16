<script setup lang="ts">
import CodeCard from './CodeCard.vue'

function createExerciseText() {
  const text = `Wie viele Dreiecke (mit Spitze nach oben) verstecken sich hier?

     /\\
    /__\\
   /\\  /\\
  /__\\/__\\
 /\\  /\\  /\\
/__\\/__\\/__\\`

  return text
}
</script>

<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-center">
        <h1>Aufgabenstellung</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <code-card :model-value="createExerciseText()"></code-card>
      </v-col>
    </v-row>
  </div>
</template>
