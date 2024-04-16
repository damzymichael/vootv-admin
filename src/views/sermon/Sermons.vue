<script setup lang="ts">
import Audio from './Audios.vue'
import Video from './Video.vue'
import Live from './Live.vue'
</script>
<template>
  <div class="sermon">
    <h2 class="text-2xl mb-4 font-bold">Sermons</h2>
    <div role="tablist" class="tabs tabs-bordered">
      <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Audios" checked />
      <div role="tabpanel" class="tab-content p-3 overflow-x-auto">
        <Audio />
      </div>

      <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Videos" />
      <div role="tabpanel" class="tab-content p-3">
        <Video />
      </div>

      <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Live" />
      <div role="tabpanel" class="tab-content p-3">
        <Live />
      </div>
    </div>
  </div>
</template>
