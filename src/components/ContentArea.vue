<script setup>
import { inject } from 'vue';
import LayoutRowEditor from './Layout/LayoutRowEditor.vue';
import GridEditor from './Grid/GridEditor.vue';

const props = defineProps({
  contentList: Array
});

const showElementPositions = inject('showElementPositions');
</script>

<template>
  <div v-if="false">
    <div class="row dropslot" v-if="showElementPositions"></div>
    <template v-for="(row, index) in contentList">
      <LayoutRowEditor v-model="contentList[index]"
      />
      <div class="row dropslot" v-if="showElementPositions"></div>
    </template>
  </div>
  <GridEditor />
</template>

<style>
.dropslot {
  border: 1px dashed #a0a0a0;
  min-height: 1rem;
  flex-grow: 1;
  min-width: 2rem;
}
</style>
