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
                <button @click="addElement('TextBlock', '', false)"
                    type="button"
                    class="mb-2"
                >Add text block</button>
                
                <button @click="addElement('ImageBlock', '', false)"
                    type="button"
                    class="mb-2"
                >Add image</button>
                
                <button @click="addElement('QuizBlock', '', true)"
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
                    :id="index"
                    v-model="content.value"
                    @progress="contentProgress(index)"
                ></component>
            </div>
        </main>
    </div>
</template>

<script>
    import TextBlock from './components/TextBlock.vue';
    import ImageBlock from './components/ImageBlock.vue';
    import QuizBlock from './components/QuizBlock.vue';

    export default {
        data() {
            return {
                contentList: [
                    {
                        type: TextBlock,
                        strType: 'TextBlock',
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
            const savedContent = localStorage.getItem('savedcontent');

            if (savedContent) {
                const parsedContent = JSON.parse(savedContent);
                
                if (parsedContent && parsedContent.length) {
                    this.contentList = [];
                    for (let pc of parsedContent) {
                        this.addElement(pc.strType, pc.value, pc.blocking);
                    }
                }
            }

            if (location.pathname == "/view") {
                this.readView = true;
                this.edit = false;
            }

            this.contentProgress(0);
        },
        methods: {
            addElement(elementType, value, blocking) {
                if (elementType == "TextBlock") {
                    this.contentList.push({
                        type: TextBlock,
                        strType: elementType,
                        value: value,
                        blocking: blocking
                    });
                } else if (elementType == "ImageBlock") {
                    this.contentList.push({
                        type: ImageBlock,
                        strType: elementType,
                        value: value,
                        blocking: blocking
                    });
                } else if (elementType == "QuizBlock") {
                    this.contentList.push({
                        type: QuizBlock,
                        strType: elementType,
                        value: value,
                        blocking: blocking
                    });
                }

                this.activeElement = this.contentList[this.contentList.length - 1];
            },
            save() {
                let listToSave = [];

                for (let cl of this.contentList) {
                    listToSave.push({
                        strType: cl.strType,
                        value: cl.value,
                        blocking: cl.blocking
                    });
                }

                localStorage.setItem(
                    'savedcontent',
                    JSON.stringify(listToSave)
                );
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
        }
    };
</script>
