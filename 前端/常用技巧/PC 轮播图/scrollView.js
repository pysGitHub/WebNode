window.addEventListener('load', function () {
    // 图片数组
    let imgArray = [
        'https://imgcps.jd.com/ling4/100008348530/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5bd81f3682acdd181dfeb407/376cf592/cr/s/q.jpg',
        'https://img11.360buyimg.com/pop/s590x470_jfs/t1/192637/6/21428/92970/61304cbcE22e7051b/bb6fe78d1e8a115d.png.webp',
        'https://imgcps.jd.com/ling4/100012043978/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5bd8253082acdd181d02f9df/477d9a2c/cr/s/q.jpg',
        'https://img11.360buyimg.com/pop/s590x470_jfs/t1/180255/25/21211/99193/612745d5Efaeda280/2956ba05af30196e.jpg.webp',
        'https://img10.360buyimg.com/pop/s590x470_jfs/t1/196943/18/4671/83751/6124c0d7E4004dcbd/303de1405fad6019.jpg.webp'
    ]

    // 定时器
    let timerInterval;
    // 禁止左右箭头被连续点击导致滚动过快
    let flag = true;
    // 记录左箭头被点击的次数
    let arrowCount = 0;
    // 记录点击的是那个圆点
    let circleCount = 0;
    // 获取界面的元素
    let scrollView = document.querySelector('.p_scrollView');
    let arrowLeft = document.querySelector('.p_arrowLeft');
    let arrowRight = document.querySelector('.p_arrowRight');
    let p_img = document.querySelector('.p_img');
    let circle = document.querySelector('.p_circle');


    // 设置 scrollView 的宽高
    scrollView.style.width = '590px';
    scrollView.style.height = '470px';
    // 设置p_img的宽高 (imgArray.length + 1 是因为代码后面克隆了第一张图片放在轮播图的最后面)
    p_img.style.width = scrollView.offsetWidth * (imgArray.length + 1) + 'px';
    p_img.style.height = scrollView.offsetHeight + 'px';


    // 鼠标放到 scrollView 上 显示左右箭头
    scrollView.addEventListener('mouseover', function () {
        arrowLeft.style.display = 'block';
        arrowRight.style.display = 'block';
        clearInterval(timerInterval);
        timerInterval = null;
    });

    // 鼠标离开 scrollView 上 影藏左右箭头
    scrollView.addEventListener('mouseout', function () {
        arrowLeft.style.display = 'none';
        arrowRight.style.display = 'none';
        // 自动滚动图片
        console.log('定时器开启');
        timerInterval = setInterval(() => {
            arrowRight.click();
        }, 2000);
    });


    // 创建p_img中的li
    for (let i = 0; i < imgArray.length; i++) {
        let imgli = document.createElement('li');
        imgli.style.width = scrollView.offsetWidth + 'px';
        imgli.style.height = scrollView.offsetHeight + 'px';
        imgli.style.backgroundImage = `url(${imgArray[i]})`;
        p_img.appendChild(imgli);
    }


    // 创建circle圆点, 并添加点击事件
    for (let j = 0; j < imgArray.length; j++) {
        let potli = document.createElement('li');
        circle.appendChild(potli)
        // 给每个li绑定事件
        potli.addEventListener('mouseenter', function () {
            // 给被选中的圆点做特殊标记
            for (let i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            this.className = 'circle_li';
            // 当圆点被点击以后，需要将圆点和箭头进行联动绑定
            arrowCount = j;
            // 点击圆点滚动图片
            slowDown(p_img, -j * scrollView.offsetWidth);
        });
    }
    // 把第一个圆点设置特殊css
    circle.children[0].className = 'circle_li';

    // 注意点：
    // 把p_img的图片中的第一张克隆到p_img的最后面（目的是为了让js动画看起来更一致）
    p_img.appendChild(p_img.children[0].cloneNode(true));


    // 点击img背景 的下一步操作
    for (let k = 0; k < p_img.children.length; k++) {
        // 给每个imgli 添加点击事件
        p_img.children[k].addEventListener('click', function () {
            console.log('第' + k + '张图片被点击，前往 xxx 界面');
            if (k === 0 || k === p_img.children.length) {
                console.log('都是第一张');
            }
        })
    }



    // 点击右箭头滚动图片
    arrowRight.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (arrowCount === p_img.children.length - 1) {
                p_img.style.left = 0;
                arrowCount = 0;
            }
            arrowCount++;
            slowDown(p_img, -arrowCount * scrollView.offsetWidth, function () {
                flag = true;
            });
            circleCount = arrowCount;
            // 如果走到最后一个圆点则重置为0，进行下一轮
            if (circleCount === circle.children.length) {
                circleCount = 0;
            }
            changeCurrentCircleStyle()
        }
    });

    // 点击左箭头滚动图片
    arrowLeft.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (arrowCount === 0) {
                arrowCount = p_img.children.length - 1;
                p_img.style.left = -arrowCount * scrollView.offsetWidth + 'px';
            }
            arrowCount--;
            slowDown(p_img, -arrowCount * scrollView.offsetWidth, function () {
                flag = true;
            });
            circleCount = arrowCount;
            // 如果circleCount < 0，进行下一轮
            if (circleCount < 0) {
                circleCount = circle.children.length - 1;
            }
            changeCurrentCircleStyle();
        }
    });


    // 自动滚动图片
    timerInterval = setInterval(() => {
        arrowRight.click();
    }, 2000);


    // 将当前的圆点设置特殊样式
    function changeCurrentCircleStyle() {
        for (let i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }
        circle.children[circleCount].className = 'circle_li';
    }
})