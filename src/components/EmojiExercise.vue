<script setup lang="ts">
import { Alphabet } from '@/enums/AlphabetEnum'
import CodeCard from './CodeCard.vue'

defineProps<{
  solution: string
}>()

function createExerciseTextForSolution(solution: string) {
  let text = 'Wie lautet der Wert von text nach Ausführung dieses Programms?\n\ntext = '

  // "Encode" solution
  const _solution: string[] = solution.toUpperCase().split('')
  text += _solution.map((character) => Alphabet[character as keyof typeof Alphabet]).join('')

  text += `"

`

  // Print alphabet
  text += Object.entries(Alphabet)
    .map(([letter, emoji]) => `text.REPLACE("${emoji}", "${letter.toLowerCase()}")`)
    .join('\n')

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
        <code-card :model-value="createExerciseTextForSolution(solution)"></code-card>
      </v-col>
    </v-row>
  </div>
</template>
