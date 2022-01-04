<script setup>
import { inject, onMounted, ref, reactive } from 'vue';

const whatSettingsPane = inject('whatSettingsPane');
const emitter = inject('emitter');

whatSettingsPane.value = 'GridEditorSidebar';

const mode = ref('insert');

const gridProps = reactive({
    columns: [1],
    rows: [1]
});
const gridPropsStr = ref('');
const gridItemDoms = ref([]);
const currentMoveItem = reactive({});

function updateGrid() {
    gridPropsStr.value = 'grid-template-columns: ' +
        gridProps.columns.map(c => (c * 100) + '%').join(' ') +
        '; grid-template-rows: ' +
        gridProps.rows.map(r => (r * 100) + '%').join(' ');
}

function addLine(pos, e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top;
    const isHorizontal = pos == 'h';

    let itemSize = 0;
    let oldArrayLength = 0;
    let relevantArray = [];
    let insertBefore = 0;

    if (isHorizontal) {
        itemSize = x / rect.width;
        relevantArray = gridProps.columns;
    } else {
        itemSize = y / rect.height;
        relevantArray = gridProps.rows;
    }

    oldArrayLength = relevantArray.length;
    insertBefore = oldArrayLength;

    let accumulatedPos = 0;
    let beforeElementSize = 0;

    for (let i = 0; i < oldArrayLength; i++) {
        accumulatedPos += relevantArray[i];
        // When whe click on occupied area, then we want to insert our element before
        if (itemSize < accumulatedPos) {
            insertBefore = i;
            break;
        }
        beforeElementSize += relevantArray[i];
    }

    // How much size remain
    let remainingSpace = 1 - itemSize;
    let beforeElement = insertBefore;
    if (insertBefore - 1 >= 0) {
        itemSize = itemSize - beforeElementSize;
        remainingSpace = relevantArray[insertBefore] - itemSize;
    } else {
        beforeElement = oldArrayLength - 1;
    }

    // Put new row / col
    if (isHorizontal) {
        gridProps.columns[beforeElement] = remainingSpace;
        gridProps.columns.splice(insertBefore, 0, itemSize);
    } else {
        gridProps.rows[beforeElement] = remainingSpace;
        gridProps.rows.splice(insertBefore, 0, itemSize);
    }

    updateGrid();

    gridItemDoms.value.splice(0);

    // Update handles
    let firstRow = true;
    for (let ri = 0; ri < gridProps.rows.length; ri++) {
        let firstColumn = true;
        for (let cj = 0; cj < gridProps.columns.length; cj++) {
            gridItemDoms.value.push({
                handle: firstRow != firstColumn,
                handlePos: firstColumn ? 'left' : firstRow ? 'top' : '',
                index: firstColumn ? ri : cj
            });

            firstColumn = false;
        }
        firstRow = false;
    }
}

function moveLine(line, e) {
    currentMoveItem.horizontal = line.handlePos == 'top';
    currentMoveItem.index = line.index;

    let relevantArray = [];
    if (currentMoveItem.horizontal) {
        relevantArray = gridProps.columns;
    } else {
        relevantArray = gridProps.rows;
    }

    // Add space for those two columns the line cross
    currentMoveItem.relativePos = 0;

    for (let i = 0; i < line.index - 1; i++) {
        currentMoveItem.relativePos += relevantArray[i];
    }

    currentMoveItem.area = relevantArray[line.index - 1] + relevantArray[line.index];
    currentMoveItem.isMoving = true;

    e.preventDefault();
    e.stopPropagation();
}

function handleMove(e) {
    if (currentMoveItem.isMoving) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;
        const arrayIndex = currentMoveItem.index;

        let relevantArray = [];
        let relativePos = 0;

        if (currentMoveItem.horizontal) {
            relevantArray = gridProps.columns;
            relativePos = x / rect.width;
        } else {
            relevantArray = gridProps.rows;
            relativePos = y / rect.height;
        }

        // Now, the percent of the handle is needed to be known...
        let calcArea = 1 - currentMoveItem.area;

        relevantArray[arrayIndex - 1] = relativePos - currentMoveItem.relativePos;
        relevantArray[arrayIndex] = currentMoveItem.area - relevantArray[arrayIndex - 1];

        if (currentMoveItem.horizontal) {
            gridProps.columns[arrayIndex - 1] = relevantArray[arrayIndex - 1];
            gridProps.columns[arrayIndex] = relevantArray[arrayIndex];
        } else {
            gridProps.rows[arrayIndex - 1] = relevantArray[arrayIndex - 1];
            gridProps.rows[arrayIndex] = relevantArray[arrayIndex];
        }

        updateGrid();
    }
}

function stopMove(ev) {
    currentMoveItem.isMoving = false;

    // Click outside
    if (!ev.target.classList.contains("measure") && !ev.target.classList.contains("handle")) {
        
    }
}

emitter.on('reset', () => {
    gridProps.columns = [1];
    gridProps.rows = [1];
    gridPropsStr.value = '';
    gridItemDoms.value = [];
});
</script>

<template>
    <div class="grid-editor" ref="gridEditorDOM" @mouseup="stopMove($event)">
        <div class="measure-space">
            <div class="measure left" @click="addLine('v', $event)"
                @mousemove="handleMove($event)"
            ></div>
        </div>
        <div class="inner">
            <div class="measure top"  @click="addLine('h', $event)"
                @mousemove="handleMove($event)"
            ></div>
            <div class="grid" :style="gridPropsStr">
                <div class="item" v-for="grindItem in gridItemDoms">
                    <div class="handle" v-if="grindItem.handle"
                        :class="grindItem.handlePos"
                        @mousedown="moveLine(grindItem, $event)"
                    ></div>
                </div>
            </div>
            <div class="measure bottom" @click="addLine('h', $event)"
            ></div>
        </div>
        <div class="measure-space">
            <div class="measure right"  @click="addLine('v', $event)"
            ></div>
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

.grid-editor .inner {
    flex-grow: 1;
    display: flex;
    height: 100%;
    flex-direction: column;
}

.measure {
    background-color: #eeeeee;
}

.measure.top, .measure.bottom {
    height: 1rem;
}

.measure.left, .measure.right {
    width: 1rem;
    height: 100%;
}

.grid-editor .grid .item {
    outline: 1px dashed #a0a0a0;
    width: 100%;
    height: 100%;
    position: relative;
}

.handle.left {
    width: 0; 
    height: 0; 
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #00aa00;
    position: absolute;
    top: -10px;
    left: -10px;
}

.handle.top {
    width: 0; 
    height: 0; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #0000ff;
    position: absolute;
    top: -10px;
    left: -10px;
}
</style>
