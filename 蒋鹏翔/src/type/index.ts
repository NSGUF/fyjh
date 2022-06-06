export interface TableOptions {
    // 数据
    data: any[];

    // 当前页
    pageNum: number;

    // 每页数量
    pageSize?: number;

    // 总数量
    total: number;

    // 是否显示勾选框
    showCheck?: boolean;

}


// 排序
export enum SortTypeEnum {
    // 无序
    disorder,
    // 降序
    descending,
    // 升序
    ascending
}

export interface SortTypeMap {
   sort: SortTypeEnum
}