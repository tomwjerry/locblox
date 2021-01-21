<template>
    <div class="mb-2 image-block">
        <img :src="img" alt="">
        <input type="file" v-if="edit" @change="upload">
    </div>
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
            img: ''
        };
    },
    mounted() {
        this.img = this.modelValue;
    },
    methods: {
        upload(ev) {
            const fileIn = ev.target.files[0];
            const fileReader = new FileReader;
            let rthis = this;

            fileReader.onload = function(e) {
                rthis.img = e.target.result;

                this.$emit('update:modelValue', rthis.img);
            };

            fileReader.readAsDataURL(fileIn);
        }
    }
};
</script>
