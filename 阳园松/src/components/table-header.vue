<template>
    <thead>
        <tr>
            <th v-for="item in columns"
                :key="item.prop"
                :style="`width: ${ item.width }px;height: ${rowHeight}px;`">
                    <div class="header-col__cell">
                        {{ item.label }}
                        <slot :data="item"></slot>
                    </div>
            </th>
        </tr>
    </thead>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, reactive, watch, computed } from "vue";

export default defineComponent({
    name: "TableHeader",
    props: {
        columns: {
            type: Array as PropType<any[]>,
            default: () => []
        },
        rowHeight: {
            type: Number,
            default: 50
        }
    }
});
</script>

<style scoped>
.header-col__cell {
    display: flex;
    align-items: center;
}
</style>