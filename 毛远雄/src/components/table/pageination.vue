<template>
    <div class="pagination-box">
        <i class="pagination-box-left page-hover" @click="prevPage">上一页</i
        ><span class="pagination-box-size page-hover" v-for="item in getPage" :key="item" :class="{ 'page-size_active': pageIndexs === item }" @click="setPage(item)">{{ item }}</span
        ><i class="pagination-box-right page-hover" @click="nextPage">下一页</i>
    </div>
</template>
<script>
import { defineComponent, computed, reactive, toRefs } from 'vue'
export default defineComponent({
    name: 'pageInation',
    components: {},
    props: {
        // 总数据条数
        total: {
            type: Number,
            default: 0
        },
        // 每页显示条数
        pageSize: {
            type: Number,
            default: 10
        }
    },
    emits: ['handlerPage'],
    setup(props, {emit}) {

        const state = reactive({
            pageIndexs: 1,
            pageSizes: props.pageSize
        })

        const getPage = computed(() => {
            return Math.ceil(props.total / props.pageSize)
        })

        const prevPage = () => {
            state.pageIndexs > 1 && state.pageIndexs--
            emit('handlerPage', { pageSize: state.pageSizes, pageIndex: state.pageIndexs })
        }

        const nextPage = () => {
            state.pageIndexs < getPage.value && state.pageIndexs++
            emit('handlerPage', { pageSize: state.pageSizes, pageIndex: state.pageIndexs })
        }

        const setPage = index => {
            state.pageIndexs = index
            emit('handlerPage', { pageSize: state.pageSizes, pageIndex: state.pageIndexs })
        }
        return {
            ...toRefs(state),
            getPage,
            setPage,
            nextPage,
            prevPage
        }
    }
})
</script>
<style scoped>
.pagination-box {
    padding: 10px 0px;
    display: flex;
    align-items: center;
    height: 40px;
}
.pagination-box-size {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: solid 1px #eee;
    margin-left: 10px;
}

.pagination-box-right,
.pagination-box-size,
.pagination-box-left {
    cursor: pointer;
}
.page-hover:hover {
    color: rgb(53, 139, 219);
    border-color: rgb(53, 139, 219);
}
.page-size_active {
    color: rgb(53, 139, 219);
    border-color: rgb(53, 139, 219);
}
.pagination-box-right {
    margin-left: 10px;
    cursor: pointer;
}
</style>
