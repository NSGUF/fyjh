/**
 * @file 拖动列函数
 */

/**
 * 获取当前鼠标坐标
 * @param event 事件
 * @returns 
 */
function getMouseCoordinates(event) {
    let e = event || window.event;
    return e.clientX;
}

/**
 * 定义拖动函数事件
 */
function dragInit () {
    let drag = document.querySelectorAll('.column-drag');

    drag.forEach(item => {
        let th = item?.parentNode;
        item.onmousedown = function (event) {
            let x = event.clientX - item.offsetLeft;
            let currentX = getMouseCoordinates();

            document.onmousemove=function(event){
                item.style.left= `${event.clientX - x}px`;
                console.info('拖动中，当前坐标：'+ (event.clientX - x))
            }
 
            document.onmouseup=function(){
                let dragX = currentX - getMouseCoordinates();
                th.style.width = `${th.clientWidth - dragX}px`;
                console.info(`拖动完成，当前移动x轴距离：${dragX}`, `拖动之后的宽度：${th.style.width}`)
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    })
}

export {
    dragInit
}