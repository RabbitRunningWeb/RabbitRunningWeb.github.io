var index = (function(){
    //左侧分类
    function classify(){
        var classify = utils.getByClass('banner-fl')[0];
        var classifyLis = classify.getElementsByTagName('li');
        for (var i = 0;i < classifyLis.length; i++){
            classifyLis[i].onmouseenter = function(){
                utils.addClass(this,'fl-active');
            }
            classifyLis[i].onmouseleave = function(){
                utils.removeClass(this,'fl-active');
            }
        }
    }

    //banner图片
    function banner(){
        var autoNum = 0,
            timer = null,
            bannerBox = utils.getByClass('banner-box')[0],
            bannerShow = utils.getByClass('banner-show',bannerBox)[0],
            alinks = bannerShow.getElementsByTagName('a'),
            bannerUl = bannerBox.getElementsByTagName('ul')[0],
            bannerlis = bannerUl.getElementsByTagName('li');

        //动态生成li
        var frag = document.createDocumentFragment();
        for(var i=0;i<alinks.length;i++){
            var lis = document.createElement('li');
            frag.appendChild( lis )
        }
        bannerUl.appendChild(frag);
        frag = null;
        bannerlis[0].className = 'banner-active';
        alinks[0].className = 'opacityshow'

        //点击切换
        for(var i=0;i<bannerlis.length;i++){
            bannerlis[i].index = i;
            bannerlis[i].onclick = function(){
                autoNum = this.index;
                tabmove()
            };
        }
        timer = setInterval(startmove,4000);

        bannerBox.onmouseenter= function(){
            clearInterval(timer)
        };
        bannerBox.onmouseleave= function(){
            timer = setInterval(startmove,4000);
        };

        function tabmove(){
            for(var j=0;j<bannerlis.length;j++){
                bannerlis[j].className = '';
                alinks[j].className = '';
            }
            bannerlis[autoNum].className = 'banner-active';
            alinks[autoNum].className = 'opacityshow';
        }

        function startmove(){
            autoNum++;
            autoNum %= alinks.length;
            tabmove();
        }
    }

    //滚动公告
    function scrollGG(){
        var timer=null,
            num = 0;
            scrollnews = utils.getByClass('scroll-news')[0],
            scrollboxshow = utils.getByClass('scroll-box-show',scrollnews)[0],
            newsul = utils.getByClass('news-cont',scrollboxshow)[0],
            oneh = newsul.getElementsByTagName('li')[0].offsetHeight;

        scrollboxshow.innerHTML += scrollboxshow.innerHTML;
        var scrollHeight = scrollboxshow.offsetHeight / 2;
        timer = setInterval(ggmove,2000);

        scrollnews.onmouseenter = function(){
            clearInterval(timer);
        }
        scrollnews.onmouseleave = function(){
            timer = setInterval(ggmove,2000);
        }

        function ggmove(){
            var newTop = scrollboxshow.offsetTop;
            if(newTop==-scrollHeight){
                num = 0;
                scrollboxshow.style.top = 0;
            }
            num++;
            var itarget = -( num * oneh );
            Move(scrollboxshow,{'top':itarget});
        }
    }


    //领券中心
    function quan(){
        var num = 0,
            quanwrap = utils.getByClass('quan-show-wrap')[0],
            quanscroll = utils.getByClass('quan-scroll-box',quanwrap)[0],
            quanitems = utils.getByClass('quan-items',quanscroll),
            oneWidth = quanitems[0].offsetWidth,
            prevbtn = utils.getByClass('prevbtn')[0],
            nextbtn = utils.getByClass('nextbtn')[0];

        utils.css(quanscroll,{'width':quanitems.length * oneWidth});

        prevbtn.onclick = function(){
            if( num == quanitems.length - 3 ){
                return;
            }
            num++;
            var newleft = num*oneWidth;
            Move(quanscroll,{'left':-newleft});
        }

        nextbtn.onclick = function(){
            if( num == 0 ){
                return;
            }
            num--;
            var newleft = num*oneWidth;
            Move(quanscroll,{'left':-newleft});
        }

    }

    return {
        classify : classify,
        banner:banner,
        scrollGG:scrollGG,
        quan:quan
    }

}())