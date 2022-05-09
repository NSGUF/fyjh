<template>
    <div class="sort-caret__icon"
         @click.stop="sortClick">
        <div class="sort-ascending__icon"
             :style="`border-bottom: 5px solid ${sortAsc ? '#145beb' : '#c0c4cc'};`">
        </div>
        <div class="sort-descending__icon"
             :style="`border-top: 5px solid ${sortDesc ? '#145beb' : '#c0c4cc'};`">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, reactive, watch, computed } from "vue";
import { SortConfig } from '../interface/index'
import { getSortType } from './index';

export default defineComponent({
    name: "HeaderSort",
    props: {
        headerValue: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { emit }) {
        const sort = ref('') as Ref<String>;

        const sortAsc = computed(() => {
            return sort.value === 'asc';
        });

        const sortDesc = computed(() => {
            return sort.value === 'desc';
        });

        // 排序
        const sortType:String = getSortType();
        function sortClick () {
            sort.value = sortType();
            let value: SortConfig = {
                sortType: sort.value,
                porp: props.headerValue.porp
            };
            emit('sortFn', value);
        };

        return {
            sort,
            sortAsc,
            sortDesc,
            sortClick
        };
    }
});
</script>

<style scoped>
.sort-caret__icon {
    margin-left: 5px;
}
.sort-ascending__icon {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #c0c4cc;
    margin-bottom: 5px;
}

.sort-descending__icon {
    width: 0;
    height: 0;
    border-top: 5px solid #c0c4cc;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
}
</style>