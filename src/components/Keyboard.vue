<template>
  <div :class="keyboardClass"></div>
</template>

<script setup lang="ts">
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  keyboardClass: {
    type: String,
    default: () => "simple-keyboard",
  },
  input: String
})

const emit = defineEmits(['onChange', 'onKeyPress']);

const keyboard = ref<Keyboard>();

onMounted(() => {
  keyboard.value = new Keyboard(props.keyboardClass, {
    onChange: onChange,
    onKeyPress: onKeyPress,
    layout: {
      'default': [
        '0 1 2 3 4 5 6 7 8 9',
        'q w e r t z u i o p {bksp}',
        '{lock} a s d f g h j k l {enter}',
        '{shift} y x c v b n m , . / {shift}',
        '{space}'
      ],
      'shift': [
        '0 1 2 3 4 5 6 7 8 9',
        'Q W E R T Z U I O P {bksp}',
        '{lock} A S D F G H J K L {enter}',
        '{shift} Y X C V B N M < > ? {shift}',
        '{space}'
      ]
    }
  });
  document.querySelector('.hg-button-enter').textContent = 'enter';
});

function onChange(input: any) {
  emit("onChange", input);
}

function onKeyPress(button: any) {
  emit("onKeyPress", button);

  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  const currentLayout = keyboard.value!.options.layoutName;
  const shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.value!.setOptions({
    layoutName: shiftToggle
  });
}

watch(
  () => props.input,
  (val) => {
    keyboard.value!.setInput(val);
  }
);
</script>

<style>
.hg-button {
  font-size: 22px;
}
</style>
