<template>
    <tbody>
        <tr v-for="(item, index) in tableData"
            :key="index"
            :style="`height: ${rowHeight}px;`">
            <td v-for="column in columns"
                :key="column.prop">
                {{ item[column.prop] }}
            </td>
        </tr>
    </tbody>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, reactive, watch, computed } from "vue";

export default defineComponent({
    name: "TableBody",
    props: {
        tableData: {
            type: Array as PropType<any[]>,
            default: () => []
        },
        columns: {
            type: Array as PropType<any[]>,
            default: () => []
        },
        rowHeight: {
            type: Number,
            default: 50
        }
    },
    setup(props, { emit }) {
        const sort = ref('') as Ref<String>;


        return {
            sort
        };
    }
});
</script>

<style scoped>

</style>