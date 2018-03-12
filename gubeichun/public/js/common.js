var common = (function(){
    //返回顶部
    function returnTop(){
        var returnBtn = utils.getByClass('returntop')[0];
        var cHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var offsetTop = 0;
        var timer = null;

        window.onscroll = showBtn;

        function showBtn(){
            offsetTop = document.documentElement.scrollTop || document.body.scrollTop;
            if( offsetTop > 300 ){
                returnBtn.style.display = 'block';
            }else{
                returnBtn.style.display = 'none';
            }
        }

        returnBtn.onclick = function(){
            this.style.display = 'none';
            window.onscroll = null;
            timer = setInterval(function(){
                var sTop = document.documentElement.scrollTop || document.body.scrollTop;
                var speed = Math.floor((-sTop)/10);
                if(sTop == 0){
                    clearInterval(timer);
                    window.onscroll = showBtn;
                    return;
                }
                document.documentElement.scrollTop = document.body.scrollTop = sTop + speed;

            },10)
        }
    }

    //顶部下拉菜单
    function showDown(){
        var headerTopUl = document.getElementById('header-top-ul');
        var olis = utils.children(headerTopUl,'li');
        var olilength = olis.length;
        for ( var i = 0; i < olilength; i++ ){
            (function(j){
                olis[j].onmouseenter = function(){
                    var onoff = utils.children(this,'div');
                    if( onoff.length > 0 ){
                        utils.addClass(this,'hover')
                    }
                }
                olis[j].onmouseleave = function(){
                    utils.removeClass(this,'hover')
                }
            }(i))
        }
    }

    return function(){
        returnTop();
        showDown();
    }
}())