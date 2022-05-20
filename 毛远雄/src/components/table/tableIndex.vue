<template>
    <div>
        <div class="table">
            <table class="table-box" border="0" cellspacing="0" cellpadding="0">
                <!-- 表头 -->
                <div class="thead-box" :class="{'shift-right': isScroll}">
                    <thead-index v-bind="$attrs" @changeboxAll="changeAll">
                        <template v-for="(index, name) in $slots" v-slot:[name]="slotData">
                            <slot :name="name" 
                                  :trData="slotData.trData" 
                                  :value="slotData.value"
                                  :thIndex="slotData.thIndex"/>
                        </template>
                    </thead-index>
                </div>
                <!-- 表体 -->
                <div class="tbody-box" :style="{ height: maxHeight}" @scroll="onScroll">
                    <tbody-index v-bind="$attrs"
                                 ref="tbody" 
                                 :checkValue="checkValue"
                                 :tbodyList="tbodyList"
                                 @setSelectValue="setSelectValue">
                        <template v-for="(index, name) in $slots" v-slot:[name]="slotData">
                            <slot :name="name" 
                                  :trData="slotData.trData" 
                                  :value="slotData.value" 
                                  :trIndex="slotData.trIndex" 
                                  :tdIndex="slotData.tdIndex"/>
                        </template>
                    </tbody-index>
                </div>
            </table>
        </div>
        <!-- 分页组件 -->
        <pageInation v-if="isPagination" v-bind="$attrs" @handlerPage="pageUp"/>
    </div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref, watch, nextTick, toRefs } from 'vue'
import pageInation from './pageination.vue'
import theadIndex from './theadIndex.vue'
import tbodyIndex from './tbodyIndex.vue'
export default defineComponent({
    name: 'tableIndex',
    components: {
        pageInation,
        theadIndex,
        tbodyIndex
        },
    props: {
        // 最大高度
        maxHeight: {
            type: String,
            default: 'auto'
        },
        // 支持分页
        isPagination: {
            type: Boolean,
            default: false
        },
        // 支持筛选
        search: {
            type: Object,
            default: ()=>{}
        },
        // 表体数据
        tbodyData: {
            type: Array,
            default: () => []
        },
    },
    emits: ['handlerTrClick', 'changePage', 'handlerSort', 'getCheckboxValue'],
    setup(props, { emit, expose }) {
        const tbody = ref(null)
        const state = reactive({
            tbodyList: [],
            checkValue: [],
            radioValue: '',
            topVal: '0px',
            isScroll: false,
            tableWidth: 'auto',
            isHeadScroll: false
        })

        onMounted(() => {
        })

        watch(()=>props.tbodyData, () => {
            state.tbodyList = props.tbodyData;
            nextTick(() => {
                setWidth()
            })
        },{immediate: true})

        const setWidth = () => {
            let height = tbody.value.$el.offsetHeight
            let width = tbody.value.$el.offsetWidth
            state.tableWidth = width + 'px'
            if (height > parseFloat(props.maxHeight)) {
                state.isScroll = true
                state.tableWidth = tbody.value.offsetWidth + 18 + 'px'
            }
        }


        const onScroll = e => {
            let top = e.target.scrollTop
            let height = tbody.value.$el.offsetHeight
            let scrollHeight = height - parseFloat(props.maxHeight)
            state.isScroll = top < scrollHeight
            state.isHeadScroll = top > 0
            state.topVal = top + 'px'
        }

        const getCheckboxValue = () => {
            if (props.multiple) {
                return state.radioValue
            } else if (props.selection) {
                return state.checkValue
            }
        }

        const trClick = trData => {
            emit('handlerTrClick', trData)
        }

        const sortClick = (e, field) => {
            let sort = e.target.getAttribute('data-name')
            state.theadSort[field] = sort
            emit('handlerSort', { field, sort })
        }

        const pageUp = (pageObj)=>{
            emit('changePage', pageObj)
        }

        const changeAll = (isAll)=>{
            state.checkValue = isAll ? state.tbodyList.map(item => item.id) : []
        }

        const setSelectValue = (item) =>{
            item.type === 'multiple'? state.radioValue = item.value : state.checkValue = item.value;
        }

        expose({
            getCheckboxValue
        })

        return {
            ...toRefs(state),
            changeAll,
            onScroll,
            tbody,
            trClick,
            sortClick,
            pageUp,
            setSelectValue
        }
    }
})
</script>
<style>
.table {
    position: relative;
    overflow: auto;
    width: 100%;
}
.shift-right{
    padding-right: 16px;
}
.table-box {
    border-right: 1px solid #999;
    border-bottom: 1px solid #999;
    table-layout: fixed;
}
.thead-box{
   border-top: 1px solid #999; 
   border-bottom: 1px solid #999;
}
.tbody-box{
    overflow: auto;
}
.table-header-thead {
    background-color: #eee;
    z-index: 10;
}
.table-body-tbody_tr:hover {
    background-color: rgb(240, 240, 240);
}
.thead-tr_th,
.tbody-tr_td,
.thead-tr_checkbox,
.tbody-tr_checkbox {
    width: 100px;
    height: 30px;
    line-height: 30px;
    padding: 5px 10px;
    border-left: 1px solid #999;
}
.tbody-tr_td,.tbody-tr_checkbox{
    border-top: 1px solid #999;
}
.table-body-tbody_tr:nth-of-type(1)>.tbody-tr_td,
.table-body-tbody_tr:nth-of-type(1)>.tbody-tr_checkbox{
    border-top: none;
}
.thead-tr_checkbox,
.tbody-tr_checkbox {
    width: 80px;
}
.thead-sort i {
    padding: 0 5px;
    cursor: pointer;
}
.thead-sort .sort-active {
    color: rgb(10, 108, 244);
}
</style>
