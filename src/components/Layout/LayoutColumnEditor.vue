<script setup>
import { inject, reactive, ref, watch } from 'vue';
import LayoutRowEditor from './LayoutRowEditor.vue';
import ImageEditor from '../Image/ImageEditor.vue';
import RichTextEditor from '../RichText/RichTextEditor.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: {}
  }
});

const showElementPositions = inject('showElementPositions');
const currentEdit = inject('currentEdit');

const rows = reactive(props.modelValue.rows);
const componentObj = reactive(props.modelValue);
const isRows = ref(false);

function whatComponent(componentType) {
  if (componentType == 'Image') {
    return ImageEditor;
  } else {
    return RichTextEditor;
  }
}

watch(() => props.modelValue, (first, second) => {
  isRows = second.isRows;
  rows = second.rows;
  componentObj = second;
});
</script>

<template>
  <div class="column">
    <div class="dropslot" v-if="showElementPositions"></div>
    <div class="content" v-if="!isRows" @click="currentEdit = componentObj.id">
      <component :is="whatComponent(componentObj.type)"
        v-model="componentObj"
        :edit="currentEdit == componentObj.id"
      />
    </div>
    <div class="dropslot" v-if="showElementPositions && !isRows"></div>
    <div v-if="isRows">
      <template v-for="row in rows">
        <LayoutRowEditor />
        <div class="dropslot" v-if="showElementPositions"></div>
      </template>
    </div>

    <div class="settings"></div>
  </div>
</template>

<style>
.column {
 flex-grow: 8;
 position: relative;
}

.column .settings {
  position: absolute;
  right: 0;
  top: 0;
  height: 1rem;
  width: 1rem;
  background-color: #d0d0d0;
  pointer-events: none;
}
</style>
