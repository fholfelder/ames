<script setup lang="ts">
import PortalAvatar from './PortalAvatar.vue';
import { useRouter } from 'vuetify/lib/composables/router.mjs';

interface Props {
  message: string;
  avatarSrc?: string;
  size?: number;
  logoTarget?: string; // Route, zu der das Logo navigiert
}

withDefaults(defineProps<Props>(), {
  logoTarget: '/',
});

const router = useRouter();
</script>

<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-end">
        <img
          alt="puzzleYOU"
          class="logo"
          src="@/assets/logo.png"
          height="120"
          @click="router!.push(logoTarget)"
        />
      </v-col>
    </v-row>
    <v-row class="avatar-row">
      <v-col class="d-flex justify-center">
        <PortalAvatar :message="message" :avatar-src="avatarSrc" :size="size" />
      </v-col>
    </v-row>
  </div>
</template>
