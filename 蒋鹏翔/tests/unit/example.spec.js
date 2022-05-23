import {  mount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'

describe('HelloWorld.vue', () => {
  it('开始运行我第一个单元测试', () => {
    const wrapper = mount(Pagination)

    const todo = wrapper.get('[class="page-input"]').setValue('测试输入')
    wrapper.get('[data-test="form"]').trigger('submit')

    expect(todo.text()).toBe('上一页')
  })
})
