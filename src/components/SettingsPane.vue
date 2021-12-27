<script setup>
import { inject } from 'vue';
import { settingPaneComponent } from '../main.js';

const showElementPositions = inject('showElementPositions');
const whatSettingsPane = inject('whatSettingsPane');
</script>

<template>
    <div>
        <button type="button" @click="showElementPositions = !showElementPositions">Move</button>
        <component :is="settingPaneComponent(whatSettingsPane)"></component>
    </div>
</template>
