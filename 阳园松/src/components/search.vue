<template>
    <input v-model="keywords"
           placeholder="请输入关键字" />
    <button @click.stop="search">搜索</button>
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
    setup(props, { emit }) {
        const keywords = ref('') as Ref<string>;;
        
        const search = function () {
            emit('search', { value:keywords.value });
        }
        return {
            keywords,
            search
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