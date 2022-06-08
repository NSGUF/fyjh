# table_app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


table组件api

Options：
theadData: [ //表头配置
  {
      field: 'six', 字段名
      name：'性别', 字段中文名
      width: '100px', 列宽
      align: '内容对齐方式'
      sort：true, 是否设置排序
  }
]

tbodyData: [ // 需要渲染的表体数据
    {
      six: '1'  
    }
]

selection: true, 支持多选

multiple: true , 支持单选

maxHeight：'150px' 列表的最大高度， 超出则出现滚动条，并且固定表头

isPagination: true, 列表支持分页

total：100 , 列表数据总条数

pageSize：10, 当前页最多显示多少条数据,

search: {  // 支持筛选
    field: 'six' 当前支持筛选的字段名
}

Event：

handlerTrClick：（function）返回当前行数据，

getCheckboxValue： （function）返回单选或者复选的数据，

changePage：（function）返回当前选择的页码和pageSize,

handlerSort:  (function) 返回当前的排序状态和字段