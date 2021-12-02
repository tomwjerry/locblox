<script setup>
import { inject, reactive } from 'vue';
import LayoutColumnEditor from './LayoutColumnEditor.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: {}
  },
  edit: {
    type: Boolean,
    default: false
  }
});

const showElementPositions = inject('showElementPositions');
</script>

<template>
    <div class="row">
        <div class="dropslot" v-if="showElementPositions"></div>
        <template v-for="(column, index) in modelValue.columns">
            <LayoutColumnEditor v-model="modelValue.columns[index]" />
            <div class="dropslot" v-if="showElementPositions"></div>
        </template>
    </div>
</template>

<style>
.row {
  display: flex;
  min-height: 2rem;
  margin-bottom: 0.2rem;
  justify-content: center;
}
</style>
