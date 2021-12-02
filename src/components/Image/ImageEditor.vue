<script setup>
import { ref } from 'vue';

import Image from './Image.vue';

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

const value = ref('');

function changeImage(ev) {
    const [file] = ev.target.files;

    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            value.value = reader.result;
        }
        reader.readAsDataURL(file);
    }
}
</script>

<template>
    <Image v-model="value" />
    <input type="file" @change="changeImage" v-if="edit">
</template>
