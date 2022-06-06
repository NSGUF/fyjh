<template>
    <td :style="{ width: width + 'px' }">
        <!-- 序号 -->
        <span v-if="dataIndex === 'type'">序号</span>
        <!-- 
            表格头 
            传了title就用，没有就用插槽 
        -->
        <span v-if="title">{{ title }}</span>
        <slot v-else></slot>
        <!-- 排序 -->
        <span @click="sortSet" v-if="sort" class="table-sort">
            <!-- 升序 -->
            <span :class="{ active: ascending }">↑</span>
            <!-- 降序 -->
            <span :class="{ active: descending }">↓</span>
        </span>
    </td>
</template>

<script lang="ts">
import { SortTypeEnum } from "@/type";
import { computed, ref } from "vue";
import emitter from '@/eventBus'

export default {
    name: "JTableColumn",

    props: {
        title: {
            type: String,
        },
        dataIndex: {
            type: String,
        },
        width: {
            type: Number,
            default: 80,
        },
        // 是否要排序
        sort: {
            type: Boolean,
            default: false,
        },

        // 是否显示勾选框
        showCheck: {
            type: Boolean,
            default: false,
        },
    },

    setup() {
        // 排序类型
        const sortType = ref(SortTypeEnum.disorder);

        const sortSet = () => {
            sortType.value =
                sortType.value === SortTypeEnum.disorder
                    ? SortTypeEnum.ascending
                    : sortType.value === SortTypeEnum.ascending
                    ? SortTypeEnum.descending
                    : SortTypeEnum.disorder;
            emitter.emit('setSort', sortType)
        };

        const ascending = computed(() => {
            return sortType.value === SortTypeEnum.ascending;
        });

        const descending = computed(() => {
            return sortType.value === SortTypeEnum.descending;
        });

        

        return {
            sortSet,
            sortType,
            ascending,
            descending,
        };
    },
};
</script>
<style>
.active {
    color: red;
    font-size: 20px;
    font-weight: 700;
}

.table-sort {
    cursor: pointer;
    -moz-user-select: none;
    user-select: none;
}
</style>