<template>
    <div>
        <!-- 表格 -->
<<<<<<< HEAD
        <J-Table :options="options">
            <J-TableColumn
                title="名称"
                width="200"
                dataIndex="jName"
            ></J-TableColumn>
=======
        <J-Table :options="options" ref="jTable" @selectChange="selectChange">
            <J-TableColumn
                title="名称"
                :width="200"
                dataIndex="jName"
                :sort="true"
            >
            </J-TableColumn>
>>>>>>> bcb9aed ([update] 表格功能完善)
            <J-TableColumn
                :isSort="true"
                title="年龄"
                dataIndex="jAge"
<<<<<<< HEAD
                width="200"
=======
                :width="200"
>>>>>>> bcb9aed ([update] 表格功能完善)
            ></J-TableColumn>
            <J-TableColumn
                title="性别"
                dataIndex="jGender"
<<<<<<< HEAD
                width="200"
=======
                :width="200"
>>>>>>> bcb9aed ([update] 表格功能完善)
            ></J-TableColumn>
        </J-Table>
        <!-- 分页 -->
        <J-Pagination
            :total="options.total"
            :pageSize="options.pageSize"
            :pageNum="options.pageNum"
            :continueNo="1"
            :changePageNo="changePageNo"
        ></J-Pagination>
    </div>
</template>

<script>
import { getTableData } from "@/api/tableApi";

export default {
    name: "TableIndex",

    data: () => {
        return {
            options: {
                data: [],
                pageNum: 1,
                pageSize: 5,
                total: 0,
            },
        };
    },

    created() {
        let { data, total } = getTableData();
        this.options.data = data;
        this.options.total = total;
    },

    mounted() {
        // 获取所有勾选数据
        this.$refs.jTable.getSelectData();
    },

    methods: {
        changePageNo(page) {
            this.options.pageNum = page;
        },

        // 勾选触发事件
        selectChange() {},
    },
};
</script>

<style></style>
