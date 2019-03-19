var now = 0;
var end = $(".slide").length - 1;
var dir = 1;
var delay = 3000;
var speed = 500;
var interval = setInterval(ani, delay);
init();

function init() {
	$(".slide").hide(0);
	$(".banner_wrap").css({"top":0});
	$(".slide").eq(now).css({"top":0}).show(0);
	if(now == 0) {
		$(".slide").eq(end).css({"top":"-100%"}).show(0);
		$(".slide").eq(now+1).css({"top":"100%"}).show(0);
	}
	else if(now == end){
		$(".slide").eq(now-1).css({"top":"-100%"}).show(0);
		$(".slide").eq(0).css({"top":"100%"}).show(0);
	}
	else {
		$(".slide").eq(now-1).css({"top":"-100%"}).show(0);
		$(".slide").eq(now+1).css({"top":"100%"}).show(0);
	}
}

function ani() {
	init();
	$(".banner").height($(".banner_wrap").height());
	$(".banner_wrap").stop().animate({"top":(dir*100)+"%"}, speed, function(){
		if(dir == -1) {
			if(now == end) now = 0;
			else now++;
		}
		else {
			if(now == 0) now = end;
			else now--;
		}
	});
}

$(".banner").mouseenter(function(){
	clearInterval(interval);
	$(".bt_banner").css({"opacity": 0.5});
});
$(".banner").mouseleave(function(){
	clearInterval(interval);
	interval = setInterval(ani, delay);
	$(".bt_banner").css({"opacity": 0});
});
$("#bt_prev").click(function(){
	clearInterval(interval);
	dir = 1;
	ani();
	interval = setInterval(ani, delay);
});
$("#bt_next").click(function(){
	clearInterval(interval);
	dir = -1;
	ani();
	interval = setInterval(ani, delay);
});