var top = document.querySelector('.top');
var slider = document.querySelector('.slider');
var ul = document.querySelector('ul');
var goback = slider.children[slider.children.length - 1];
let a = true;
window.addEventListener('scroll', function () {
    if (window.pageYOffset >= 600) {
        if (a) {
            slowDown(slider, Math.ceil(document.documentElement.clientHeight / 2) + 600 - 125, function () {
                slider.className = 'slider1';
                slider.style.top = '50%';
                slider.style.transform = 'translate(0, -50%)';
                a = false;
            });
        }
    } else {
        slowDown(slider, 600, function () {
            slider.className = 'slider';
            // slider.style.top = '600px';
            slider.style.transform = 'translate(0, 0)';
            a = true;
        });
    }


})

goback.addEventListener('click', function () {
    windowSlowDown(window, 0);
})