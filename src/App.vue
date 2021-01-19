<template>
    <component v-for="(content, index) in contentList"
        :is="content.type"
        :key="index"
        :edit="edit"
        :value="content.value"
    ></component>

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
    import ImageBlock from './components/ImageBlock.vue';

    export default {
        data() {
            return {
                contentList: [
                    { type: TextBlock, value: '' },
                    { type: ImageBlock, value: '' }
                ],
                edit: false
            };
        },
        components: {
            'text-block': TextBlock
        },
        methods: {
            addElement() {
                this.contentList.push({ type: TextBlock, value: '' });
            }
        }
    };
</script>
