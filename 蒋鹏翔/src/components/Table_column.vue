<template>
    <td :style="{ width: width + 'px' }">
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
            tyep: Number,
            default: 80,
        },
    },
};
</script>