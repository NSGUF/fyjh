<template>
    <div>
        <!-- 表格 -->
        <J-Table :options="options" ref="jTable">
            <J-TableColumn dataIndex="type" />
            <J-TableColumn
                title="名称"
                :width="200"
                dataIndex="jName" />
            <J-TableColumn
                :isSort="true"
                title="年龄"
                dataIndex="jAge"
                :width="200"
                :sort="true" />
            <J-TableColumn title="性别" dataIndex="jGender" :width="200" />
        </J-Table>
        <!-- 分页 -->
        <J-Pagination
            :total="options.total"
            :pageSize="options.pageSize"
            :pageNum="options.pageNum"
            :continueNo="3"
            @changePageNo="changePageNo"
        ></J-Pagination>
    </div>
</template>

<script lang="ts">
import { getTableData } from "@/api/tableApi";
import { reactive, ref } from "vue";
import { TableOptions } from "@/type/index";
export default {
    name: "TableIndex",

    setup() {
        // 表格ref
        const jTable: any = ref(null);
        const options: TableOptions = reactive({
            data: [],
            pageNum: 1,
            pageSize: 5,
            total: 0
        });

        let { data, total } = getTableData();
        options.data = data;
        options.total = total;

        const changePageNo = (page: number) => {
            options.pageNum = page;
        };

        return {
            jTable,
            options,
            changePageNo,
        };
    },
};
</script>

<style></style>
