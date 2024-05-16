<script setup lang="ts">
import type { ReservedProps , ButtonHTMLAttributes} from 'vue'
defineProps<{ loading?: boolean; class: string }>()
defineEmits<{ click: [] }>()
</script>
<template>
  <button :class="class" @click="$emit('click')" :disabled="loading">
    <slot v-if="!loading"></slot>
    <span class="loading loading-spinner text-accent" v-else></span>
  </button>
</template>
