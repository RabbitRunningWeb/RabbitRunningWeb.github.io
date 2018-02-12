var Swiper = require('./swiper.min.js');

module.exports = {
    bannerMove: function() {
        new Swiper('.bannermove', {
            loop: true,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        })
    },
    tehuiMove: function() {
        new Swiper('.tehuibannermove', {
            loop: true,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        })
    },
    topNav:function () {
        var header = document.getElementById('header');
        var returnTop=document.getElementById('gotop');
        var t = 0;
        var timer = null;
        window.onscroll = function(){
            t = document.documentElement.scrollTop || document.body.scrollTop;
            header.className = 'trans'
            header.style.backgroundColor = "rgba(255,118,1,"+t/100+")"
            if(t>50){
                header.className = 'setcolor';
                returnTop.style.display = 'block';
            }else{
                returnTop.style.display = 'none';
            }
        };

        returnTop.addEventListener('click',function(){
            clearInterval(timer);
            timer = setInterval(function(){
                var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                var spd = Math.floor((-osTop) / 10);
                document.documentElement.scrollTop = osTop + spd;
                document.body.scrollTop = osTop + spd;
                if(osTop == 0){
                    clearInterval(timer);
                }
            },30);
        },false);
    }
}