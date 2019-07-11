$(document).ready(function () {
	function modal () {
		//모달 열기 클릭 이벤트
		$('#sub1 ul .open_btn').on('click', function (e) {
			e.preventDefault();
			var $tg = $(this);
			var $modalCnt = $( $(this).attr('href') );	
			var $closeBtn = $modalCnt.find('.md_close_btn');
		
			$modalCnt.before('<div id="mask"></div>');
			
			$(window).on('resize', function () {
				var topPos = ($(this).height() - $modalCnt.outerHeight())/2;
				var leftPos = ($(this).width() - $modalCnt.outerWidth())/2;
				
				$modalCnt.css({top: topPos, left:leftPos});
			});
			$(window).trigger('resize');
			
			var $mask = $('#mask');
			
			$mask.add($modalCnt).stop().fadeIn('fast');
			
			$closeBtn.focus();
			
			$closeBtn.on('click', function () {
				$mask.add($modalCnt).stop().fadeOut('fast', function () {
					$mask.remove();
					$tg.focus();
				});
			});
			
			$mask.on('click', function () {
				$closeBtn.click();
			});	
			$closeBtn.on('keydown', function (e) {
				if (e.keyCode==9 && e.shiftKey || e.keyCode==9 && !e.shiftKey) {
					e.preventDefault();		
					$(this).focus();
				}
			});
			$(window).on('keydown', function (e) {
				if (e.keyCode==27) $closeBtn.click();
			});
		});
	}
	modal ();

	$('#sub1 .area .menu li a').on('click', function () {
		$(this).parent().addClass('on').siblings().removeClass('on');
	});
	/* sub2page */
	$('#sub2 .icon li').on('mouseenter', function () {
		$(this).addClass('on');
	});
	$('#sub2 .icon li').on('mouseleave', function(){
		$(this).removeClass('on');
	});
	$('.box li').on('mouseenter', function () {
		$(this).addClass('on');
	});
	$('.box li').on('mouseleave', function () {
		$(this).removeClass('on');
	});

});










