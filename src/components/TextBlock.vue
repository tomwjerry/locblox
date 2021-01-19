<template>
    <div :contenteditable="edit" v-html="value"></div>
</template>

<script>
export default {
    props: {
        edit: Boolean,
        value: String
    }
};
</script>
