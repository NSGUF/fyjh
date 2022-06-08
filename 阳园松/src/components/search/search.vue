<template>
    <div class="search-flex">
        <input v-model="keywords"
               placeholder="请输入关键字" />
        <button @click.stop="search">搜索</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, reactive, watch, computed } from "vue";

export default defineComponent({
    name: "search",
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
.search-flex {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
input {
    height: 34px;
}
button {
    width: 50px;
    height: 40px;
}
</style>