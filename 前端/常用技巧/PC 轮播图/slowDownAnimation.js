/*
动画实现的原理：通过定时器setInterval()不断移动元素的位置。
实现步骤:
1.获取元元素的位置；
2.让元素在当前得到位置移动慢慢变小的距离；
    核心算法: (targetValue - element.offsetLeft)/100  作为每次移动的距离(步长)
3.利用定时器不断重复前2步操作；
4.添加结束定时器的条件 (targetValue = element.offsetLeft)；
5.此元素必须要添加定位才能使用element.style.left;
*/

/**
 * @parama object 要移动的元素
 * @parama targetValue 目标要移动的距离
 * @parama 是X轴还是Y轴做移动,默认X轴
 * @parama callBackFunction 移动完成以后需要执行的回调函数
*/
function slowDown(object, targetValue, callBackFunction, isYmove) {
    // 清除定时器，防止多个定时器引起加速移动的问题
    clearInterval(object.timer);
    object.timer = setInterval(() => {
        let step;
        if (isYmove) {
            step = (targetValue - object.offsetTop) / 10;
        } else {
            step = (targetValue - object.offsetLeft) / 10;
        }

        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (isYmove) {
            if (object.offsetTop == targetValue) {
                releaseTimer();
            } else {
                object.style.top = object.offsetTop + step + 'px';
            }
        } else {
            if (object.offsetLeft == targetValue) {
                releaseTimer();
            } else {
                object.style.left = object.offsetLeft + step + 'px';
            }
        }

        function releaseTimer() {
            clearInterval(object.timer)
            if (callBackFunction) {
                callBackFunction()
            }
        }
    }, 15);
}
