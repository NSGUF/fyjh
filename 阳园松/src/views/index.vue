<template>
    <div>
        <y-table :data="tableData" :columns="columns"/>
    </div>
</template>

<script setup lang="ts">
import YTable from '@/components/y-table.vue';

//表格数据接口类型
interface tableList {
    id: Number,
    date: String,
    name: String,
    address: String
}

//表格列接口类型
interface Columns {
    prop: String,
    label: String,
    width: String,
    isSort?: Boolean,
    sortFn?: Function
}

const columns:Columns[] = [
    {
        prop: 'id',
        label: 'ID',
        width: '180',
        isSort: true
    },
    {
        prop: 'name',
        label: '名称',
        width: '180',
        isSort: false
    },
    {
        prop: 'date',
        label: '日期',
        width: '180',
        isSort: false
    },
    {
        prop: 'address',
        label: '地址',
        width: '180',
        isSort: false
    }
];

const tableData:tableList[] = [
    {
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
    }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
    }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
    }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }, {
        id: 5,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }, {
        id: 6,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }, {
        id: 7,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }, {
        id: 8,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }, {
        id: 9,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }, {
        id: 10,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }, {
        id: 11,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }, {
        id: 12,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }
];
</script>
