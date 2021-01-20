<template>
    <div class="layout">
        <aside>
            <button @click="edit = !edit"
                type="button"
                class="mb-2"
            >Edit</button>
            
            <button @click="save()"
                type="button"
                class="mb-2"
            >Save</button>

            <div v-if="edit">
                <button @click="addElement('TextBlock')"
                    type="button"
                    class="mb-2"
                >Add text block</button>
                
                <button @click="addElement('ImageBlock')"
                    type="button"
                >Add image block</button>
            </div>
        </aside>

        <main>
            <div v-for="(content, index) in contentList"
                :key="index"
                @click="activeElement = content"
            >
                <component
                    :is="content.type"
                    :edit="edit"
                    :value="content.value"
                ></component>
            </div>
        </main>
    </div>
</template>

<script>
    import TextBlock from './components/TextBlock.vue';
    import ImageBlock from './components/ImageBlock.vue';

    export default {
        data() {
            return {
                contentList: [
                    {
                        type: TextBlock,
                        strType: 'TextBlock',
                        value: ''
                    },
                    {
                        type: ImageBlock,
                        strType: 'ImageBlock',
                        value: ''
                    }
                ],
                edit: false,
                activeElement: null
            };
        },
        components: {
            'text-block': TextBlock
        },
        created() {
            const savedContent = localStorage.getItem('savedcontent');

            if (savedContent) {
                const parsedContent = JSON.parse(savedContent);
                
                if (parsedContent && parsedContent.length) {
                    this.contentList = [];
                    for (let pc of parsedContent) {
                        this.addElement(pc.strType, pc.value);
                    }
                }
            }
        },
        methods: {
            addElement(elementType, value) {
                if (elementType == "TextBlock") {
                    this.contentList.push({
                        type: TextBlock,
                        strType: elementType,
                        value: ''
                    });
                } else if (elementType == "ImageBlock") {
                    this.contentList.push({
                        type: ImageBlock,
                        strType: elementType,
                        value: ''
                    });
                }

                this.activeElement = this.contentList[this.contentList.length - 1];
            },
            save() {
                let listToSave = [];

                for (let cl of this.contentList) {
                    listToSave.push({
                        strType: cl.strType,
                        value: cl.value
                    });
                }

                localStorage.setItem(
                    'savedcontent',
                    JSON.stringify(listToSave)
                );
            }
        }
    };
</script>
