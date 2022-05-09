<template>
    <y-table :data="tableData" :columns="columns">
    </y-table>
</template>

<script setup lang="ts">
import YTable from './components/y-table.vue';
import { Columns } from '../interface/index';

interface tableList {
    id: Number,
    date: String,
    name: String,
    address: String
}

const columns:Columns[] = [
    {
        prop: 'id',     //列key值
        label: 'ID',    //列名称
        width: '180',   //表格宽度
        isSort: true,   //是否开启排序
        isDrag: true,   //是否开启列拖动
        sortFn: (gridData: Array<tableList>, sortType:String):Array<tableList> => { //自定义排序
            return gridData.sort((a, b) => a.id > b.id ? -1 : 1);
        }
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

let tableData:tableList[] = [];

let i = 100;
while(i--) {
    tableData.push({
        id: i,
        date: `2016-05-${i}`,
        name: `王小虎${i}`,
        address: `上海市普陀区金沙江路 ${i} 弄`
    })
};

</script>
