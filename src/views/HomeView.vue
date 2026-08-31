<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vuetify/lib/composables/router.mjs'

const router = useRouter()

const isFalling = ref(false)
const showButton = ref(true)
const showPortal = ref(false)

// Eintritts-Sequenz: Rätselbert springt beim Laden aus einem Portal
const showEntryPortal = ref(false)
const entryPortalShrinking = ref(false)
const showAvatar = ref(false)

const avatarSrc = computed(() =>
  isFalling.value
    ? new URL('@/assets/raetselbert-faellt.gif', import.meta.url).href
    : new URL('@/assets/raetselbert.gif', import.meta.url).href
)

onMounted(() => {
  // 1. Eintritts-Portal erscheint
  setTimeout(() => {
    showEntryPortal.value = true
  }, 200)

  // 2. Rätselbert springt heraus und landet auf seiner Position
  setTimeout(() => {
    showAvatar.value = true
  }, 500)

  // 3. Eintritts-Portal schrumpft wieder weg
  setTimeout(() => {
    entryPortalShrinking.value = true
  }, 1200)

  // 4. Eintritts-Portal komplett aus dem DOM entfernen
  setTimeout(() => {
    showEntryPortal.value = false
  }, 1700)
})

function startFallSequence() {
  // 1. Button startet Verschwinden-Animation (via <Transition>)
  showButton.value = false

  // 2. Portal erscheinen lassen
  showPortal.value = true

  // 3. kurz warten, dann Gif wechseln & Fallanimation starten
  setTimeout(() => {
    isFalling.value = true
  }, 250)

  // 4. Nach Ende der Fallanimation zur nächsten Seite
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
        <div class="speech-bubble">
          <p>Kannst du das Rätsel lösen?</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center portal-col">
        <!-- Eintritts-Portal (beim Laden der Seite) -->
        <div
          v-if="showEntryPortal"
          class="entry-portal"
          :class="{ 'entry-portal-shrink': entryPortalShrinking }"
        ></div>

        <!-- Ausgangs-Portal (beim Klick auf den Button) -->
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

/* Verschwinden-Animation für den Button: schrumpft, rotiert leicht
   und wird transparent - wie ein "Reingesogen werden" ins Portal */
.button-vanish-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.85, 0.35);
  position: absolute;
}
.button-vanish-leave-to {
  transform: scale(0.2) rotate(20deg) translateY(40px);
  opacity: 0;
}
/* Startzustand explizit setzen, damit der Übergang sauber von "normal" ausgeht */
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
  margin-bottom: 20px;
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

.portal-col {
  position: relative;
  min-height: 400px;
  align-items: flex-end;
}

.avatar {
  height: 150px;
  flex-shrink: 0;
  position: absolute;
  bottom: 312px;
  z-index: 100;
}

/* Eintritts-Portal: erscheint an Rätselberts Zielposition beim Laden der Seite */
.entry-portal {
  position: absolute;
  bottom: 300px;
  width: 40px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, #000000 0%, #1a1a1a 60%, transparent 100%);
  box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.6);
  z-index: 90;
  transform: scale(0);
  opacity: 0;
  animation: entryPortalGrow 0.4s ease-out forwards;
}

.entry-portal.entry-portal-shrink {
  animation: entryPortalDisappear 0.5s ease-in forwards;
}

@keyframes entryPortalGrow {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; width: 180px; height: 50px; }
}

@keyframes entryPortalDisappear {
  0% { transform: scale(1); opacity: 1; width: 180px; height: 50px; }
  100% { transform: scale(0); opacity: 0; width: 180px; height: 50px; }
}

/* Rätselbert springt aus dem Portal heraus auf seine Position */
.avatar-spawn {
  animation: spawnFromPortal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes spawnFromPortal {
  0% {
    bottom: 280px;
    transform: scale(0.1) rotate(-30deg);
    opacity: 0;
  }
  60% {
    bottom: 330px;
    transform: scale(1.1) rotate(8deg);
    opacity: 1;
  }
  100% {
    bottom: 312px;
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.portal {
  position: absolute;
  bottom: 40px;
  width: 40px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, #000000 0%, #1a1a1a 60%, transparent 100%);
  box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.6);
  z-index: 50;
  transform: scale(0);
  opacity: 0;
}

.portal-active {
  animation: portalGrow 0.5s ease-out forwards;
}

@keyframes portalGrow {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; width: 312px; height: 60px; }
}

.avatar-falling {
  animation: fallIntoPortal 1s cubic-bezier(0.55, 0, 0.85, 0.35) forwards;
  z-index: 40;
}

@keyframes fallIntoPortal {
  0% { bottom: 312px; transform: scale(1) rotate(0deg); opacity: 1; }
  60% { bottom: 120px; transform: scale(0.7) rotate(15deg); opacity: 1; }
  100% { bottom: 20px; transform: scale(0.1) rotate(45deg); opacity: 0; }
}
</style>
