<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});
</script>

<template>
    <img :src="props.modelValue" alt="">
</template>
