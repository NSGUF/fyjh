<template>
    <div class="sort-caret__icon"
       @click="sortFn">
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

export default defineComponent({
    name: "HeaderSort",
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    setup(props:any, { emit }:any) {
        const sort = ref('') as Ref<String>;

        let sortAsc = computed(() => {
            return sort.value === 'asc';
        });

        let sortDesc = computed(() => {
            return sort.value === 'desc';
        });

        // //排序
        let sortFn = function () {
            let sortType = '';
            if (sort.value === 'asc') {
                sortType = 'desc';
            } else if (sort.value === 'desc'){
                sortType = '';
            } else {
                sortType = 'asc';
            };

            sort.value = sortType;
            let value: SortConfig = {
                sortType, 
                label: props.label
            };
            emit('sortFn', value);
        };

        return {
            sort,
            sortAsc,
            sortDesc,
            sortFn
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