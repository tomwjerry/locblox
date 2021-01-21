<template>
    <div class="mb-2">
        <div v-for="(opt, index) in options"
            :key="index"
            class="mb-2"
        >
            <label v-if="!edit">
                <input :type="multiple ? 'checkbox' : 'radio'"
                    :name="'quizAns_' + id"
                    :value="index"
                    :checked="yourAnswer[index]"
                    @input="answeredOpt($event, index)"
                >
                {{ opt.text }}
            </label>
            <input :type="multiple ? 'checkbox' : 'radio'"
                :checked="opt.correct"
                @input="checkCorrectOpt($event, opt)"
                v-if="edit"
                :name="'quiz_' + id"
            >
            <input type="text" v-model="opt.text" v-if="edit">
        </div>

        <div v-if="!edit && answerRevealed">
            {{ answerRevealed == "correct" ? "Correct!" : "Not correct" }}
        </div>

        <button type="button" @click="addOption()"
            v-if="edit"
        >Add</button>
        <button type="button" @click="checkAnswer()"
            v-if="!edit"
        >Check answer</button>
    </div>
</template>

<script>
export default {
    props: {
        edit: Boolean,
        modelValue: Object,
        id: Number
    },
    emits: ['update:modelValue'],
    data() {
        return {
            multiple: false,
            options: [],
            yourAnswer: [],
            answerRevealed: false
        };
    },
    mounted() {
        if (this.modelValue) {
            if (this.modelValue.multiple) {
                this.multiple = this.modelValue.multiple;
            }

            if (this.modelValue.options) {
                this.options = []
                
                for (let opt of this.modelValue.options) {
                    this.options.push(opt);
                    this.yourAnswer.push(false);
                }
            }
        }
    },
    methods: {
        addOption() {
            this.options.push({
                text: '',
                correct: this.options.length < 1
            });

            this.yourAnswer.push(false);

            this.$emit('update:modelValue', {
                multiple: this.multiple,
                options: this.options
            });
        },
        checkCorrectOpt(ev, opt) {
            if (this.multiple) {
                opt.correct = ev.target.checked;
            } else if (ev.target.checked) {
                for (let opt of this.options) {
                    opt.correct = false;
                }
                
                opt.correct = true;
            }
            
            this.$emit('update:modelValue', {
                multiple: this.multiple,
                options: this.options
            });
        },
        checkAnswer() {
            let wrongAnswer = false;
            for (let oi = 0; oi < this.options.length; oi++) {
                if (this.yourAnswer[oi] && !this.options[oi].correct) {
                    wrongAnswer = true;
                    break;
                }
                
                if (!this.yourAnswer[oi] && this.options[oi].correct) {
                    wrongAnswer = true;
                    break;
                }
            }

            if (wrongAnswer) {
                this.answerRevealed = "wrong";
            } else {
                this.answerRevealed = "correct";
            }
        },
        answeredOpt(ev, oidx) {
            if (this.multiple) {
                this.yourAnswer[oidx] = ev.target.checked;
            } else if (ev.target.checked) {
                for (let ai = 0; ai < this.yourAnswer.length; ai++) {
                    this.yourAnswer[ai] = false;
                }
                
                this.yourAnswer[oidx] = true;
            }
        }
    }
};
</script>

