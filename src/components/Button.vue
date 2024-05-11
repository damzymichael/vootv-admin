<script setup lang="ts">
defineProps<{ loading?: boolean }>()
defineEmits<{ click: [] }>()
</script>
<template>
  <button
    class="btn btn-primary btn-md inline-block min-w-20"
    @click="$emit('click')"
    :disabled="loading"
  >
    <slot v-if="!loading"></slot>
    <span class="loading loading-spinner text-loading" v-else></span>
  </button>
</template>
