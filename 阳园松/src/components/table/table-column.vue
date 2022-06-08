<template>
    <template v-if="!isTd">
        <th :style="`width:${width}px;height:${height}px;`">
            <div class="table-th">
                <span v-if="type === 'index'">
                    序号
                </span>
                <span v-else>
                    {{ label }}
                </span>
                <slot name="header"></slot>
            </div>
            <div class="column-drag" 
                 v-if="isDrag" />
        </th>
    </template>
    <template v-else>
        <td :style="`height:${height}px;`">
            <slot name="cell"></slot>
        </td>
    </template>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, watch, computed } from "vue";

export default defineComponent({
    name: "TableColums",
    props: {
        label: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '100'
        },
        height: {
            type: String,
            default: '34'
        },

        // 列类型（index为序号）
        type: {
            type: String,
            default: ''
        },
        // 序号）
        index: {
            type: Number,
            default: 1
        },
        item: {
            type: Object,
            default: ()=> ({})
        },
        prop: {
            type: String,
            default: ''
        },
        isTd: {
            type: Boolean,
            default: false
        },
        isDrag: {
            type: Boolean,
            default: false
        }
    }
});
</script>
<style scoped>
.table-th {
    display: flex;
}
th {
    position: relative;
}
.column-drag {
    position: absolute;
    right: -2px;
    top: 0;
    height: 100%;
    width: 5px;
    cursor: pointer;
    border-right: 2px dashed #999;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    border-left: 1px solid transparent;
    z-index: 10;
}
</style>