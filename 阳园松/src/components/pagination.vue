<template>
    <ul class="pagination">
        <li>
            共{{ total }}条
        </li>
        <li>
            {{ pageSize }}条/页
        </li>
        <li @click="previousPage">
            上一页
        </li>
        <li>
            {{ page }}
        </li>
        <li @click="nextPage">
            下一页
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, reactive, watch, computed } from "vue";

export default defineComponent({
    name: "pagination",
    props: {
        page: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        }
    },
    setup(props:any, { emit }:any) {
        console.log();
        let previousPage = function () {
            emit('previousPage');
        }

        let nextPage = function () {
            emit('nextPage');
        }

        return {
            previousPage,
            nextPage
        }
    }
});
</script>

<style scoped>
.pagination {
    display: flex;
    padding: 0;
    margin: 10px 0 0 0;
}

.pagination li {
    list-style-type:none;
    margin-right: 20px;
    cursor: pointer;
}
</style>