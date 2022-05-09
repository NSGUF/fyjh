<template>
  <div>
    <Table :theadData="theadData" :tbodyData="tbodyData" maxHeight="150px" :selection="true">
    <!-- <template #select>
      <span>
        <input type="checkbox" name="checkAll"/>
      </span>
    </template> -->
    <template #thead-name>
      <span>√</span>
    </template>
    <template #sex="{value}">
      <span>
        {{getSex(value)}}
      </span>
    </template>
    <template #operation="{trData}">
      <div>
        <button @click="editClick(trData)">编辑</button>
        <button @click="deleteClick(trData)">删除</button>
      </div>
    </template>
  </Table>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import Table from '../table/tableIndex.vue';
export default defineComponent({
  name: 'homeIndex',
  components: { Table },
  setup() {
    const state = reactive({ 
      a: 1,
      theadData: [],
      tbodyData: []
      })
    onMounted(()=>{
      state.theadData = [
        {
          field: 'name',
          name: '姓名'
        },
         {
          field: 'age',
          name: '年龄',
          sort: true
        },
         {
          field: 'sex',
          name: '姓别',
        },
        {
          field: 'operation',
          name: '操作'
        }
      ];
      state.tbodyData = [
        {
          id: '001',
          name: '张三',
          age: '18',
          sex: 0
        },
        {
          id: '002',
          name: '李四',
          age: '19',
          sex: 1
        },
        {
          id: '003',
          name: '王麻子',
          age: '18',
          sex: 2
        },
        {
          id: '004',
          name: '老王',
          age: '17',
          sex: 0
        },
        {
          id: '005',
          name: '老王1',
          age: '17',
          sex: 2
        },
        {
          id: '006',
          name: '老王2',
          age: '17',
          sex: 1
        }
      ];
    })
    /**
    * @desc 编辑
    * @param
    * @author Mike
    * @Date: 2022-05-07 23:57:09
    */
    const editClick = (trData)=>{
      console.log(trData);
    }
    /**
    * @desc 删除
    * @param
    * @author Mike
    * @Date: 2022-05-08 00:02:17
    */
    const deleteClick = (trData)=>{
      console.log(trData);
    }
    /**
    * @desc 获取性别
    * @param
    * @author Mike
    * @Date: 2022-05-08 00:11:01
    */
    const getSex = (value)=>{
      const sexObj = {
        sex: ''
      }
      switch (value) {
        case 0:
        sexObj.sex = '男';
        break;
        case 1:
        sexObj.sex = '女';
        break;
        default:
        sexObj.sex = '不详';  
      }
      return sexObj.sex
    }
    return {
      ...toRefs(state),
      editClick,
      deleteClick,
      getSex
    }
  }
})
</script>
<style scoped></style>
