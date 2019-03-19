var gap = 200;		// page가 나타나기 전 px
var now = 0;			// 현재 페이지
var scTop = 0;		// 현재 문서의 scrollTop
var pages = new Array();	// 각각의 페이지의 상단으로 부터 떨어진 거리
var scFn = function(){
	$(".page").each(function(i){
		pages[i] = $(this).offset().top;
	});
	scTop = $(window, "html, body").scrollTop();
	now = pages.length - 1;
	for(var i in pages) {
		if(scTop + gap < pages[i]) {
			now = i - 1;
			break;
		}
	}
	$(".page").eq(now).find(".spa_ani").each(function(){
		var name = "opaShow";
		var duration = "0.5s";
		var delay = 0;
		if($(this).data("name") != "" && $(this).data("name") != undefined) {
			name = $(this).data("name");	//html에서 data-name 값
		}
		if($(this).data("duration") != "" && $(this).data("duration") != undefined) {
			duration = $(this).data("duration");	//html에서 data-duration 값
		}
		if($(this).data("delay") != "" && $(this).data("delay") != undefined) {
			delay = $(this).data("delay");	//html에서 data-delay 값
		}
		$(this).css({
			"animation-name": name, 
			"animation-duration": duration,
			"animation-delay": delay
		});
	});
	$(".page").eq(now).find(".fn_ani").each(function(){
		eval($(this).data("fn")+"($(this))");
	});
};
$(window, document, "html, body").on("scroll touchmove", scFn);

function barMove(obj) {
	if(obj.width() == 0) obj.stop().animate({"width":obj.html()}, 2000);
}

$().stop().animate({}, 3000, function(){
	$().stop().animate({}, 3000, function(){
		$().stop().animate({}, 3000, function(){
			$().stop().animate({}, 3000, function(){
				$().stop().animate({}, 3000, function(){
	
				})
			})
		})
	})
})