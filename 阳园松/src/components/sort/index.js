/**
 * 排序方法
 */

/**
 * 设置排序类型'asc'或者'desc'
 * @returns 排序类型
 */
function getSortType () {
    let i = 0;
    const sortType = ['asc', 'desc', ''];
    return function () {
        let type = sortType[i];
        i++
        if (i >= sortType.length) {
            i = 0;
        }
        return type;
    };
}

/**
 * 排序函数
 * @param {Array} tableData 需要排序的数据
 * @param {Object} value 当前列数据
 */
function sortFn(tableData, value) {
    tableData.value.sort((a, b) => {
        if (value.sortType === 'desc') {
            return a[value.porp] < b[value.porp] ? 1 : -1;
        } else {
            return a[value.porp] > b[value.porp] ? 1 : -1;
        }
    })
}

export {
    getSortType,
    sortFn
};