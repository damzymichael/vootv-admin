<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <main class="p-3">
    <Router-view v-slot="{ Component, route }">
      <Transition name="route" mode="out-in">
        <component :is="Component" :key="route.path"></component>
      </Transition>
    </Router-view>
  </main>
</template>

<style>
.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}
.route-leave-to,
.route-enter-from {
  opacity: 0;
  transform: translateY(100px);
}
</style>
