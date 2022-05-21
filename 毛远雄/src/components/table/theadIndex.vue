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
                    <span class="thead-sort" v-if="item.sort" @click="sortClick($event, item.field)">
                        <i data-name="top" :class="{ 'sort-active': theadSort[item.field] === 'top' }">↑</i>
                        <i data-name="btn" :class="{ 'sort-active': theadSort[item.field] === 'btn' }">↓</i>
                    </span>
                </template>
            </th>
        </tr>
    </thead>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
export default defineComponent({
    name: 'theadIndex',
    props: {
        // 表头配置数据
        theadData: {
            type: Array,
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
        // 需要排序的配置字段
        theadSort: {
            type: Object,
            default: () => {}
        },
        isCheckAll: {
            type: Boolean,
            default: false
        }
    },
    emits: ['changeboxAll'],
    setup(props, {emit}){

        const state = reactive({
            checkboxAll: false,
            theadSort: {}
        })

        onMounted(()=>{
            props.theadData.forEach(item => {
                item.sort && (state.theadSort[item.field] = 'top')
            })
        })

        watch(()=>props.isCheckAll,()=>{
            state.checkboxAll = props.isCheckAll;
        })

        const changeAll = () => {
            emit('changeboxAll', state.checkboxAll);
        }

        const setStyle = obj => {
            let styles = {}
            obj.width && (styles.width = obj.width)
            obj.align && (styles['text-align'] = obj.align)
            return styles
        }

        return {
            ...toRefs(state),
            changeAll,
            setStyle
        }
    }
})
</script>
<style scoped></style>
