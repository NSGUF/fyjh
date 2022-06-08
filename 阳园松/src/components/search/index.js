/**
 * @file 搜索
 */

/**
 * 搜索
 * @param {Array} gridData 表格数据
 * @returns 过滤之后返回的数据
 */
function searchFn (gridData, value) {
    if (!value) {
        return gridData;
    }
    console.info('搜索中。。。,表格数据：'+gridData+',关键字：'+value);
    return gridData.filter(item => {
        let isValue = false;
        for(let key in item) {
            if (item[key] && item[key].toString().includes(value)) {
                isValue = true;
                break;
            }
        }
        return isValue;
    });
}

export {
    searchFn
};