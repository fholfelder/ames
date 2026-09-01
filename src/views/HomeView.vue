<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vuetify/lib/composables/router.mjs'

const router = useRouter()

const isFalling = ref(false)
const showButton = ref(true)
const showPortal = ref(false)

const showEntryPortal = ref(false)
const entryPortalShrinking = ref(false)
const showAvatar = ref(false)

const avatarSrc = computed(() =>
  isFalling.value
    ? new URL('@/assets/raetselbert.gif', import.meta.url).href
    : new URL('@/assets/raetselbert.gif', import.meta.url).href
)

const showBubble = computed(() => showAvatar.value && !isFalling.value)

onMounted(() => {
  setTimeout(() => {
    showEntryPortal.value = true
  }, 200)

  setTimeout(() => {
    showAvatar.value = true
  }, 500)

  setTimeout(() => {
    entryPortalShrinking.value = true
  }, 1200)

  setTimeout(() => {
    showEntryPortal.value = false
  }, 1700)
})

function startFallSequence() {
  showButton.value = false
  showPortal.value = true

  setTimeout(() => {
    isFalling.value = true
  }, 250)

  setTimeout(() => {
    router!.push('exercise')
  }, 1600)
}
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <img alt="puzzleYOU" class="logo" src="@/assets/logo.png" height="250" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-end avatar-row">
        <Transition name="bubble-vanish">
          <div v-if="showBubble" class="speech-bubble">
            <p>Kannst du das Rätsel lösen?</p>
          </div>
        </Transition>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center portal-col">
        <div class="button-anchor">
          <!-- Eintritts-Portal -->
          <div
            v-if="showEntryPortal"
            class="entry-portal"
            :class="{ 'entry-portal-shrink': entryPortalShrinking }"
          ></div>

          <!-- Ausgangs-Portal (jetzt eigener, leicht linksversetzter Anker) -->
          <div v-if="showPortal" class="portal" :class="{ 'portal-active': showPortal }"></div>

          <!-- Avatar -->
          <img
            v-if="showAvatar"
            alt="Rätselbert"
            :src="avatarSrc"
            class="avatar"
            :class="{ 'avatar-falling': isFalling, 'avatar-spawn': !isFalling }"
          />

          <!-- Button mit Verschwinden-Animation -->
          <Transition name="button-vanish">
            <v-card
              v-if="showButton"
              class="mt-12"
              @click="startFallSequence"
              color="#1F82A5"
            >
              <v-card-item class="go-card text-center d-flex flex-column align-center justify-center">
                Los gehts!
              </v-card-item>
            </v-card>
          </Transition>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style>
.go-card {
  aspect-ratio: 1;
  width: 350px;
  font-size: 32px;
}

.button-vanish-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.85, 0.35);
  position: absolute;
}
.button-vanish-leave-to {
  transform: scale(0.2) rotate(20deg) translateY(40px);
  opacity: 0;
}
.button-vanish-leave-from {
  transform: scale(1) rotate(0deg) translateY(0);
  opacity: 1;
}

.avatar-row {
  gap: 16px;
}

.speech-bubble {
  position: relative;
  background: #ffffff;
  border: 2px solid #1F82A5;
  border-radius: 16px;
  padding: 16px 20px;
  max-width: 300px;
  margin-left: 200px;
  margin-bottom: -30px;
}
.speech-bubble p {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1F82A5;
}
.speech-bubble::before {
  content: '';
  position: absolute;
  left: -14px;
  bottom: 20px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 14px solid #1F82A5;
}
.speech-bubble::after {
  content: '';
  position: absolute;
  left: -11px;
  bottom: 21px;
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  border-right: 12px solid #ffffff;
}

.bubble-vanish-enter-active,
.bubble-vanish-leave-active {
  transition: all 0.3s ease;
}
.bubble-vanish-enter-from,
.bubble-vanish-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.bubble-vanish-enter-to,
.bubble-vanish-leave-from {
  opacity: 1;
  transform: scale(1);
}

.portal-col {
  min-height: 400px;
  align-items: flex-end;
}

.button-anchor {
  position: relative;
  display: inline-block;
}

/* Basiszustand jetzt MIT transform, damit beim Wechsel avatar-spawn -> avatar-falling
   kein kurzer Frame ohne Transform (= Sprung zur Ankerecke) entsteht */
.avatar {
  height: 180px;
  position: absolute;
  top: 25px;
  left: 5px;
  transform: translate(-45%, -55%);
  z-index: 100;
  transform-origin: center center;
}

.entry-portal {
  position: absolute;
  transform: translate(-45%, -55%) scale(0);
  width: 40px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, #000000 0%, #1a1a1a 60%, transparent 100%);
  box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.6);
  z-index: 90;
  opacity: 0;
  animation: entryPortalGrow 0.4s ease-out forwards;
}

.entry-portal.entry-portal-shrink {
  animation: entryPortalDisappear 0.5s ease-in forwards;
}

@keyframes entryPortalGrow {
  0% { transform: translate(-45%, -55%) scale(0); opacity: 0; }
  100% { transform: translate(-45%, -55%) scale(1); opacity: 1; width: 180px; height: 50px; }
}

@keyframes entryPortalDisappear {
  0% { transform: translate(-45%, -55%) scale(1); opacity: 1; width: 180px; height: 50px; }
  100% { transform: translate(-45%, -55%) scale(0); opacity: 0; width: 180px; height: 50px; }
}

.avatar-spawn {
  animation: spawnFromPortal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes spawnFromPortal {
  0% {
    transform: translate(-45%, -30%) scale(0.1) rotate(-30deg);
    opacity: 0;
  }
  60% {
    transform: translate(-45%, -75%) scale(1.1) rotate(8deg);
    opacity: 1;
  }
  100% {
    transform: translate(-45%, -55%) scale(1) rotate(0deg);
    opacity: 1;
  }
}

.portal {
  position: absolute;
  top: 25px;
  left: -130px;
  transform: translate(-145%, -55%) scale(0);
  width: 40px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, #000000 0%, #1a1a1a 60%, transparent 100%);
  box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.6);
  z-index: 50;
  opacity: 0;
}

.portal-active {
  animation: portalGrow 0.5s ease-out forwards;
}

@keyframes portalGrow {
  0% { transform: translate(-70%, -55%) scale(0); opacity: 0; }
  100% { transform: translate(-70%, -55%) scale(1); opacity: 1; width: 200px; height: 55px; }
}

.avatar-falling {
  animation: fallIntoPortal 1s cubic-bezier(0.55, 0, 0.85, 0.35) forwards;
  z-index: 40;
}

@keyframes fallIntoPortal {
  0% { transform: translate(-145%, -255%) scale(1) rotate(0deg); opacity: 1; }
  100% { transform: translate(-145%, -55%) scale(0.1) rotate(45deg); opacity: 0; }
}
</style>