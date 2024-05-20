<script setup lang="ts">
defineProps<{ title: string; id: string }>()
</script>

<template>
  <dialog :id="id" class="modal">
    <div class="modal-box relative">
      <h3 class="font-bold mb-3 text-lg text-center">{{ title }}</h3>
      <slot></slot>
      <p class="text-center">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
