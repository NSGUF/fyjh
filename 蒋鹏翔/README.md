# woaini

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

# 表格组件API

## J-TableColumn
| 名称 | 说明 | 类型 |
| ---- | ---- | ---- |
| dataIndex | 表格渲染的对应字段 | string |
| title | 表格头文字 | string |
| width | 表格头宽度 | string | number |
| height | 表格头高度 | string | number |
| sort | 表格头是否支持排序 | boolean |

<br>
<br>

## J-Table
| 名称 | 说明 | 类型 |
| ---- | ---- | ---- |
| options | 表格对应数据 | Object |

<br>
<br>

## J-Table 事件
| 名称 | 说明 | 类型 |
| ---- | ---- | ---- |
| selectChange | 勾选触发事件 | ()=>{void} |

<br>
<br>

## J-Table 方法
| 名称 | 说明 | 类型 |
| ---- | ---- | ---- |
| getSelectData | 获取所有勾选中的数据 | ()=>{} |
| loadData | 刷新表格 | ()=>{} |
| setCheckAll | 勾选所有行 | ()=>{} |
| 禁用所有行 | 禁用所有行 | ()=>{} |




