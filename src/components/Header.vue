<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { linkInfo } from '../lib'
import MenuIcon from './svgs/MenuIcon.vue'

const showMobileNav = ref(false)
const route = useRoute()

watch(showMobileNav, (currValue) => {
  document.body.style.overflowY = currValue ? 'hidden' : 'auto'
})
</script>

<template>
  <header
    class="bg-base-300 z-10 sticky top-0 w-full p-3 flex items-center justify-between"
    v-if="route.fullPath != '/'"
  >
    <RouterLink to="/">
      <h1 class="font-extrabold text-2xl italic text-accent">VOO TV</h1>
    </RouterLink>
    <nav class="sm:flex gap-3 hidden">
      <RouterLink v-for="link in linkInfo" :to="link.link" class="link" active-class="link-neutral">
        {{ link.text }}
      </RouterLink>
    </nav>
    <button class="inline-block sm:hidden" @click="showMobileNav = !showMobileNav">
      <MenuIcon />
    </button>
  </header>

  <!-- Sliding navigation  -->
  <Transition name="slide">
    <div
      class="fixed top-0 left-0 z-30 max-w-72 bg-base-200 w-1/2 h-screen block sm:hidden"
      v-if="showMobileNav"
    >
      <h1 class="font-extrabold text-2xl italic text-accent mb-5 p-3">VOO TV</h1>
      <nav class="flex flex-col gap-2 px-1">
        <ul>
          <li v-for="link in linkInfo" @click="showMobileNav = false">
            <RouterLink :to="link.link" class="btn justify-start w-full" active-class="btn-neutral">
              {{ link.text }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </Transition>

  <!-- Dark overlay -->
  <Transition name="fade">
    <div
      v-if="showMobileNav"
      class="fixed top-0 block sm:hidden z-20 w-screen h-screen bg-[#0000009c]"
      @click="showMobileNav = false"
    />
  </Transition>
</template>

<style>
a:link {
  text-decoration: none;
}

.slide-enter-active,
.slide-leave-active {
  transition: left 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  left: -100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
