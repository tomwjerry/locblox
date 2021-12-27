<script setup>
import { onMounted, ref, reactive } from 'vue';

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

    const height = gridEditorDOM.clientHeight;
    const width = gridEditorDOM.clientWidth;

    for (let h = 0; h < width; h += 10) {
        hticks.push(h);
    }

    for (let v = 0; v < height; v += 10) {
        vticks.push(v);
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
            console.log(percSize);
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
                <div v-for="tick in vticks"></div>
            </div>
        </div>
        <div class="inner">
            <div class="measure top"  @click="rulerClick('h', $event)">
                <div v-for="tick in hticks"></div>
            </div>
            <div class="grid" :style="gridPropsStr">
                <div class="item" v-for="index in gridItemDoms"></div>
            </div>
            <div  class="measure bottom" @click="rulerClick('h', $event)">
                <div v-for="tick in hticks"></div>
            </div>
        </div>
        <div class="measure-space">
            <div class="measure right"  @click="rulerClick('v', $event)">
                <div v-for="tick in vticks"></div>
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

.grid-editor .measure.left {
    border-right: 1px solid #a0a0a0;
}

.grid-editor .measure.right {
    border-left: 1px solid #a0a0a0;
}

.grid-editor .measure.top {
    background-repeat: repeat-x;
    background-image:
        linear-gradient(90deg, #bbbbbb 0 1px, transparent 0),
        linear-gradient(90deg, #bbbbbb 0 1px, transparent 0);
    background-size:
        0.5% 8px,
        5% 20px;
    border-bottom: 1px solid #a0a0a0;
}

.grid-editor .measure.bottom {
    border-top: 1px solid #a0a0a0;
}

.grid-editor .measure.left, .grid-editor .measure.right {
    width: 1rem;
    height: 100%;
}

.grid-editor .measure.top, .grid-editor .measure.bottom {
    height: 1rem;
    width: 100%;
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
