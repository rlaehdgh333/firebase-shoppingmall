/*
var now = 1;
var end = $(".slide").length;
$(".banner_wrap").append($(".slide").eq(0).clone());
//$(".slide").eq(0).clone().appendTo($(".banner_wrap"));
$(".slide").each(function(i){
	$(this).css({"left":(i*100)+"%"});
});
ani();
function ani() {
	$(".banner_wrap").delay(2000).animate({"left":-(now*100)+"%"}, 1000, function(){
		if(now == end) {
			$(".banner_wrap").css({"left":0});
			now = 1;
		}
		else now++;
		ani();
	});
}
*/

/*
var now = 0;	//나타날 배너(li.slide)
var delay = 2000;	//다음 나타날 배너가 나오는 간격(시간)
var speed = 300;
var interval = setInterval(ani, delay);		//delay후 계속 반복하여 ani함수를 실행한다
var end = $(".slide").length - 1; //마지막 배너의 index
var dir = -1;	//애니메이션 방향 -1:오른쪽->왼쪽 / 1:왼쪽->오른쪽
init();
//초기화(애니메이션 시작전 항상 실행)
function init() {
	$(".banner_wrap").css({"left":0});
	$(".slide").hide(0);
	$(".slide").eq(now).css({"left":0}).show(0);
	if(now == 0) {
		$(".slide").eq(end).css({"left":"-100%"}).show(0);
		$(".slide").eq(now+1).css({"left":"100%"}).show(0);
	}
	else if(now == end) {
		$(".slide").eq(now-1).css({"left":"-100%"}).show(0);
		$(".slide").eq(0).css({"left":"100%"}).show(0);
	}
	else {
		$(".slide").eq(now-1).css({"left":"-100%"}).show(0);
		$(".slide").eq(now+1).css({"left":"100%"}).show(0);
	}
}
function ani() {
	init();
	$(".banner_wrap").stop().animate({"left":(100*dir)+"%"}, speed, function(){
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
$(".banner_wrap").mouseenter(function(){
	clearInterval(interval);
});
$(".banner_wrap").mouseleave(function(){
	clearInterval(interval);
	interval = setInterval(ani, delay);
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
*/

var SlideHori = (function(){
	function SlideHori(container, slides, options) {
		var obj = this;
		this.container = container;
		this.slides = slides;
		if(options) {
			this.options = options;
			if(!this.options.delay) this.options.delay = 2000;
			if(!this.options.speed) this.options.speed = 500;
			if(!this.options.dir) this.options.dir = -1;
			if(!this.options.dirBtn || this.options.dirBtn.length<2) {
				this.options.dirBtnUse = false;
			}
		}
		else {
			this.options = {
				delay: 2000,
				speed: 500,
				dir: -1,
				dirBtnUse: false
			}
		}
		this.now = 0;
		this.end = this.slides.length - 1;
		this.init(obj);
		this.interval = setInterval(this.ani, this.options.delay, obj);
		if(this.options.dirBtnUse === true) {
			this.options.dirBtn[0].click(function(){
				clearInterval(obj.interval);
				obj.options.dir = 1;
				obj.ani(obj);
				obj.interval = setInterval(obj.ani, obj.options.delay, obj);
			});
			this.options.dirBtn[1].click(function(){
				clearInterval(obj.interval);
				obj.options.dir = -1;
				obj.ani(obj);
				obj.interval = setInterval(obj.ani, obj.options.delay, obj);
			});
		}
		this.container.mouseenter(function(){
			clearInterval(obj.interval);
		});
		this.container.mouseleave(function(){
			clearInterval(obj.interval);
			obj.interval = setInterval(obj.ani, obj.options.delay, obj);
		});
	}
	SlideHori.prototype.init = function(obj) {
		obj.container.css({"left":0});
		obj.slides.hide(0);
		obj.slides.eq(obj.now).css({"left":0}).show(0);
		if(obj.now == 0) {
			obj.slides.eq(obj.end).css({"left":"-100%"}).show(0);
			obj.slides.eq(obj.now+1).css({"left":"100%"}).show(0);
		}
		else if(obj.now == obj.end) {
			obj.slides.eq(obj.now-1).css({"left":"-100%"}).show(0);
			obj.slides.eq(0).css({"left":"100%"}).show(0);
		}
		else {
			obj.slides.eq(obj.now-1).css({"left":"-100%"}).show(0);
			obj.slides.eq(obj.now+1).css({"left":"100%"}).show(0);
		}
	}
	SlideHori.prototype.ani = function(obj) {
		obj.init(obj);
		obj.container.stop().animate({"left":(100*obj.options.dir)+"%"}, obj.options.speed, function(){
			if(obj.options.dir == -1) {
				if(obj.now == obj.end) obj.now = 0;
				else obj.now++;
			}
			else {
				if(obj.now == 0) obj.now = obj.end;
				else obj.now--;
			}
		});
	}
	return SlideHori;
}());
