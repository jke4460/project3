$(document).ready(function () {
    /* 네비게이션 */
    var $pcGnb = $('#pcGnb > ul');
    var $pcGnb2 = $pcGnb.find('>li > ul');
    var dep1 = $('body').data('dep-one')-1;
    var dep2 = $('body').data('dep-two')-1;

    $pcGnb.find('li ul').hide();
    $pcGnb.find('> li > a').on('mouseenter focus', function () {
        $(this).stop().next().slideDown();
        $(this).addClass('on').siblings().removeClass('on');
    });
    $pcGnb.on('mouseleave', gnbReturn);
    if (dep1 >= 0) gnbReturn();
    $pcGnb.find('a:first, a:last').on('blur', function () {
        setTimeout(function() {
            if(!$pcGnb.find('a').is(':focus')) gnbReturn();
        },10);
    });
    function gnbReturn (){
        $pcGnb2.stop().slideUp();
        $pcGnb.find('>li>a.on').removeClass('on');
        if (dep1>=0) $pcGnb.find('>li').eq(dep1).addClass('on').find('ul li').eq(dep2).addClass('on');
    }
    /* 원페이지스크롤 */
    var $menu = $('#indicator ul li');
    var $cnt = $('#content article');
    var headerHei = $('#header').outerHeight();
    //console.log(headerHei);
    var cntPosT;
    var total = $cnt.size();
    var tgIdx = 0;
    var timerResizer = 0;
    var timerScroll = 0;
    var timerWheel = 0;

    $menu.eq(0).addClass('on');
    $(window).on('resize', function() {
        clearTimeout(timerResizer);
        setTimeout(function () {
            var cntHei = $(this).height();
            //console.log(cntHei);
            $cnt.css({height:cntHei});

            cntPosT = new Array(total);
            for (var i=0; i<total; i++) {
                cntPosT[i] = $cnt.eq(i).offset().top;
            }

            var onIdx = $('#indicator ul li.on').index();
            var tgPos = cntPosT[onIdx];

            $(window).off('scroll');
            $('html, body').stop().animate({scrollTop : tgPos}, 400, function () {
                $(window).on('scroll', scrollMove);
            });
        },50);
    });
    $(window).trigger('resize');

    $menu.children().on('click', function (e) {
        e.preventDefault();
        if ($('html, body').is(':animated')) return false;

        tgIdx = $(this).parent().index();
        $(this).parent().addClass('on').siblings().removeClass('on');
        $(window).off('scroll');
        $('html, body').stop().animate({scrollTop : cntPosT[tgIdx]},400, function () {
            $(window).on('scroll', scrollMove);
        });
    });
    $(window).on('scroll', scrollMove);

    function scrollMove () {
        clearTimeout(timerScroll);
        setTimeout(function () {
            var scrollT = $(this).scrollTop();
            $menu.each(function (idx) {
                if (scrollT >= cntPosT[idx]) $(this).addClass('on').siblings().removeClass('on');
            });
        },100);
    }
    $cnt.on('mousewheel DOMMouseScroll', function(e){
        clearTimeout(timerWheel);
        setTimeout(function () {
            if ($('html, body').is(':animated')) return false;

            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;
            if (delta < 0 && tgIdx < total - 1) {
                tgIdx++;
            }
            else if (delta > 0 && tgIdx > 0) {
                tgIdx--;
            }
            $('html, body').stop().animate({scrollTop:cntPosT[tgIdx]}, 300);
        }, 200);
    });
    /* 슬라이더 */
    var

});