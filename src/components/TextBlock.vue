<template>
    <div :contenteditable="edit" v-html="content"
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
    data() {
        return {
            content: ''
        };
    },
    mounted() {
        this.content = this.modelValue;
    },
    methods: {
        update(ev) {
            this.$emit('update:modelValue', ev.target.innerHTML);
        }
    }
};
</script>
