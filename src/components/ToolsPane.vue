<script setup>
const emit = defineEmits(['insertContent']);

function callInsertContent(content) {
    emit('insertContent', content);
}
</script>

<template>
    <div class="tools">
        <button type="button" @click="callInsertContent('RichText')">RichText</button>
        <button type="button" @click="callInsertContent('Image')">Image</button>
        <button type="button" @click="callInsertContent('Layout')">Layout</button>
    </div>
</template>

<style>
    .tools button {
        width: 43%;
        height: 3rem;
        margin-right: 0.3rem;
        margin-bottom: 0.3rem;
    }
</style>
