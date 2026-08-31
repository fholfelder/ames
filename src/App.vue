<template>
  <v-app>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-app>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.35s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
</style>

<style>
@import '@/assets/base.css';
</style>
