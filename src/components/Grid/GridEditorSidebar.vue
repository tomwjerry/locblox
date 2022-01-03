<script setup>
import { inject } from 'vue';

const emitter = inject('emitter');
function reset() {
    emitter.emit('reset');
}
</script>

<template>
    <div>
        <button>Add</button>
        <button>Edit</button>
        <button @click="reset">Reset</button>
    </div>
</template>
