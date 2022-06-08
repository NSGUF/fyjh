<template>
    <table border='1' cellspacing='0' cellpadding='0'>
        <thead>
            <tr>
                <slot></slot>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in data"
                :key="index">
                <table-column v-for="(column, i) in tableColumn"
                              :width="column.width"
                              :key="i"
                              :index="index"
                              :item="item"
                              :prop="column.prop"
                              :is-td="true">
                    <template v-slot:cell>
                        <span v-if="column.type === 'index'">
                            {{ index }}
                        </span>
                        <span v-else>
                            {{ item[column.prop] }}
                        </span>
                    </template>
                </table-column>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, reactive, watch, computed, Slots, renderSlot, useSlots, onMounted } from "vue";
import TableColumn from './table-column.vue';
import { dragInit } from '../../common/drag-column';
import { Columns } from '../interface/index';

export default ({
    name: "Table",
    props: {
        columns: {
            type: Array as PropType<Columns[]>,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        }
    },
    components: {
        TableColumn
    },

    setup(props, content) {
        const tableColumn = reactive([]);
        const slotDefault = !!useSlots().default;
        if (slotDefault) {
             //获得插槽虚拟节点<数组>
            const slots:Slots = content.slots;
            let defaultData:Array<any> = slots.default();
            defaultData.map(item => {
                if (item.props) {
                    tableColumn.push(item.props);
                } else if (item.children) {
                    item.children.forEach(v => {
                        tableColumn.push(v.props);
                    });
                }
            });
        };

        onMounted(() => {
            dragInit();
        });

        return {
            tableColumn
        }
    }
});
</script>
