export interface TheadDataType {
    field: string
    name: string
    sort?: boolean
    [propname: string]: any
}

export interface TbodyDataType {
    [propname: string]: any
}

export interface StateTableIndexType {
    tbodyList: TbodyDataType
    checkValue: Array<string>
    radioValue: string
    topVal: string
    isScroll: boolean
    tableWidth: string
    isHeadScroll: boolean
    theadHeight: number | string
    tbodyHeight: number | string
}
export interface SelectValueType {
    type: string
    radioValue: string
    checkValue: string[]
}

export interface SearchValueType {
    field: string
    value: string
}

export interface SortValueType {
    field: string
    sort: string
}

export interface PageValueType {
    pageSize: number
    pageIndex: number
}

export interface  StatePageinationType {
    pageIndexs: number
    pageSizes: number
}

export interface StateTbodyIndexType {
    checkboxValue: string[]
    radioValue: string
}

export interface StyleValueType {
    width?: string
    'text-align'?: string
}

export interface StyleObjType {
    width?: string
    align?: string
    [propname: string]: any
}

interface SortObjType {
    [propname: string]: any
}

export interface StateTheadIndexType {
    checkboxAll: boolean
    theadSort: SortObjType
    searchVal: string
    filterTop: string
    filterLeft: string
    filterShow: boolean
    searchField: string
}