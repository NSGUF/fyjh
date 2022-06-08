<template>
    <thead class="table-header-thead">
        <tr class="table-header-thead_tr">
            <th class="thead-tr_checkbox" v-if="selection || multiple">
                <input type="checkbox" 
                       name="checkAll" 
                       v-if="selection && !multiple" 
                       v-model="checkboxAll" 
                       @change="changeAll" />
            </th>
            <th class="thead-tr_th" 
                v-for="(item, thIndex) in theadData" 
                :key="item.field + thIndex" 
                :style="setStyle(item)">
                <template v-if="$slots['thead-' + item.field]">
                    <slot :name="'thead-' + item.field" 
                          :trData="item" 
                          :value="item.name" 
                          :thIndex="thIndex">
                    </slot>
                </template>
                <template v-else>
                    {{ item.name }}
                    <span class="thead-sort" 
                          v-if="item.sort" 
                          @click="sortClick($event, item.field)">
                        <i data-name="top" 
                           :class="{ 'sort-active': theadSort[item.field] === 'top' }">
                           ↑
                        </i>
                        <i data-name="btn" 
                           :class="{ 'sort-active': theadSort[item.field] === 'btn' }">
                           ↓
                        </i>
                    </span>
                    <span class="thead-filter" 
                          v-if="isShowFilter(item.field)" 
                          @click.stop="filterClick($event, item.field)">
                        <i>♜</i>
                    </span>
                </template>
            </th>
        </tr>
        <div class="filter-box" 
             v-show="filterShow" 
             :style="{'top': filterTop, 'left': filterLeft}"
             @click.stop>
            <input v-model="searchVal" />
            <p class="filter-botton">
                <button @click="searchClick">search</button>
                <button @click="searchVal=''">reset</button>
            </p>
        </div>
    </thead>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, toRefs, watch } from 'vue'
import { TheadDataType, 
         StateTheadIndexType,
         StyleValueType,
         StyleObjType } from './table'
export default defineComponent({
    name: 'theadIndex',
    props: {
        // 表头配置数据
        theadData: {
            type: Array as PropType<TheadDataType[]>,
            default: () => []
        },
        // 多选
        selection: {
            type: Boolean,
            default: false
        },
        // 单选
        multiple: {
            type: Boolean,
            default: false
        },
        isCheckAll: {
            type: Boolean,
            default: false
        },
        search: {
           type: Array as PropType<string[]>,
           default: () => [] 
        }
    },
    emits: ['changeboxAll', 'searchChange', 'handlerSort'],
    setup(props, {emit}){

        const state: StateTheadIndexType = reactive({
            checkboxAll: false,
            theadSort: {},
            searchVal: '',
            filterTop: '',
            filterLeft: '',
            filterShow: false,
            searchField: ''
        })

        onMounted(()=>{
            props.theadData?.forEach((item: TheadDataType) => {
                item.sort && (state.theadSort[item.field] = 'top')
            })
            document.addEventListener('click',()=>{
                state.filterShow = false;
            })
        })

        watch(()=>props.isCheckAll,()=>{
            state.checkboxAll = props.isCheckAll;
        })

        const isShowFilter = (field: string) => {
            return props.search.includes(field);
        }

        const changeAll = () => {
            emit('changeboxAll', state.checkboxAll);
        }
        
        // 设置样式
        const setStyle = (obj: StyleObjType) => {
            let styles:StyleValueType  = {}
            obj.width && (styles.width = obj.width)
            obj.align && (styles['text-align'] = obj.align)
            return styles
        }
        
        // 点击排序
        const sortClick = (e: any, field: string) => {
            let sort = e.target.getAttribute('data-name')
            state.theadSort[field] = sort
            !field || !sort && console.log('当前排序的状态', field, sort);
            emit('handlerSort', { field, sort })
        }
        
        // 打开筛序弹框
        const filterClick = (e: any, field: string)=>{
            state.filterTop = e.y + 12 + 'px';
            state.filterLeft = e.x - 220 + 'px';
            state.filterShow = true;
            state.searchField = field;
        }
        
        // 点击筛选
        const searchClick = ()=>{
            emit('searchChange', {field: state.searchField, value: state.searchVal})
        }

        return {
            ...toRefs(state),
            changeAll,
            setStyle,
            isShowFilter,
            filterClick,
            searchClick,
            sortClick
        }
    }
})
</script>
<style scoped>
.thead-tr_th{
    position: relative;
}
.thead-filter{
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(-6px, 13%);
    cursor: pointer;
}
.thead-filter>i{
    font-style: normal;
    display: inline-block;
    font-size: 13px;
    transform: rotate(180deg);
}
.filter-box{
    width: 200px;
    position: fixed;
    left: -100px;
    top: -100px;
    text-align: left;
    background-color: #fff;
    padding: 15px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
    border-radius: 3px;
}
.filter-box>input{
    width: 190px;
}
.filter-botton{
    margin-top: 10px;
    margin-bottom: 0px;
    display: flex;
    justify-content: flex-start;
}
.filter-botton>button{
    cursor: pointer;
}
.filter-botton>button:nth-of-type(1){
    margin-right: 15px;
}
</style>
