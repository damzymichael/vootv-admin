<script setup lang="ts">
defineProps<{ title: string; id: string }>()
//querySelector to close modal after uploading
</script>

<template>
  <dialog :id="id" class="modal">
    <div class="modal-box h-[70vh]">
      <h3 class="font-bold mb-8 text-lg text-center">{{ title }}</h3>
      <slot></slot>
      <p class="py-6 text-center">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
