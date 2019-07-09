$(document).ready(function () {
    /* 네비게이션 */
    var $pcGnb = $('#pcGnb > ul');
    var $pcGnb2 = $pcGnb.find('>li > ul');
    var dep1 = $('body').data('dep-one')-1;
    var dep2 = $('body').data('dep-two')-1;

    $pcGnb.find('li ul').hide();
    $pcGnb.find('> li > a').on('mouseenter focus', function () {
        $pcGnb.find('>li.on').removeClass('on').children('ul').slideUp('fast');

        $(this).stop().next().slideDown('fast').parent().addClass('on');
    
    });
    $pcGnb.on('mouseleave', gnbReturn);
    if (dep1 >= 0) gnbReturn();
    $pcGnb.find('a:first, a:last').on('blur', function () {
        setTimeout(function() {
            if(!$pcGnb.find('a').is(':focus')) gnbReturn();
        },10);
    });
    function gnbReturn (){
        $pcGnb2.stop().slideUp('fast');
        $pcGnb.find('>li.on').removeClass('on');
        if (dep1>=0) $pcGnb.find('>li').eq(dep1).addClass('on').find('ul li').eq(dep2).addClass('on');
    }

	//모바일 nav
	$('#header .btn_menu a').on('click', function (e) {
		e.preventDefault();
		$('#mGnb').css({display: 'block'}).stop().animate({bottom: 0});
    });
    $('.close_btn').on('click', function () {
        $('#mGnb').stop().animate({bottom:'100%'});
    });
    $('#mGnb > ul > li > a').on('click', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('on').siblings().removeClass('on'); 
    });
 
    /* topBtn */
    $('#topBtn').on('click', function () {
		$('html, body').stop().animate({scrollTop:0});
    });

});