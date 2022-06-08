<template>
    <div class="y-table">
        <search @search="search"
                v-if="isfilter"/>

        <table-body :data="tableData">
            <table-column :type="'index'">
            </table-column>
            <table-column  v-for="(item, index) in columns"
                           :key="index"
                           :label="item.label"
                           :prop="item.prop"
                           :width="item.width"
                           :is-drag="item.isDrag">
                <template v-slot:header
                          v-if="item.isSort">
                    <header-sort @sortFn="sortClick">
                    </header-sort>
                </template>
            </table-column>
        </table-body>

        <pagination v-if="isPagination"
                    v-bind="$props"
                    :total="total"
                    v-model:page="page"
                    @nextPage="nextPage"
                    @previousPage="previousPage"
                    @setPage="setPage">
        </pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, watch, computed } from "vue";
import headerSort from './sort/header-sort.vue';
import Pagination from './pagination/index.vue';
import Search from './search/search.vue';
import TableColumn from '../components/table/table-column.vue';
import TableBody from '../components/table/index.vue';
import { SortConfig } from '../interface/index'
import { sortFn } from '../components/sort/index';
import { searchFn } from '../components/search/index';

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
        Pagination,
        TableColumn,
        TableBody
    },
    setup(props) {
        const page = ref(1) as Ref<number>;
        const tableData = ref([]) as Ref<Array<any>>;
        const keywords = ref('') as Ref<string>;

        //数据总条数
        let total = computed(() => {
            return props.pagination.total || props.data.length;
        });

        //分页之后的数据
        let gridData = computed(() => {
            return props.isPagination ? 
                    props.data.slice((page.value - 1) * 
                    props.pageSize, page.value * props.pageSize) : props.data;
        });

        //监听分页数据
        watch(() => gridData.value, (value: Array<any>) => {
            tableData.value = value;
        },
        {
            immediate: true
        });

        //上一页
        let previousPage = function (v:number) {
            page.value = v;
        }

        //下一页
        let nextPage = function (v:number) {
            page.value = v;
        }

        // 设置页码
        let setPage = function (v:number) {
            page.value = v;
        }

        //排序
        let sortClick = function (value: SortConfig) {
            console.info('按'+value.sortType+'顺序排序');
            return sortFn(tableData, value);
        }

        //搜索
        let search = function ({value}:any) {            
            tableData.value = searchFn(gridData.value, value);
            console.info('搜索成功!');
        }

        return {
            tableData,
            page,
            total,
            keywords,
            previousPage,
            nextPage,
            sortClick,
            search,
            setPage
        }
    }
});
</script>
