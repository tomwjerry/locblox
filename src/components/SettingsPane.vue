<script setup>
import { inject } from 'vue';

const showElementPositions = inject('showElementPositions');
</script>

<template>
    <div>
        <button type="button" @click="showElementPositions = !showElementPositions">Move</button>
    </div>
</template>
