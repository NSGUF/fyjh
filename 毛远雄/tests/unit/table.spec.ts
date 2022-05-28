import { mount } from '@vue/test-utils'
import TableIndex from '@/components/table/tableIndex.vue'
import TbodyIndex from '@/components/table/tbodyIndex.vue'
// import TheadIndex from '@/components/table/theadIndex.vue'

describe('TableIndex', () => {
    // 挂载组件，生成包裹器
    const wrapper = mount(TableIndex);
    const tbody = mount(TbodyIndex);

    // 测试table是否渲染出来
    it('renders a table', async()=>{
        await wrapper.setProps({
            theadData: [
                {
                    field: 'name',
                    name: '姓名',
                    align: 'left'
                },
                {
                    field: 'age',
                    name: '年龄',
                    sort: true
                },
                {
                    field: 'sex',
                    name: '姓别'
                },
                {
                    field: 'operation',
                    name: '操作',
                    width: '120px'
                }
            ],
            tbodyData: [
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
            ]
        })
        // console.log(wrapper.html());
    })

    // 是否生成单选
    it('renders a multiple', async()=>{
        await wrapper.setProps({
            multiple: true,
            selection: false
        })
        const tbody = wrapper.findComponent({ name: 'tbodyIndex' })
        expect(tbody.props().multiple).toBe(true);
        const radioInput = tbody.findAll('.tbody-tr_checkbox input[type="radio"]')[0];
        await radioInput.setValue('001'); 
        await radioInput.trigger('input');
        await wrapper.vm.getCheckboxValue();
    })

    // 是否生成多选
    it('renders a selection', async()=>{
        await wrapper.setProps({
            selection: true,
            multiple: false
        })
        const tbody = wrapper.findComponent({ name: 'tbodyIndex' });
        const thead = wrapper.findComponent({ name: 'theadIndex'});
        expect(tbody.props().selection).toBe(true);
        const checkInput = tbody.findAll('.tbody-tr_checkbox input[type="checkbox"]')[1];
        await checkInput.setValue(['002']); 
        await checkInput.trigger('input');
        thead.vm.changeAll();
        thead.vm.$emit('changeboxAll', true);
        await wrapper.vm.getCheckboxValue();
    })

    // 测试最大高度
    it('renders a maxHeight', async()=>{
        await wrapper.setProps({
            maxHeight: 100
        })
        expect(wrapper.props().maxHeight).toBe(100);
    })

    // 测试分页
    it('renders a isPagination', async()=>{
        await wrapper.setProps({
            isPagination: true,
            total: 100,
            pageSize: 20
        })
        expect(wrapper.props().isPagination).toBe(true);

        const paginationName = wrapper.findComponent({ name: 'pageInation' })
        expect(paginationName.exists()).toBe(true)
        await paginationName.vm.nextPage()
        await paginationName.vm.prevPage()
        await paginationName.vm.setPage(2)
        // expect(wrapper.emitted('pageUp')).toBeTruthy()
    })

    // 测试筛选
    it('renders a search', async()=>{
        await wrapper.setProps({
            search: [ 'name' ]
        })
        const thead = wrapper.findComponent({ name: 'theadIndex' })
        expect(thead.props().search[0]).toBe('name');
        await thead.find('.thead-filter').trigger('click');
        await thead.vm.searchClick()
        await thead.vm.$emit('searchChange', {field: 'name', value: '张'});
    })

    // 测试排序
    it('renders a sort', async()=>{
        const thead = wrapper.findComponent({ name: 'theadIndex' });
        thead.find('.thead-sort [data-name="top"]').trigger('click');
    })

    // 单击行
    it('renders a click', async()=>{
        const tbody = wrapper.findComponent({ name: 'tbodyIndex' });
        tbody.findAll('.table-body-tbody_tr')[0].trigger('click');
    })

  })