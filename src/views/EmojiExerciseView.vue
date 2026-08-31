<script setup lang="ts">
import EmojiExercise from '../components/EmojiExercise.vue';
import SolutionInput from '../components/SolutionInput.vue';
import ExercisePageHeader from '../components/ExercisePageHeader.vue';
import { useCookies } from '@vueuse/integrations/useCookies'
const latestSolution = useCookies(["latestSolution"]);
const solutionKey = "latestEmojiExerciseSolution";
const wordPool = [
  "puzzlewantsyou",
  "puzzleneedsyou",
  "ausbildungforyou",
  //"girlsday",
  //"gymnew"
];

function generateSolution() {
  if (wordPool.length === 0) return "";
  let randomSolution = "";
  do {
    const randomIndex = Math.floor(Math.random() * wordPool.length);
    randomSolution = wordPool[randomIndex]!;
  } while (randomSolution === latestSolution.get(solutionKey));
  latestSolution.set(solutionKey, randomSolution);
  return randomSolution;
}

const solution = generateSolution();
</script>

<template>
  <div>
    <ExercisePageHeader message="Kannst du den Code lösen?" />
    <v-row style="margin-top: 100px;">
      <v-col cols=1></v-col>
      <v-col cols="5">
        <EmojiExercise :solution="solution" />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="5">
        <SolutionInput :solution="solution" />
      </v-col>
      <v-col cols=1></v-col>
    </v-row>
  </div>
</template>