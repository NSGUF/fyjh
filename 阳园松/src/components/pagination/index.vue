<template>
    <ul class="pagination">
        <li>
            共{{ total }}条
        </li>
        <li>
            {{ pageSize }}条/页
        </li>
        <li class="previous-page" 
            @click="previousPage">
            上一页
        </li>
        <li class="page">
            {{ page }}
        </li>
        <li class="next-page"
            @click="nextPage">
            下一页
        </li>
        <li>
            跳至
            <input v-model.number="currentPage" 
                   @blur="setPageBlur" 
                   @focus="setPageFocus"/>
            页
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
    setup(props:any, { emit }) {

        const currentPage = ref(1) as Ref<number>;
        const newValue = ref(1) as Ref<number>;

        //分页框失去焦点
        let setPageBlur = function () {
            if (props.total - currentPage.value * props.pageSize >= 0 && currentPage.value > 0) {
                emit('setPage', currentPage.value);
                console.info('失去焦点，更新当前页页码:',currentPage.value);
            } else {
                currentPage.value = newValue.value;
                console.warn('数据有误，不能超过最大页码，以及小于1');
            }
        }

        //分页框获取焦点
        let setPageFocus = function () {
            newValue.value = currentPage.value;
            console.info('获取当前输入框焦点，方便做数据恢复！，当前输入框为:',newValue.value);
        }

        /**
         * 上一页
         */
        let previousPage = function () {
            if (props.page > 1) {
                let page = (props.page - 1);
                emit('previousPage', page);
                console.info('翻页成功！')
            } else {
                console.warn('已经是第一页了！')
            }
        }

        /**
         * 下一页
         */
        let nextPage = function () {
            if (props.total - props.page * props.pageSize > 0) {
                console.info('翻页成功！')
                let page = (props.page + 1);
                emit('nextPage', page);
            } else {
                console.warn('已经到底了！')
            }
        }

        return {
            previousPage,
            nextPage,
            setPageBlur,
            setPageFocus,
            currentPage,
            newValue
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

input {
    height: 20px;
    width: 50px;
}
</style>