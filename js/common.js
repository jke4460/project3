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
  /* 원페이지스크롤 */
  var $menu = $('#indicator ul li');
  var $cnt = $('#content article');
  var cntPosT;
  var total = $cnt.size();
  var tgIdx = 0;
  var timerResizer = 0;
  var timerScroll = 0;
  var timerWheel = 0;
  var cntHei; //window 높이

  $menu.eq(0).addClass('on');
  $(window).on('resize', function() {
      clearTimeout(timerResizer);
      setTimeout(function () {
          cntHei = $(this).height();
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
      //new Menu-3, event1-4, event2-5 에서 인디케이터 글자 색상 흰색교체
      $('#indicator').removeClass('white');
      if (tgIdx>=3 && tgIdx<=5) $('#indicator').addClass('white');
      $('.scroll').removeClass('black');
      if ((tgIdx>=1 && tgIdx<=3)||tgIdx==6) $('.scroll').addClass('black');
  });
  $(window).on('scroll', scrollMove);

  function scrollMove () {
      clearTimeout(timerScroll);
      setTimeout(function () {
          var scrollT = $(this).scrollTop();
          $menu.each(function (idx) {
              if (scrollT >= cntPosT[idx]) $(this).addClass('on').siblings().removeClass('on');
          });

          if (scrollT >= cntHei*3 && scrollT < cntHei*5.6 ) {
              //new Menu-3, event1-4, event2-5 에서 인디케이터 글자 색상 흰색교체
              $('#indicator').addClass('white');
          }else {
              $('#indicator').removeClass('white');
          }
          if ((scrollT >= cntHei*1 && scrollT < cntHei*3.6)||(scrollT == cntHei*6)) {
            //new Menu-3, event1-4, event2-5 에서 인디케이터 글자 색상 흰색교체
            $('.scroll').addClass('black');
        }else {
            $('.scroll').removeClass('black');
        }

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
    slider ('#cnt2');		//Best Menu slider 호출
	slider ('#cnt3');		//New Menu slider 호출
	function slider (target) {
		//console.log(target);		//#cnt2, #cnt3
		var $visual = $(target).find('.slider .visual');	//복제전 변수에 저장하여 ul.visual 자식은 3개의 li이다
		var liWid = $visual.children().outerWidth();
		var totalNum = $visual.children().length;
		var current = 1;									//슬라이더 현재 인덱스 번호 저장
		var visWid = liWid *(totalNum + 2);		//복제로 li 개수가 2개 늘어남
		$visual.css({width: visWid});

		var $front = $visual.children().last().clone().attr({class: 'frontcopy'});
		var $back = $visual.children().first().clone().attr({class: 'backcopy'});
		$visual.prepend($front).append($back).css({marginLeft: current * liWid * -1}); //복제하기 전 첫번째 li가 우선 보여지기
		$visual.children().eq(1).attr({'aria-hidden': false}).siblings().attr({'aria-hidden': true});
		
		$visual.next().children('button').on('click', function () {
			if ($visual.is(':animated')) return false;

			var btnNum = $(this).index();
			//console.log(btnNum);	//0:이전, 1:다음
			
			//이전버튼 클릭
			if (btnNum == 0) {
				current--;
				if (current < 1) {
					current = totalNum;
					$visual.css({marginLeft: (totalNum+1) * -liWid});
				}
			}
			//다음버튼 클릭
			else {
				current++;
				if (current > totalNum) { 
					current = 1;
					$visual.css({marginLeft: 0});
				}
			}
			$visual.children().eq(current).attr({'aria-idden': false}).siblings().attr({'aria-idden': true});
			$visual.stop().delay(100).animate({marginLeft: current * -liWid});
		});	
    }
    /* topBtn */
    $('#topBtn').on('click', function () {
    $('html, body').stop().animate({scrollTop:0});
    });
    /* mouseenter #cnt6 */
    var txtBox = $('#cnt6 ul li');
    txtBox.on('mouseenter', function () {
        $(this).addClass('on').siblings().removeClass('on');
    });
    txtBox.on('mouseleave', function () {
        $(this).removeClass('on');
    });

});