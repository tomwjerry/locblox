<script setup>
// This starter template is using Vue 3 <script setup> SFCs
import { provide, reactive, ref } from 'vue';

import ToolsPane from './components/ToolsPane.vue';
import ContentArea from './components/ContentArea.vue';
import AnimationPane from './components/AnimationPane.vue';
import SettingsPane from './components/SettingsPane.vue';

const contentList = reactive([]);
const currentEdit = ref(0);
const showElementPositions = ref(false);
const nextId = ref(0);

provide('currentEdit', currentEdit);
provide('showElementPositions', showElementPositions);

function insertContent(content, withEdit) {
  contentList.push({
    columns: [{
      isRows: false,
      rows: [],
      type: content,
      value: null,
      id: nextId.value
    }]
  });

  nextId.value++;
}
</script>

<template>
  <div class="flex">
    <ToolsPane @insertContent="insertContent" />
    <div class="content-area">
      <ContentArea :contentList="contentList" />
      <AnimationPane />
    </div>
    <SettingsPane />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

.flex {
  display: flex;
}

.content-area {
  flex-grow: 1;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.content {
  min-height: 2rem;
}
</style>
