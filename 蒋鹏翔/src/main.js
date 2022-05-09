import Vue from 'vue'
import App from './App.vue'


import Table from '@/components/Table.vue'
import TableColumn from '@/components/Table_column.vue'
import Pagination from '@/components/Pagination'

Vue.config.productionTip = false

// 注册组件
Vue.component('J-Table', Table);
Vue.component('J-TableColumn', TableColumn);
Vue.component('J-Pagination', Pagination)

new Vue({
  render: h => h(App),
}).$mount('#app')
