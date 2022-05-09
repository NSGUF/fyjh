<template>
  <div class="table" :class="{'table-isscroll': isScroll}" :style="{'height': maxHeight, 'width': tableWidth}" @scroll="onScroll">
    <table class="table-box" border="0" cellspacing="0" cellpadding="0">
    <!-- 表头 -->
      <thead class="table-header-thead" :class="{'table-isscroll': isHeadScroll}" :style="{'top': topVal}">
        <tr class="table-header-thead_tr">
          <th class="thead-tr_checkbox" v-if="selection">
            <input type="checkbox" name="checkAll" v-model="checkboxAll" @change="changeAll"/>
          </th>
          <th class="thead-tr_checkbox" v-if="multiple"></th>
          <th class="thead-tr_th" v-for="(item, thIndex) in theadData" :key="item.field+thIndex" :style="setStyle(item)">
              {{item.name}}
              <span class="thead-sort" v-if="item.sort" @click="sortClick($event, item.field)">
                <i data-name="top" :class="{'sort-active': theadSort[item.field] === 'top'}">↑</i>
                <i data-name="btn" :class="{'sort-active': theadSort[item.field] === 'btn'}">↓</i>
              </span>
              <template v-if="$slots['thead-'+item.field]">
                <slot :name="'thead-'+item.field" :trData="item" :value="item.field" :thIndex="thIndex"></slot>
              </template> 
          </th>
        </tr>
      </thead>
      <!-- 表体 -->
      <tbody class="table-body-tbody" ref="tbody">
        <tr class="table-body-tbody_tr" v-for="(item, trIndex) in tbodyData" :key="item.id" @click="trClick(item)">
          <td class="tbody-tr_checkbox" v-if="selection">
            <input type="checkbox" name="checkAll" v-model="checkModel" :value="item.id"/>
          </td>
          <td class="tbody-tr_checkbox" v-if="multiple">
            <input type="radio" name="radio" v-model="radioModel" :value="item.id"/>
          </td>
          <td class="tbody-tr_td" v-for="(el,tdIndex) in theadData" :key="el.field+item.id" :style="setStyle(el)">
            <template v-if="$slots[el.field]">
              <slot :name="el.field" :trData="item" :value="item[el.field]" :trIndex="trIndex" :tdIndex="tdIndex"></slot>
            </template>
            <template v-else>
              {{item[el.field]}}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { computed, defineComponent, onMounted, reactive, toRefs, ref, watch, nextTick } from 'vue';
export default defineComponent({
  name: 'tableIndex',
  components: {},
  props: {
    // 表头配置数据
    theadData: {
      type: Array,
      default: () => []
    },
    // 表体数据
    tbodyData: {
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
    // 最大高度
    maxHeight: {
      type: String,
      default: 'auto'
    }
  },
  emits: ['getCheckboxValue', 'handlerTrClick'],
  setup(props,{ emit }) {
    const tbody = ref(null)
    const state = reactive({
      checkboxAll: false,
      checkboxValue: [],
      radioValue: '',
      topVal: '0px',
      isScroll: false,
      tableWidth: 'auto',
      isHeadScroll: false,
      theadSort: {}
    })

    onMounted(()=>{
      nextTick(()=>{
        setWidth();
      })
      props.theadData.forEach(item=>{
        item.sort && (state.theadSort[item.field] = 'top')
      })
    })

    watch(props.tbodyData, ()=>{
      setWidth();
    })

    const setWidth = ()=>{
      let height = tbody.value.offsetHeight
      let width = tbody.value.offsetWidth
      console.log(width, height);
      state.tableWidth = width+'px'
      if(height > parseFloat(props.maxHeight)){
        state.isScroll = true;
        state.tableWidth = tbody.value.offsetWidth + 18 +'px';
      }
    }

    const checkModel = computed({
      get(){
        return state.checkboxValue;
      },
      set(val){
        emit('getCheckboxValue', val);
        return state.checkboxValue = val;
      }
    })

    const radioModel = computed({
      get(){
        return state.radioValue;
      },
      set(val){
        emit('getCheckboxValue', val);
        return state.radioValue = val
      }
    })
    
    const changeAll = ()=>{
      state.checkboxValue = state.checkboxAll? props.tbodyData.map(item=>item.id) : [];
      emit('getCheckboxValue', state.checkboxValue);
    }

    const setStyle = (obj)=>{
      let styles = {};
      obj.width && (styles.width = obj.width);
      obj.align && (styles['text-align'] = obj.align)
      return styles
    }

    const onScroll = (e)=>{
      let top = e.target.scrollTop;
      let height = tbody.value.offsetHeight;
      let scrollHeight = height - parseFloat(props.maxHeight);
      state.isScroll =  top < scrollHeight
      state.isHeadScroll = top > 0
      state.topVal = top+'px';
    }

    const trClick = (trData)=>{
      emit('handlerTrClick', trData)
    }

    const sortClick = (e, field)=>{
      let sort = e.target.getAttribute('data-name')
      state.theadSort[field] = sort
      emit('handlerSort', {field, sort})
    }

    return {
      ...toRefs(state),
      checkModel,
      radioModel,
      changeAll,
      setStyle,
      onScroll,
      tbody,
      trClick,
      sortClick
    }
  }
})
</script>
<style scoped>
.table{
  position: relative;
  overflow: auto;
  width: 100%;
}
.table-isscroll{
  border-bottom: 1px solid #999;
}
.table-box{
  border-right: 1px solid #999;
  border-bottom: 1px solid #999;
  table-layout: fixed;
}
.table-header-thead{
  position: absolute;
  background-color: #eee;
  z-index: 10;
}
.table-body-tbody_tr:hover{
  background-color: rgb(240, 240, 240);
}
.thead-tr_th,.tbody-tr_td,.thead-tr_checkbox,.tbody-tr_checkbox{
  width: 100px;
  height: 30px;
  line-height: 30px;
  padding: 5px 10px;
  border-top: 1px solid #999;
  border-left: 1px solid #999;
}
.thead-tr_checkbox,.tbody-tr_checkbox{
  width: 80px;
}
.thead-sort i{
  padding: 0 5px;
  cursor: pointer;
}
.thead-sort .sort-active{
  color: rgb(10, 108, 244);
}
</style>
