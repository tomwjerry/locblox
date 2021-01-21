<template>
    <div :contenteditable="edit" v-html="modelValue"
        class="text-block mb-2"
        @input="update"
        :class="{ 'edit': edit }"
    ></div>
</template>

<script>
export default {
    props: {
        edit: Boolean,
        modelValue: String
    },
    emits: ['update:modelValue'],
    methods: {
        update(ev) {
            this.$emit('update:modelValue', ev.target.innerHTML);
        }
    }
};
</script>
