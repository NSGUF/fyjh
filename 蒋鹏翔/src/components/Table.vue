<template>
    <table class="table" :style="{ height: options?.height + 'px' }">
        <!-- 表格头 -->
        <thead>
            <tr>
                <input v-if="options.showCheck" type="checkbox" />
                <slot></slot>
            </tr>
        </thead>

        <!-- 内容 -->
        <tbody>
            <tr
                v-for="(item, index) in newData.data"
                :key="'tableColumn' + index"
            >
                <td v-if="options?.showCheck">
                    <input type="checkbox" />
                </td>
                <td
                    v-for="(cellItem, cellIndex) in cellData"
                    :key="'tableCell' + cellIndex"
                >
                    {{ cellItem === "type" ? index : item[cellItem] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { ref, reactive, onMounted, watch } from "vue";
import { SortTypeEnum } from "@/type/index";
import emitter from '@/eventBus'

export default {
    name: "JTableContent",

    props: {
        options: {
            type: Object,
            default: ()=>{}
        },

        // 是否显示勾选列
        showCheck: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots, emit }) {
        const cellData = reactive([]);

        //用于存放分页拆分后的数据
        const newData = reactive({
            data: [],
        });

        // 0无序，1降序 2升序
        const sort= ref(SortTypeEnum.disorder);

        // 勾选的数据列表
        const selectData = reactive([]);

        watch(props.options, () => {
            tableDataFn();
        });

        onMounted(() => {
            
            // 获取slot中的dataIndex
            slots.default().forEach((item) => {
                if (item.props) {
                    cellData.push(item.props?.dataIndex);
                }
            });

            // 勾选触发事件
            emit("selectChange", selectData);

            tableDataFn();

            emitter.on('setSort', sortSet)
        });

        // 进行排序
        const sortSet = (value)=> {
            value = value.value
            if (value > SortTypeEnum.ascending) {
                tableDataFn();
                value = SortTypeEnum.disorder;
                return;
            }
            newData.data.sort((a, b) => {
                if (value === SortTypeEnum.descending) {
                    return a.jAge - b.jAge;
                }
                if (value === SortTypeEnum.ascending) {
                    return b.jAge - a.jAge;
                }
            });
        };
        

        // 进行分页
        const tableDataFn = () => {
            let { data, pageSize, pageNum } = props.options;
            let start = (pageNum - 1) * pageSize;
            let end = pageNum * pageSize;
            newData.data = data.slice(start, end);
        };

        // 获取所有选中的数据 组件方法
        const getSelectData = () => {};

        // 刷新表格数据
        const loadData = () => {};

        // 勾选所有行
        const setCheckAll = () => {};

        // 禁用所有行
        const disabledAllData = () => {};

        return {
            cellData,
            newData,
            sort,
            selectData,
            getSelectData,
            loadData,
            setCheckAll,
            disabledAllData,
            sortSet
        };
    },
};
</script>

<style lang="less" scoped>
.table {
    margin: 0 auto;
    font-size: 20px;
}
</style>
