<template>
    <table class="table">
        <!-- 表格头 -->
        <thead>
            <tr>
                <slot></slot>
            </tr>
        </thead>

        <!-- 内容 -->
        <tbody>
            <tr
                v-for="(item, index) in newData.data"
                :key="'tableColumn' + index"
            >
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
import { ref, reactive, onMounted, watch, computed } from "vue";

export default {
    name: "JTableContent",

    props: {
        options: {
            type: Object,
        },

        // 当前页
        pageNum: {
            type: Number,
            default: 2,
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
        const sort = ref(0);

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
        });

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

        const sortText = computed(() => {
            return sort.value === 1
                ? "年龄降序"
                : sort.value === 2
                ? "年龄无序"
                : "年龄升序";
        });

        return {
            cellData,
            newData,
            sort,
            selectData,
            getSelectData,
            loadData,
            setCheckAll,
            disabledAllData,
            sortText,
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
