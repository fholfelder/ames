<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface Props {
  message: string;
  avatarSrc?: string;
  size?: number;
  top?: string;
  centered?: boolean;
  left?: string;
  portalDelay?: number;
  avatarDelay?: number;
  shrinkDelay?: number;
  removeDelay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  avatarSrc: () => new URL('@/assets/raetselbert.gif', import.meta.url).href,
  size: 220,
  top: '20px',
  centered: true,
  left: '40px',
  portalDelay: 200,
  avatarDelay: 500,
  shrinkDelay: 1300,
  removeDelay: 1800,
});

const showPortal = ref(false);
const showAvatar = ref(false);
const portalShrinking = ref(false);
const showBubble = ref(false);

const portalSize = computed(() => Math.round(props.size * 0.55));
const bubbleLeft = computed(() => `${props.size / 2 + 30}px`);

onMounted(() => {
  setTimeout(() => { showPortal.value = true; }, props.portalDelay);
  setTimeout(() => { showAvatar.value = true; }, props.avatarDelay);
  setTimeout(() => { portalShrinking.value = true; }, props.shrinkDelay);
  setTimeout(() => { showPortal.value = false; }, props.removeDelay);
  setTimeout(() => { showBubble.value = true; }, props.shrinkDelay);
});
</script>

<template>
  <div
    class="portal-corner"
    :style="centered ? { top } : { top, left }"
  >
    <div
      v-if="showPortal"
      class="portal-small"
      :class="{ 'portal-shrink': portalShrinking }"
      :style="{ width: portalSize + 'px', height: portalSize + 'px' }"
    ></div>
    <img
      v-if="showAvatar"
      alt="Rätselbert"
      :src="avatarSrc"
      class="avatar-corner"
      :style="{ height: size + 'px' }"
    />
    <Transition name="bubble-fade">
      <div
        v-if="showBubble"
        class="speech-bubble-corner"
        :style="{ left: bubbleLeft }"
      >
        <p>{{ message }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.portal-corner {
  position: relative;
  width: 0;
  height: 0;
  z-index: 200;
  pointer-events: none;
  top: 20px;
}

.portal-small {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, #000000 0%, #1a1a1a 60%, transparent 100%);
  box-shadow: 0 0 30px 8px rgba(0, 0, 0, 0.6);
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  animation: portalAppear 0.4s ease-out forwards;
}

.portal-small.portal-shrink {
  animation: portalDisappear 0.5s ease-in forwards;
}

@keyframes portalAppear {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

@keyframes portalDisappear {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
}

.avatar-corner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  animation: spitOut 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes spitOut {
  0% { transform: translate(-50%, -50%) scale(0.1) rotate(-30deg); opacity: 0; }
  60% { transform: translate(-50%, -60%) scale(1.1) rotate(8deg); opacity: 1; }
  100% { transform: translate(-50%, -70%) scale(1) rotate(0deg); opacity: 1; }
}

.speech-bubble-corner {
  position: absolute;
  top: -100px;
  background: #ffffff;
  border: 2px solid #1F82A5;
  border-radius: 16px;
  padding: 12px 16px;
  width: 300px;
  pointer-events: none;
}

.speech-bubble-corner p {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1F82A5;
}

.speech-bubble-corner::before {
  content: '';
  position: absolute;
  left: -14px;
  top: 24px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 14px solid #1F82A5;
}

.speech-bubble-corner::after {
  content: '';
  position: absolute;
  left: -11px;
  top: 25px;
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  border-right: 12px solid #ffffff;
}

.bubble-fade-enter-active {
  transition: all 0.4s ease-out;
}
.bubble-fade-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}
.bubble-fade-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
