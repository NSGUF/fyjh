/**
 * 排序配置接口
 */
export interface SortConfig {
    sortType: String,
    porp: String
}

/**
 * 列配置接口
 */
export interface Columns {
    prop: String,
    label: String,
    width: String,
    isSort?: Boolean,
    sortFn?: Function,
    isDrag?: Boolean
}
