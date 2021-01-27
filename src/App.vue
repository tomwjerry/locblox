<template>
    <div class="layout">
        <aside v-if="!readView">
            <button @click="edit = !edit"
                type="button"
                class="mb-2 mr-2"
            >View</button>
            
            <button @click="save()"
                type="button"
                v-if="edit"
                class="mb-2"
            >Save</button>

            <div v-if="edit">
                <button @click="addElement('text-block', '', false)"
                    type="button"
                    class="mb-2"
                >Add text block</button>
                
                <button @click="addElement('image-block', '', false)"
                    type="button"
                    class="mb-2"
                >Add image</button>
                
                <button @click="addElement('quiz-block', '', true)"
                    type="button"
                >Add quiz</button>
            </div>
        </aside>

        <main>
            <div v-for="(content, index) in readContent"
                :key="index"
                @click="activeElement = content"
            >
                <component
                    :is="content.type"
                    :edit="edit"
                    :mid="index"
                    v-model="content.value"
                    @progress="contentProgress(index)"
                ></component>
            </div>
        </main>
    </div>
</template>

<script>
    import ContentStorageProvider from './services/ContentStorageProvider.js';
    import TextBlock from './components/TextBlock.vue';
    import ImageBlock from './components/ImageBlock.vue';
    import QuizBlock from './components/QuizBlock.vue';

    export default {
        data() {
            return {
                contentList: [
                    {
                        type: 'text-block',
                        value: '',
                        blocking: false
                    }
                ],
                edit: true,
                readView: false,
                activeElement: null,
                readUntil: 0
            };
        },
        created() {
            const parsedContent =
                ContentStorageProvider.getProvier().getContent();
                
            if (parsedContent && parsedContent.length) {
                this.contentList = [];
                for (let pc of parsedContent) {
                    this.addElement(pc.type, pc.value, pc.blocking);
                }
            }

            if (location.pathname == '/view') {
                this.readView = true;
                this.edit = false;
            }

            this.contentProgress(0);
        },
        methods: {
            addElement(elementType, value, blocking) {
                this.contentList.push({
                    type: elementType,
                    value: value,
                    blocking: blocking
                });

                this.activeElement = this.contentList[this.contentList.length - 1];
            },
            save() {
                ContentStorageProvider.getProvier().saveContent(this.contentList);
            },
            contentProgress(curIndex) {
                for (let i = curIndex + 1; i < this.contentList.length; i++) {
                    this.readUntil = i;
                    if (this.contentList[i].blocking) {
                        return;
                    }
                }
            }
        },
        computed: {
            readContent() {
                if (this.edit) {
                    return this.contentList;
                } else {
                    return this.contentList.slice(0, this.readUntil + 1);
                }
            }
        },
        components: {
            'text-block': TextBlock,
            'image-block': ImageBlock,
            'quiz-block': QuizBlock
        }
    };
</script>
