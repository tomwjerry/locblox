<template>
    <div :contenteditable="edit" v-html="value"
        class="text-block mb-2"
        @blur="update"
        :class="{ 'edit': edit }"
    ></div>
</template>

<script>
export default {
    props: {
        edit: Boolean,
        value: String
    },
    methods: {
        update(ev) {
            this.$emit('input', ev.target.innerHTML)
        }
    }
};
</script>
