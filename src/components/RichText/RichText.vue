<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="content">{{ modelValue }}</div>
</template>
