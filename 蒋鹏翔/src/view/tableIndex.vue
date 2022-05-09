<template>
    <div>
        <!-- 表格 -->
        <J-Table :options="options">
            <J-TableColumn
                title="名称"
                width="200"
                dataIndex="jName"
            ></J-TableColumn>
            <J-TableColumn
                :isSort="true"
                title="年龄"
                dataIndex="jAge"
                width="200"
            ></J-TableColumn>
            <J-TableColumn
                title="性别"
                dataIndex="jGender"
                width="200"
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

    methods: {
        changePageNo(page) {
            this.options.pageNum = page;
        },
    },
};
</script>

<style></style>
