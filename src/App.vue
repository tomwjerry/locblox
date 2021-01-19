<template>
    <text-block v-for="(content, index) in contentList"
        :key="index"
        :edit="edit"
        :value="content"
    ></text-block>

    <button @click="edit = !edit"
        type="button"
        class="mr-2"
    >Edit</button>
    <button @click="addElement()"
        type="button"
    >Add</button>
</template>

<script>
    import TextBlock from './components/TextBlock.vue';

    export default {
        data() {
            return {
                contentList: ['&nbsp;'],
                edit: false
            };
        },
        components: {
            'text-block': TextBlock
        },
        methods: {
            addElement() {
                this.contentList.push('&nbsp;');
            }
        }
    };
</script>
