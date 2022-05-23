import { mount } from '@vue/test-utils'
import TableIndex from '@/components/table/tableIndex'

describe('TableIndex', () => {
    // 挂载组件，生成包裹器
    let wrapper = mount(TableIndex);

    // 测试table是否渲染出来
    it('renders a table', async()=>{
        await wrapper.setProps({
            theadData: [
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
                    name: '姓别'
                },
                {
                    field: 'operation',
                    name: '操作'
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
    // it('renders a multiple', async()=>{
    //     await wrapper.setProps({
    //         multiple: true
    //     })
    //     expect(wrapper.props().multiple).toBe(true);
    //     let radioInput =  wrapper.findAll('input[type="radio"]').at(0);
    //     await radioInput.setChecked();
    //     expect(radioInput.element.checked).toBeTruthy();
    //     expect(wrapper.emitted().getCheckboxValue).toEqual([['001']]);
    // })

    // 是否生成多选
    // it('renders a selection', async()=>{
    //     await wrapper.setProps({
    //         selection: true
    //     })
    //     expect(wrapper.props().selection).toBe(true);
    //     let checkboxInput =  wrapper.findAll('.tbody-tr_checkbox input[type="checkbox"]').at(1);
    //     await checkboxInput.setChecked();
    //     expect(checkboxInput.element.checked).toBeTruthy();
    //     expect(wrapper.emitted().getCheckboxValue).toEqual([[['002']]]);
    // })

    // 测试最大高度
    it('renders a maxHeight', async()=>{
        await wrapper.setProps({
            maxHeight: '140px'
        })
        expect(wrapper.props().maxHeight).toBe('140px');

        // await wrapper.vm.$nextTick();
        // console.log(wrapper.vm.isScroll);
        // expect(wrapper.vm.isScroll).toBe(true);
    })

    // 测试分页
    it('renders a isPagination', async()=>{
        await wrapper.setProps({
            isPagination: true,
            total: 100,
            pageSize: 20
        })
        expect(wrapper.props().isPagination).toBe(true);

        const paginationName = wrapper.findComponent({ name: 'pageInation' }) // 通过 `name` 找到 pageInation
        expect(paginationName.exists()).toBe(true)
    })

    // 测试筛选
    it('renders a search', async()=>{
        await wrapper.setProps({
            search: {
                field: 'six'
            }
        })
        expect(wrapper.props().search.field).toBe('six');
    })

  })