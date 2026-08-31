<script setup lang="ts">
import RectangleExercise from '../components/RectangleExercise.vue';
import SolutionInput from '../components/SolutionInput.vue';
import ExercisePageHeader from '../components/ExercisePageHeader.vue';

const solution = "10";
</script>

<template>
  <div>
    <ExercisePageHeader message="Wie viele Dreiecke verstecken sich hier?" />
    <v-row style="margin-top: 100px;">
      <v-col cols=1></v-col>
      <v-col cols="5">
        <RectangleExercise />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="5">
        <SolutionInput :solution="solution"></SolutionInput>
      </v-col>
      <v-col cols=1></v-col>
    </v-row>
  </div>
</template>
