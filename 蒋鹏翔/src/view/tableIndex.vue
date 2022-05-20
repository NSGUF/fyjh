<template>
    <div>
        <!-- 表格 -->
        <J-Table :options="options" ref="jTable" @selectChange="selectChange">
    <J-TableColumn dataIndex="type" /> 
            <J-TableColumn
                title="名称"
                :width="200"
                dataIndex="jName"
                :sort="true"
            >
            </J-TableColumn>
            <J-TableColumn
                :isSort="true"
                title="年龄"
                dataIndex="jAge"
                :width="200"
            ></J-TableColumn>
            <J-TableColumn
                title="性别"
                dataIndex="jGender"
                :width="200"
            ></J-TableColumn>
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

<script>
import { getTableData } from "@/api/tableApi";
import { onMounted, reactive, ref } from "vue";
export default {
    name: "TableIndex",

    setup() {
        // 表格ref
        const jTable = ref(null);
        const options = reactive({
            data: [],
            pageNum: 1,
            pageSize: 5,
            total: 0,
        });

        let { data, total } = getTableData();
        console.log(data)
        options.data = data;
        options.total = total;

        onMounted(() => {
            // 获取所有勾选数据
            jTable.value.getSelectData();
        });

        const changePageNo = (page) => {
            options.pageNum = page;
        };

        // 勾选触发事件
        const selectChange = () => {};

        return {
            jTable,
            options,
            selectChange,
            changePageNo
        };
    },
};
</script>

<style></style>
