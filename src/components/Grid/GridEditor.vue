<script setup>
import { inject, onMounted, ref, reactive } from 'vue';

const whatSettingsPane = inject('whatSettingsPane');

whatSettingsPane.value = 'GridEditorSidebar';

const mode = ref('insert');

const gridProps = reactive({
    columns: [1],
    rows: [1]
});
const gridPropsStr = ref('');
const gridItemDoms = ref(1);

const hticks = reactive([]);
const vticks = reactive([]);
const gridEditorDOM = ref(null);

for (let v = 0; v < 100; v += 10) {
    vticks.push(v);
}

for (let h = 0; h < 100; h += 10) {
    hticks.push(h);
}

function rulerClick(pos, e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top;
    
    if (pos == 'v') {
        let itemSize = 1 - y / rect.height;
        const oldRows = gridProps.rows.length;
        let remainingSpace = oldRows + 1;

        for (let i = 0; i < oldRows - 1; i++) {
            const percSize = gridProps.rows[i] / oldRows;
            const newSize = (oldRows + 1) * percSize;
            remainingSpace -= newSize;
            gridProps.rows[i] = newSize;
        }

        const newSize = itemSize * (oldRows + 1);
        remainingSpace -= newSize;
        gridProps.rows.push(newSize);

        gridProps.rows[oldRows - 1] = remainingSpace;
    } else if (pos == 'h') {
        let itemSize = x / rect.width;
        gridProps.columns.push(1);
    }

    gridPropsStr.value = 'grid-template-columns: ' +
        gridProps.columns.map(c => c + 'fr').join(' ') +
        '; grid-template-rows: ' +
        gridProps.rows.map(r => r + 'fr').join(' ');
    
    if (gridProps.rows.length > 0) {
        if (gridProps.columns.length > 0) {
            gridItemDoms.value = gridProps.rows.length *
                gridProps.columns.length;
            
        } else {
            gridItemDoms.value = gridProps.rows.length;
        }
    } else {
        gridItemDoms.value = gridProps.columns.length;
    }
}
</script>

<template>
    <div class="grid-editor" ref="gridEditorDOM">
        <div class="measure-space">
            <div class="measure left" @click="rulerClick('v', $event)">
                <div v-for="tick in vticks" class="tick" :style="tick.style"
                >{{ tick.dispVal }}</div>
            </div>
        </div>
        <div class="inner">
            <div class="measure top"  @click="rulerClick('h', $event)">
                <div v-for="tick in hticks" class="tick" :style="tick.style"
                >{{ tick.dispVal }}</div>
            </div>
            <div class="grid" :style="gridPropsStr">
                <div class="item" v-for="index in gridItemDoms"></div>
            </div>
            <div class="measure bottom" @click="rulerClick('h', $event)">
                <div v-for="tick in hticks" class="tick" :style="tick.style"
                >{{ tick.dispVal }}</div>
            </div>
        </div>
        <div class="measure-space">
            <div class="measure right"  @click="rulerClick('v', $event)">
                <div v-for="tick in vticks" class="tick" :style="tick.style"
                >{{ tick.dispVal }}</div>
            </div>
        </div>
    </div>
</template>

<style>
.grid {
    display: grid;
    flex-grow: 1;
}

.grid-editor {
    display: flex;
    height: 100%;
}

.grid-editor .measure-space {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.measure {
    /* Low ticks */
    --ruler1-h: 8px;
    --ruler1-space: 5;
    /* Tall ticks */
    --ruler2-h: 20px;
    --ruler2-space: 50;

    background-attachment: fixed;
    background-image:
        linear-gradient(90deg, #bbbbbb 0 1px, transparent 0),
        linear-gradient(90deg, #bbbbbb 0 1px, transparent 0);
    background-position: 0 0;
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size:
        calc(1px * var(--ruler1-space) * 1) var(--ruler1-h),
        calc(1px * var(--ruler2-space) * 1) var(--ruler2-h);
}

.measure.top {
    color: #bbbbbb;
    counter-reset: d 0;
    display: flex;
    font-size: 0.8rem;
    height: var(--ruler2-h);
    inset-block-start: 0;
    inset-inline-start: calc(1% * var(--ruler2-space));
    line-height: 1;
    list-style: none;
    margin: 0;
    opacity: 1;
    overflow: hidden;
    padding: 0;
    width: 100%;
}

.measure.top, .measure.bottom {
    height: 16px;
}

.measure.top .tick {
    align-self: flex-end;
    counter-increment: d var(--ruler2-space);
    flex: 0 0 calc(1% * var(--ruler2-space));
}

.measure.top .tick::after {
    content: counter(d);
    line-height: 1;
    padding-inline-start: 4px;
}

.grid-editor .inner {
    flex-grow: 1;
    display: flex;
    height: 100%;
    flex-direction: column;
}

.grid-editor .grid .item {
    outline: 1px dashed #a0a0a0;
    width: 100%;
    height: 100%;
}
</style>
