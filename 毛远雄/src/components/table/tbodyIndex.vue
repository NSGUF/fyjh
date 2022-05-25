<template>
    <tbody class="table-body-tbody">
        <tr class="table-body-tbody_tr" 
            v-for="(item, trIndex) in tbodyList" 
            :key="item.id" 
            @click="trClick(item)">
            <td class="tbody-tr_checkbox" v-if="selection || multiple">
                <input type="checkbox" 
                       name="checkAll" 
                       v-if="selection && !multiple" 
                       v-model="checkModel" 
                       :value="item.id" />
                <input type="radio" 
                       name="radio" 
                       v-if="multiple && !selection" 
                       v-model="radioModel" 
                       :value="item.id"/>
            </td>
            <td class="tbody-tr_td" 
                v-for="(el, tdIndex) in theadData" 
                :key="el.field + item.id" 
                :style="setStyle(el)">
                <template v-if="$slots[el.field]">
                    <slot :name="el.field" 
                          :trData="item" 
                          :value="item[el.field]" 
                          :trIndex="trIndex" 
                          :tdIndex="tdIndex">
                    </slot>
                </template>
                <template v-else>
                    {{ item[el.field] }}
                </template>
            </td>
        </tr>
    </tbody>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, toRefs, watch, PropType } from 'vue'
import { TheadDataType,
         TbodyDataType,
         StateTbodyIndexType,
         StyleValueType,
         StyleObjType } from './table'
export default defineComponent({
    name: 'tbodyIndex',
    props: {
        // 表头配置数据
        theadData: {
            type: Array as PropType<TheadDataType[]>,
            default: () => []
        },
        // 表体数据
        tbodyList: {
            type: Array as PropType<TbodyDataType[]>,
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
        checkValue: {
            type: Array as PropType<string[]>,
            default: ()=>[]
        }
    },
    emits: ['setSelectValue', 'trClick'],
    setup(props, {emit}){
        const state: StateTbodyIndexType = reactive({
            checkboxValue: [],
            radioValue: '',
        })

        watch(()=>props.checkValue, ()=>{
            state.checkboxValue = [...props.checkValue];
        },{immediate: true})

        const checkModel = computed({
            get() {
                return state.checkboxValue
            },
            set(val: string[]) {
                emit('setSelectValue', { type: 'selection', value: val})
                return (state.checkboxValue = val)
            }
        })

        const radioModel = computed({
            get() {
                return state.radioValue
            },
            set(val: string) {
                emit('setSelectValue', { type: 'multiple', value: val})
                return (state.radioValue = val)
            }
        })

        const trClick = (trData: any)=>{
            emit('trClick', trData);
        }

        const setStyle = (obj:StyleObjType) => {
            let styles:StyleValueType = {};
            obj.width && (styles.width = obj.width)
            obj.align && (styles['text-align'] = obj.align)
            return styles
        }

        return {
            ...toRefs(state),
            checkModel,
            radioModel,
            trClick,
            setStyle
        }
    }
})
</script>
<style scoped></style>
