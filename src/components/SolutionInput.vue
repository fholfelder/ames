<script setup lang="ts">
import { ref } from 'vue'
import KeyboardWrapper from './KeyboardWrapper.vue'
import SuccessDialog from './SuccessDialog.vue'
import ErrorDialog from './ErrorDialog.vue'

const props = defineProps<{
  solution: string
}>()

const solutionInput = ref('')
const isDialogOpen = ref()
const isFocused = ref(false)
const showError = ref(false)
const errorMessages = ref()

function checkInput() {
  const solved = solutionInput.value.toLowerCase() == props.solution.toLowerCase()
  isDialogOpen.value = solved
  if (!solved) showError.value = true
}

function enterCharacter(event: unknown) {
  isFocused.value = true
  switch (event) {
    case '{bksp}':
      solutionInput.value = solutionInput.value.slice(0, -1)
      break
    case '{enter}':
      checkInput()
      break
    case '{space}':
      solutionInput.value = solutionInput.value + ' '
      break
    case '{tab}':
    case '{lock}':
    case '{shift}':
      break
    default:
      solutionInput.value = solutionInput.value + event
  }
}
</script>

<template>
  <div>
    <ErrorDialog v-model="showError"></ErrorDialog>
    <v-row>
      <v-col class="d-flex justify-center">
        <h1>Eingabe Lösung</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          class="mb-5"
          v-model="solutionInput"
          label="Lösungswort"
          :errorMessages="errorMessages"
          variant="outlined"
          height="200"
          @keyup.enter="checkInput"
          inputmode="none"
          focused
          readonly
        ></v-text-field>
        <v-btn color="success" @click="checkInput">Eingabe prüfen</v-btn>
        <SuccessDialog v-model="isDialogOpen"></SuccessDialog>
      </v-col>
      <v-col cols="12">
        <keyboard-wrapper @onKeyPress="enterCharacter"></keyboard-wrapper>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>
