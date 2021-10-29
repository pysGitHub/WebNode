window.addEventListener('load', function () {
    let imgArray = [
        'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/76849/26/16731/189399/6135b3f7E432aaf50/54d8413552fa1652.jpg!cr_1053x420_4_0!q70.jpg.dpg',
        'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/48102/7/17081/192621/61369836Eb2d6d645/92bd86f34744a977.jpg!cr_1125x449_0_166!q70.jpg.dpg',
        'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/202378/22/4615/273113/6132b1cdE160567f4/ed8857c4a4abfe8a.jpg!cr_1125x449_0_166!q70.jpg.dpg',
        'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/172985/20/11254/250873/60ab712bE2cfd0e52/f184257039a404d1.png!cr_1053x420_4_0!q70.jpg.dpg'
    ];
    let scrollView = document.querySelector('.scroll');
    let ul = document.querySelector('ul');
    let ol = document.querySelector('ol');
    /*定义锁*/
    let lock = true;
        // 记录滚到了第几张图片
        let index = 0;


    // 设置 scrollView 的宽高
    scrollView.style.width = '90%';
    scrollView.style.height = '25%';
    // 设置 ul 的宽度
    ul.style.width = scrollView.offsetWidth * (imgArray.length + 2) + 'px';
    ul.style.height = scrollView.offsetHeight + 'px';
    // 左移一个图片的位置，让scroll展示第一张图片
    ul.style.left = `-${scrollView.offsetWidth}px`

    // 创建ul中的li
    for (let i = 0; i < imgArray.length; i++) {
        let imgli = document.createElement('li');
        imgli.style.width = scrollView.offsetWidth + 'px';
        imgli.style.height = scrollView.offsetHeight + 'px';
        imgli.style.backgroundImage = `url(${imgArray[i]})`;
        ul.appendChild(imgli);
        // 添加点击图片对应的操作
        imgli.addEventListener('click', function(){
            console.log(`点击的是第${i}张图片......`);
        })
    }

    // 创建ol中的li
    for (let i = 0; i < imgArray.length; i++) {
        let olli = document.createElement('li');
        ol.appendChild(olli);
        olli.addEventListener('touchstart', function () {
            clearInterval(timer);
            index = i;
            ol.querySelector('li.currenntPot').classList.remove('currenntPot');
            ol.children[i].classList.add('currenntPot');
            ul.style.transition = 'none';
            const transformx = -i * scrollView.offsetWidth;
            ul.style.transform = `translateX(${transformx}px)`;
        });

        olli.addEventListener('touchend', function () {
            clearInterval(timer);
            timer = setInterval(() => {
                if (index >= imgArray.length) {
                    index = 0;
                } else if (index < 0) {
                    index = imgArray.length - 1;
                }
                // 利用transform 2D做滚动
                index++;
                let translatex = -index * scrollView.offsetWidth;
                // 添加过渡
                ul.style.transition = 'all 0.3s'
                ul.style.transform = `translateX(${translatex}px)`;
            }, 2000);
        })
    }

    // 设置第一个圆点为特殊背景
    ol.children[0].className = 'currenntPot';
    // 把第一张复制放到最后面
    ul.appendChild(ul.children[0].cloneNode(true));
    // 把最后一张复制放在最前面
    ul.insertBefore(ul.children[ul.children.length - 2].cloneNode(true), ul.children[0]);


    // 自动滚动
    let timer = setInterval(() => {
        // 利用transform 2D做滚动
        if (index >= imgArray.length) {
            index = 0;
        } else if (index < 0) {
            index = imgArray.length - 1;
        }
        index++;
        console.log('index 1 = ', index);
        let translatex = -index * scrollView.offsetWidth;
        // 添加过渡
        ul.style.transition = 'all 0.3s'
        ul.style.transform = `translateX(${translatex}px)`;
    }, 2000);

    // 等过渡完成以后，监听过渡完成事件 transitionend, 然后再去做判断
    ul.addEventListener('transitionend', function (e) {
        /*定义锁的状态*/
        lock = true;
        console.log('index 2 = ', index);
        if (index >= imgArray.length) {
            // 去除过渡
            ul.style.transition = 'none';
            index = 0;
            const translatex = -index * scrollView.offsetWidth;
            // 利用最新的index * li的宽度快速滚动图片
            ul.style.transform = `translateX(${translatex}px)`;
            // 为什么下面的代码会得到异常效果？？？？？？
            // ul.style.transform = `-${scrollView.offsetWidth * index}px`;
        } else if (index < 0) {
            ul.style.transition = 'none';
            index = imgArray.length - 1;
            const translatex = -index * scrollView.offsetWidth;
            ul.style.transform = `translateX(${translatex}px)`;
        }
        ol.querySelector('li.currenntPot').classList.remove('currenntPot');
        ol.children[index].classList.add('currenntPot');
    });

    // 手指拖动
    let starx = 0; // 手指初始位置
    let movex = 0; // 移动距离
    ul.addEventListener('touchstart', function (e) {
        if (lock) { // 只有当 lock = true 才能执行(即:当transform执行结束才能拖动)
            clearInterval(timer);
            // 获取手指
            starx = e.targetTouches[0].pageX;
        }
    });

    ul.addEventListener('touchmove', function (e) {
        if (lock) {
            console.log('index 3 = ', index);
            ul.style.transition = 'none';
            // 手指移动距离
            movex = e.targetTouches[0].pageX - starx;
            // ul做transform
            const transformx = -index * scrollView.offsetWidth + movex;
            ul.style.transform = `translateX(${transformx}px)`;
        }
    });

    ul.addEventListener('touchend', function (e) {
        if (lock) {
            lock = false;
            console.log('index 4 = ', index);
            // 手指移动距离不够则回弹
            if (Math.abs(movex) > 50) {
                if (movex > 0) { // 右滑动，展示上一张
                    index--;
                } else {
                    index++;
                }
                console.log('index 5 = ', index);
                ul.style.transition = 'all 0.3s';
                const transformx = -index * scrollView.offsetWidth;
                ul.style.transform = `translateX(${transformx}px)`;
            } else {
                ul.style.transition = 'all 0.3s';
                const transformx = -index * scrollView.offsetWidth;
                ul.style.transform = `translateX(${transformx}px)`;
            }


            clearInterval(timer);
            timer = setInterval(() => {
                // 利用transform 2D做滚动
                index++;
                if (index >= imgArray.length) {
                    index = 0;
                } else if (index < 0) {
                    index = imgArray.length - 1;
                }
                console.log('index 6 = ', index);
                let translatex = -index * scrollView.offsetWidth;
                // 添加过渡
                ul.style.transition = 'all 0.3s'
                ul.style.transform = `translateX(${translatex}px)`;
            }, 2000);
        }
    })

})