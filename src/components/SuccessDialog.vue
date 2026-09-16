<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { useRouter } from 'vuetify/lib/composables/router.mjs'
import { watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const router = useRouter()

const qrcode = useQRCode('https://www.puzzleyou.de/jobs', { width: 250 })

let timeout: ReturnType<typeof setTimeout> | null = null

function onSubmit() {
  emit('update:modelValue', false)
  router!.push('/')
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      timeout = setTimeout(() => {
        onSubmit()
      }, 60000)
    } else {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
    }
  },
)
</script>

<template>
  <div>
    <v-dialog max-width="700" :model-value="props.modelValue">
      <template v-slot:default>
        <v-card>
          <v-card-title>
            <h3>puzzleWantsYOU - Richtig gelesen! 🧩</h3>
          </v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <h3>Wir suchen dich!</h3>
            <br />
            <p>Hol dir deinen Gewinn am <b>Glücksrad</b> ab.</p>
            <br />
            <p>
              Aber pssst... Wir haben auch den <b>passenden Ausbildungsplatz</b> für deine Zukunft!
            </p>
            <br />
            <p>Scanne einfach den Code:</p>
            <img class="mt-6 mb-2 rounded border" :src="qrcode" alt="QR Code" />
            <p>https://www.puzzleyou.de/jobs</p>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="onSubmit" color="success" variant="elevated">Alles klar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<style scoped></style>
