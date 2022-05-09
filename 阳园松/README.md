# y-table

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## api

| 参数                          |              说明           |          类型         |              可选值                 |             默认值            |                
| ----------------------------  | -------------------------------------------------- | -----------------------------------|------------------------------ |
| columns                       | 列配置                      |         object
| prop                          | 对应列字段名                 |         string
| label               	        | 列标题                      |         string  
| width                         | 列宽度                      |         string
| isSort                        | 当前列是否开启排序           |         boolean 
| rowHeight                     | 表格行高度                  |         number
| isPagination                  | 是否开启分页                |         boolean 
| pagination                    | 分页                        |          object 
| pageSize                      | 页最大条数                  |          number
| total                         | 总条数                      |          number
| prev-text                     | 上一页按钮文本               |          string
| next-tex                      | 下一页按钮文本               |          string