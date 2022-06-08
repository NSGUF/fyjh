import {
    mount
} from "@vue/test-utils";

import TableColumn from '@/components/TableColumn.vue';
import tableIndex from '@/view/tableIndex';
import Pagination from '@/components/Pagination'

describe('表格头组件', () => {

    it('渲染表格头', ()=>{
        const wrapper = mount(TableColumn, {
            propsData: {
                title: '张三',
                width: 80,
                showCheck: true,
                sort: true
            }
        });
        expect(wrapper.props().width).toBe(80);
        expect(wrapper.props().title).toBe('张三');
        expect(wrapper.props().sort).toBe(true);
        expect(wrapper.props().showCheck).toBe(true);

        wrapper.find('.table-sort').trigger('click')

    })
})


describe('table组件使用', () => {
    it('表格使用', () => {mount(tableIndex)})
})


describe('分页器组件', () => {
    // 测试分页
    it('renders a isPagination', ()=>{
        const wrapper = mount(Pagination, {
            propsData: {
                pageNum: 2,
                total: 100,
                pageSize: 3,
                continueNo: 5
            }
        })
        expect(wrapper.props().total).toBe(100);
        const paginationName = wrapper.findComponent({ name: 'JPagination' })
        paginationName.vm.pageCompute(1)
        paginationName.vm.inputPage()
    })
})
