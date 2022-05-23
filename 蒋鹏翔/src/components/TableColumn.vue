<template>
    <td :style="{ width: width + 'px' }">
        <span v-if="dataIndex === 'type'">序号</span>
        <!-- 传了title就用，没有就用插槽 -->
        <span v-if="title">{{ title }}</span>
        <slot v-else></slot>

    </td>
</template>

<script>
export default {
    name: "JTableColumn",

    props: {
        title: {
            type: String,
        },
        dataIndex: {
            type: String,
        },
        width: {
            type: Number,
            default: 80,
        },
        type: {
            type: String,
            default: ''
        },
        // 是否要排序
        sort: {
            type: Boolean,
            default: false
        }
    },
};
</script>