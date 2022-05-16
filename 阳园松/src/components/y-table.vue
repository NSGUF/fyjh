<template>
    <div class="y-table">
        <search @search="search"/>
        <table>
            <table-header :columns="columns">
                <template v-slot="slotitem">
                    <header-sort :label="slotitem.label"
                                 @sortFn="sortFn">
                    </header-sort>
                </template>
            </table-header>
            <table-body :columns="columns"
                        :tableData="tableData">
            </table-body>
        </table>
        <pagina-tion v-if="isPagination"
                    v-bind="$props"
                    :total="total"
                    v-model:page="page"
                    @nextPage="nextPage"
                    @previousPage="previousPage">
        </pagina-tion>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, reactive, watch, computed } from "vue";
import headerSort from './header-sort.vue';
import TableHeader from './table-header.vue';
import TableBody from './table-body.vue';
import Pagination from './pagination.vue';
import Search from './search.vue';
import { SortConfig } from '../interface/index'
export default defineComponent({
    name: "YTable",
    props: {
        columns: {
            type: Array as PropType<any[]>,
            default: () => []
        },
        data: {
            type: Array as PropType<any[]>,
            default: () => []
        },
        pageSize: {
            type: Number,
            default: 10
        },
        rowHeight: {
            type: Number,
            default: 50
        },
        isPagination: {
            type: Boolean,
            default: true
        },
        isfilter: {
            type: Boolean,
            default: true
        },
        pagination: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        Search,
        headerSort,
        TableHeader,
        TableBody,
        Pagination
    },
    setup(props:any) {
        const page = ref(1) as Ref<number>;
        const tableData = ref([]) as Ref<Array<any>>;
        const keywords = ref('') as Ref<string>;

        let total = computed(() => {
            return props.pagination.total || props.data.length;
        });

        let gridData = computed(() => {
            return props.isPagination ? 
                    props.data.slice((page.value - 1) * 
                    props.pageSize, page.value * props.pageSize) : props.data;
        });

        watch(() => gridData.value, (value: Array<any>) => {
            tableData.value = value;
        },
        {
            immediate: true
        });

        let previousPage = function () {
            page.value > 1 && page.value--;
        }

        let nextPage = function () {
            total.value - page.value * props.pageSize > 0 && page.value++;
        }

        //排序
        let sortFn = function (value: SortConfig) {
            tableData.value.sort((a:object, b:object):number => {
                let sortType = '';
                if (value.sortType === 'asc') {
                    sortType = 'desc';
                } else if (value.sortType === 'desc'){
                    sortType = '';
                } else {
                    sortType = 'asc';
                };
                if (sortType === 'desc') {
                    return a[value.label as keyof typeof a] < b[value.label as keyof typeof b] ? 1 : -1;
                } else {
                    return a[value.label as keyof typeof a] > b[value.label as keyof typeof b] ? 1 : -1;
                }
                
            })
        }

        // 搜索
        let search = function ({value}:any) {
            let data = gridData.value.filter((item: { [x: string]: { toString: () => string|any[]; }; }) => {
                let isValue:boolean = false;
                for(let key in item) {
                    if (item[key] && item[key].toString().includes(value)) {
                        isValue = true;
                        break;
                    }
                }
                return isValue;
            });
            tableData.value = data;
        }

        return {
            tableData,
            page,
            total,
            keywords,
            previousPage,
            nextPage,
            sortFn,
            search
        }
    }
});

function item(item: any) {
throw new Error("Function not implemented.");
}
</script>

<style>
.y-table table{
    border: 1px solid #000;
}

.y-table table tr th,
.y-table table tr td {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}


</style>

function item(item: any) {
  throw new Error("Function not implemented.");
}
