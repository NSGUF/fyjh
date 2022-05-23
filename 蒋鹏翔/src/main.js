import { createApp } from 'vue'
import App from './App.vue'


import Table from '@/components/Table.vue'
import TableColumn from '@/components/TableColumn.vue'
import Pagination from '@/components/Pagination'


const Vue =createApp(App)

// 注册组件
Vue.component('J-Table', Table);
Vue.component('J-TableColumn', TableColumn);
Vue.component('J-Pagination', Pagination)

Vue.mount('#app')

