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
            <tr v-for="(item, index) in newData" :key="'tableColumn' + index">
                <td
                    v-for="(cellItem, cellIndex) in cellData"
                    :key="'tableCell' + cellIndex"
                >
                    {{ item[cellItem] }}
                </td>
            </tr>
        </tbody>
        <button @click="sortSet">{{ sortText }}</button>
    </table>
</template>

<script>
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
    },
    data: () => {
        return {
            cellData: [],

            //用于存放分页拆分后的数据
            newData: [],

            // 0无序，1降序 2升序
            sort: 0,
        };
    },

    watch: {
        options: {
            deep: true,
            handler() {
                this.tableDataFn();
            },
        },
    },

    mounted() {
        this.$slots.default.forEach((item) => {
            this.cellData.push(item.componentOptions.propsData.dataIndex);
        });
        this.tableDataFn();
    },

    methods: {
        // 进行分页
        tableDataFn() {
            let { data, pageSize, pageNum } = this.options;
            let start = (pageNum - 1) * pageSize;
            let end = pageNum * pageSize;
            this.newData = data.slice(start, end);
        },

        sortSet() {
            this.sort++;
            if (this.sort > 2) {
                this.tableDataFn();
                this.sort = 0;
                return;
            }
            this.newData.sort((a, b) => {
                if (this.sort === 1) {
                    return a.jAge - b.jAge;
                }
                if (this.sort === 2) {
                    return b.jAge - a.jAge;
                }
            });
        },
    },

    computed: {
        sortText() {
            return this.sort === 1
                ? "年龄降序"
                : this.sort === 2
                ? "年龄无序"
                : "年龄升序";
        },
    },
};
</script>

<style lang="less" scoped>
.table {
    margin: 0 auto;
    font-size: 20px;
}
</style>
