<template>
    <div :contenteditable="edit" v-html="value"
        class="text-block"
        :class="{ 'edit': edit }"
    ></div>
</template>

<script>
export default {
    props: {
        edit: Boolean,
        value: String
    }
};
</script>
