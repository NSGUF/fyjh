<template>
    <div class="table">
        <table class="table-box" 
               border="0" 
               cellspacing="0" 
               cellpadding="0">
            <!-- 表头 -->
            <div class="thead-box"
                 ref="thead" 
                 :class="{'shift-right': isScroll}">
                <thead-index v-bind="$attrs" 
                             :isCheckAll="isCheckAll" 
                             @changeboxAll="changeAll"
                             @searchChange="searchChange"
                             @handlerSort="handlerSort">
                    <template v-for="(index, name) in $slots" 
                              v-slot:[name]="slotData">
                        <slot :name="name" 
                                :trData="slotData.trData" 
                                :value="slotData.value"
                                :thIndex="slotData.thIndex"/>
                    </template>
                </thead-index>
            </div>
            <!-- 表体 -->
            <div class="tbody-box" 
                 :style="{ height: tbodyHeight}">
                <tbody-index v-bind="$attrs"
                                ref="tbody" 
                                :checkValue="checkValue"
                                :tbodyList="tbodyList"
                                @setSelectValue="setSelectValue"
                                @trClick="trClick">
                    <template v-for="(index, name) in $slots" 
                              v-slot:[name]="slotData">
                        <slot :name="name" 
                                :trData="slotData.trData" 
                                :value="slotData.value" 
                                :trIndex="slotData.trIndex" 
                                :tdIndex="slotData.tdIndex"/>
                    </template>
                </tbody-index>
            </div>
        </table>
        <!-- 分页组件 -->
        <pageInation v-if="isPagination" 
                     v-bind="$attrs" 
                     @handlerPage="pageUp"/>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, toRefs, computed, nextTick, PropType} from 'vue'
import pageInation from './pageination.vue'
import theadIndex from './theadIndex.vue'
import tbodyIndex from './tbodyIndex.vue'
import { StateTableIndexType, 
         TbodyDataType, 
         SelectValueType, 
         SearchValueType, 
         SortValueType,
         PageValueType } from './table'
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
            type: Number,
            default: 0
        },
        // 支持分页
        isPagination: {
            type: Boolean,
            default: false
        },
        // 表体数据
        tbodyData: {
            type: Array as PropType<TbodyDataType[]>,
            default: () => []
        },
    },
    emits: ['handlerTrClick', 'changePage', 'sortChange'],
    setup(props, { emit, attrs }) {
        const tbody = ref<any>(null)
        const thead = ref<any>(null)
        const state : StateTableIndexType = reactive({
            tbodyList: [],
            checkValue: [],
            radioValue: '',
            topVal: '0px',
            isScroll: false,
            tableWidth: 'auto',
            isHeadScroll: false,
            theadHeight: 0,
            tbodyHeight: 0
        })

        watch(()=>props.tbodyData, () => {
            state.tbodyList = props.tbodyData;
        },{immediate: true})

        watch([()=>state.tbodyList, ()=>props.maxHeight], () => {
            nextTick(()=>{
                setHeight();
            })
        },{immediate: true})

        const setHeight = ()=>{
            let height = tbody?.value?.$el?.offsetHeight || 0;
            state.theadHeight = parseFloat(thead?.value?.offsetHeight || 0);
            state.isScroll = height > props.maxHeight;
            let bodyHeight = props.maxHeight? props.maxHeight - state.theadHeight : 'auto';
            state.tbodyHeight = bodyHeight !== 'auto' && height<bodyHeight? height+1+'px' : bodyHeight+'px'
            state.tbodyHeight !== 'auto' && parseFloat(state.tbodyHeight)<=0 && console.log('body的高度', state.tbodyHeight);
        }

        const isCheckAll = computed(()=>{
            !state.checkValue && console.log('是否全选', state.checkValue);
            return state.tbodyList.length === state.checkValue.length;
        })

        const getCheckboxValue = () => {
            if (attrs.multiple) {
                return state.radioValue
            } else if (attrs.selection) {
                return state.checkValue
            }
        }

        const trClick = (trData: any) => {
            !trData && console.log('当前行的数据', trData);
            emit('handlerTrClick', trData)
        }

        const handlerSort = (sortObj: SortValueType) => {
           emit('sortChange', sortObj);
        }

        const pageUp = (pageObj: PageValueType)=>{
            !pageObj && console.log('当前跳转的页码', pageObj);
            emit('changePage', pageObj)
        }

        const changeAll = (isAll:boolean)=>{
            state.checkValue = isAll ? state.tbodyList.map((item: any) => item.id) : []
        }

        const setSelectValue = (item: SelectValueType) =>{
            !item && console.log('当前选择的数据', item);
            item.type === 'multiple'? state.radioValue = item.radioValue : state.checkValue = item.checkValue;
        }

        const searchChange = (searchObj: SearchValueType) =>{
           if(searchObj.value){
                state.tbodyList = state.tbodyList.filter((item: any)=>{
                    return item[searchObj.field].includes(searchObj.value)
                })
           }else{
               state.tbodyList = props.tbodyData;
           }
        }

        return {
            ...toRefs(state),
            changeAll,
            tbody,
            thead,
            trClick,
            handlerSort,
            pageUp,
            setSelectValue,
            setHeight,
            isCheckAll,
            searchChange,
            getCheckboxValue
        }
    }
})
</script>
<style>
.table {
    display: inline-block;
}
.shift-right{
    padding-right: 16px;
}
.table-box {
    table-layout: fixed;
}
.thead-box{
   border: 1px solid #999; 
}
.tbody-box{
    overflow: auto;
    border: 1px solid #999; 
    border-top: none;
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
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 5px 10px;
    border-left: 1px solid #999;
    display: inline-block;
}
.tbody-tr_td,.tbody-tr_checkbox{
    border-top: 1px solid #999;
}
.table-body-tbody_tr:nth-of-type(1)>.tbody-tr_td,
.table-body-tbody_tr:nth-of-type(1)>.tbody-tr_checkbox{
    border-top: none;
}
.table-header-thead_tr>th:nth-of-type(1),
.table-body-tbody_tr>td:nth-of-type(1){
    border-left: none;
}
.table-header-thead_tr,
.table-body-tbody_tr{
    display: flex;
}
.thead-tr_checkbox,
.tbody-tr_checkbox {
    width: 80px;
}
.thead-sort i {
    padding: 0 5px;
    cursor: pointer;
    font-style: normal;
}
.thead-sort .sort-active {
    color: rgb(10, 108, 244);
}
</style>
