<script setup>
import { ref } from 'vue';
import RichText from './RichText.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  edit: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <textarea v-if="edit" v-model="modelValue.value"
    class="content"
  ></textarea>
  <RichText v-else v-model="modelValue.value" />
</template>

<style>
textarea {
    height: 100%;
    width: 100%;
}
</style>
