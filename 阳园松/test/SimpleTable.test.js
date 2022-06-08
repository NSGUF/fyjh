import Vue from 'vue'
import { shallowMount, mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import YTable from "../src/components/y-table.vue";
import search from "../src/components/search/search.vue";
import {searchFn} from "../src/components/search/index.js";
import headerSort from "../src/components/sort/header-sort.vue";
import {sortFn, getSortType} from "../src/components/sort/index.js";
import TableBody from "../src/components/table/index.vue";
import TableColumn from "../src/components/table/table-column.vue";
import pagination from "../src/components/pagination/index.vue";

let tableData = [{id: 1, name: '小明'}, {id: 2, name: '大明'}];
let columns = [
  {
      prop: 'id',     //列key值
      label: 'ID',    //列名称
      width: '180',   //表格宽度
      isSort: true,   //是否开启排序
      isDrag: true,   //是否开启列拖动
      sortFn: (gridData, sortType) => { //自定义排序
          return gridData.sort((a, b) => a.id > b.id ? -1 : 1);
      }
  },
  {
      prop: 'name',
      label: '名称',
      width: '180',
      isSort: false,
      isDrag: true
  },
  {
      prop: 'date',
      label: '日期',
      width: '180',
      isSort: false,
      isDrag: true
  },
  {
      prop: 'address',
      label: '地址',
      width: '180',
      isSort: false,
      isDrag: true
  }
];

test("查看y-table组件是否正常渲染", () => {
  const wrapper = mount(YTable, {
    propsData: {
      columns: columns,
      data: tableData
    }
  });
  expect(wrapper.html()).toMatchSnapshot();
});

test("查看TableBody组件是否正常渲染", async () => {
  const tableBody = shallowMount(TableBody);
  expect(tableBody.html()).toMatchSnapshot();
})

test("查看table-column组件是否正常渲染", () => {
  const wrapper = shallowMount(TableColumn);
  expect(wrapper.html()).toMatchSnapshot();
});

test("查看search组件是否正常渲染", () => {
  const wrapper = shallowMount(search);
  expect(wrapper.html()).toMatchSnapshot();
});

test("查看headerSort组件是否正常渲染", () => {
  const wrapper = shallowMount(headerSort);
  expect(wrapper.html()).toMatchSnapshot();
});

test("查看pagination组件是否正常渲染", () => {
  const wrapper = shallowMount(pagination);
  expect(wrapper.html()).toMatchSnapshot();
});

describe('search组件测试', () => {
  const wrapper = mount(search);
  it('查看是否渲染搜索按钮', () => {
    expect(wrapper.find('button').text()).toEqual('搜索');
  })

  it('触发搜索事件', async () => {
    await wrapper.find('input').setValue('666');
    wrapper.vm.search();
    expect(wrapper.vm.keywords).toBe('666');
  })

  it('查看输入框值是否正确', async () => {
    await wrapper.find('input').setValue('hello!');
    expect(wrapper.vm.keywords).toBe('hello!');
    await wrapper.find('input').setValue('3216549');
    expect(wrapper.vm.keywords).toBe('3216549');
  })
});

describe('headerSort(排序)组件测试', () => {
  const YTableWrapper = mount(YTable);
  
  it('执行排序事件', async () => {
    YTableWrapper.vm.sortClick({
        sortType: 'asc',
        porp: 'id'
    });

    expect(sortFn({value: tableData}, {
      sortType: 'desc',
      key: 'id'
    })).toBe(tableData);
  })

  it('再次执行排序事件', async () => {
    expect(sortFn({value: tableData}, {
      sortType: 'asc',
      key: 'id'
    })).toBe([{id: 1, name: '小明'}, {id: 2, name: '大明'}]);
  })

  it('查看排序是否成功', () => {
    const vmComponent = mount(headerSort);
    // 点击排序
    vmComponent.vm.sortClick();

    // 判断最后的sort是否为最后对应的值
    expect(vmComponent.vm.sort).toBe('asc');

    // 点击排序
    vmComponent.vm.sortClick();

    // 判断最后的sort是否为最后对应的值
    expect(vmComponent.vm.sort).toBe('desc');

    // 点击排序
    vmComponent.vm.sortClick();

    // 判断最后的sort是否为最后对应的值
    expect(vmComponent.vm.sort).toBe('');

    expect(getSortType()()).toBe('asc');
  })
});

describe('pagination(分页)组件测试', () => {
  const wrapper = mount(pagination);
  it('查看当前页,总页数，最大页数是否正确', async () => {
    await wrapper.setProps({ page: 6, total: 10, pageSize: 100 });
    expect(wrapper.vm.page).toBe(6);
    expect(wrapper.vm.total).toBe(10);
    expect(wrapper.vm.pageSize).toBe(100);
  })

  it('设置当前页', async () => {
    await wrapper.find('input').setValue(5);
    expect(wrapper.vm.currentPage).toBe(5);
  })

  it('获取焦点，查看当前页码', () => {
    wrapper.vm.setPageFocus();
    expect(wrapper.vm.newValue).toBe(5);
  })

  it('执行上一页事件', async () => {
    const wrapper = mount(pagination);
    await wrapper.setProps({ page: 0 });
    wrapper.vm.previousPage();
  })

  it('执行下一页事件', async () => {
    const wrapper = mount(pagination);
    await wrapper.setProps({ page: 10, total: 10, pageSize: 100 });
    wrapper.vm.nextPage();
    await wrapper.setProps({ page: 1, total: 100, pageSize: 5 });
    wrapper.vm.nextPage();
  })

  it('分页框失去焦点', async () => {
    const wrapper = mount(pagination);
    await wrapper.find('input').setValue(100);
    await wrapper.setProps({ page: 1, total: 10, pageSize: 1 });
    wrapper.vm.setPageBlur();
  })

  it('分页框再次失去焦点', async () => {
    const wrapper = mount(pagination);
    await wrapper.find('input').setValue(2);
    await wrapper.setProps({ page: 2, total: 100, pageSize: 2 });
    wrapper.vm.setPageBlur();
  })
});

describe("查看YTable(父)组件和pagination(子)组件是否正常通信", async () => {
  const YTableWrapper = mount(YTable);
  const paginationWrapper = YTableWrapper.findComponent(pagination);
  paginationWrapper.vm.$emit('setPage', 5);

  it('点击下一页', async () => {
    YTableWrapper.find('.next-page').trigger('click');
    await paginationWrapper.vm.$nextTick();
    await YTableWrapper.vm.$nextTick();
    expect(paginationWrapper.find('.page').text()).toContain(5);
    expect(YTableWrapper.vm.page).toBe(5);
  })

  it('点击上一页', async () => {
    YTableWrapper.find('.previous-page').trigger('click');
    await paginationWrapper.vm.$nextTick();
    await YTableWrapper.vm.$nextTick();
    expect(paginationWrapper.find('.page').text()).toContain(4);
    expect(YTableWrapper.vm.page).toBe(4);
  })

  it('查看nextPage函数是否正确执行', async () => {
    YTableWrapper.vm.nextPage(100);
    expect(YTableWrapper.vm.page).toBe(100);
  })

  it('查看previousPage函数是否正确执行', async () => {
    YTableWrapper.vm.nextPage(120);
    expect(YTableWrapper.vm.page).toBe(120);
  })
});

describe('查看YTable(父)组件和search(子)组件是否正常通信', () => {
  const YTableWrapper = mount(YTable);

  it('能否正常搜索', async () => {
    YTableWrapper.findComponent(search).vm.$emit('search', 1);
    expect(YTableWrapper.html()).toMatchSnapshot();
    YTableWrapper.vm.search({value: 10});
    expect(YTableWrapper.html()).toMatchSnapshot();

    expect(searchFn(tableData, 1)).toEqual([{id: 1, name: '小明'}]);
  })
});
