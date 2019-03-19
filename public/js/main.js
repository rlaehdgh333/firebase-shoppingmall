const log = console.log;
// 모든 이미지가 서버로부터 전송이 완료되면 리사이즈 이벤트를 한번 실행하여
// 이미지 높이를 계산하게 한다.
$("body").imagesLoaded(function(){
	$(window).trigger("resize");
});

$(window).resize(function(){
	var hei = 0;
	$(".auto_hei").each(function(i){
		if(hei < $(this).height()) hei = $(this).height();
		$(this).parent().height(hei);	
	});
}).trigger("resize");

//$.ajax() 객체화
var Ajax = (function(){
	function Ajax(url, fn) {
		var obj = this;
		this.url = url;
		this.fn = fn;
			this.opts = {};
			this.opts.type = "get";
			this.opts.dataType = "json";
			this.opts.data = {};	
		$.ajax({
			type: obj.opts.type,
			url: obj.url,
			data: obj.opts.data,
			dataType: obj.opts.dataType,
			success: obj.fn,
			error: function(xhr, status, error) {
				console.log(xhr, status, error);
			}
		}); 
	}
	return Ajax;
}());

// Firebase Init
var config = {
    apiKey: "AIzaSyCQAYi_CxC_S5w7voYDqNODfKhjh9XgFGs",
    authDomain: "shoppingmall-dc78d.firebaseapp.com",
    databaseURL: "https://shoppingmall-dc78d.firebaseio.com",
    projectId: "shoppingmall-dc78d",
    storageBucket: "shoppingmall-dc78d.appspot.com",
    messagingSenderId: "369380810809"
  };
firebase.initializeApp(config);
//Firebase Init
var db = firebase.database();

mainInit();
function mainInit() {
	db.ref("root/home").on("child_added", homeAdd);
	db.ref("root/blog").on("child_added", blogAdd);
}

//카테고리 HOME 생성
function homeAdd(data) {
	var html = ''; 
	html += '<li class="rt_arrow">';
	html += '<a href="'+data.val().link+'" target="'+data.val().target+'">'+data.val().title+'</a></li>';
	$(".nav_sub").eq(0).append(html);
}
//카테고리 BLOG 생성
function blogAdd(data) {
	var html = '';
	html += '<ul id="'+data.key+' class="grid-item">';
	html += '<li class="grid-tit">'+data.val().name+'</li>';
	html += '</ul>';
	$(".grid").append(html);
	db.ref("root/blog/"+data.key+"/sub").once("value", function(sub){
		sub.forEach(function(v, i){
			html  = '<li class="rt_arrow" id="'+v.key+'>';
			html += '<a href="'+v.val().link+' target="'+v.val().target+'>'+v.val().name+'</a>';
			html += '</li>';
			$("#"+data.key).append(html);
		});
	});
}

// 카테고리 SHOP 생성 - Ajax/json 통신
new Ajax("../json/shop.json", shopAjax);
function shopAjax(data) {
	var html = '<div class="shop_cates wrap clear">';
	for(var i=0; i<data.cates.length; i++) {
		html += '<ul>';
		html += '<li class="shop_cate_tit">'+data.cates[i].tit+'</li>';
		html += '<li>';
		html += '<ul>';
		for(var j=0; j<data.cates[i].data.length; j++) {
		html += '<li class="shop_cate_name rt_arrow">';
		html += '<a href="'+data.cates[i].data[j].link+' target="'+data.cates[i].data[j].target+'>'+data.cates[i].data[j].name+'</a></li>';
		}
		html += '</ul></li></ul>';
	}
	html += '</div>';
/*	html += '<ul class="shop_prds">';
 	for(i=0; i<data.prds.length; i++) {
		html += '<li class="shop_prd ovhide"><a href="'+data.prds[i].link+' target="'+data.prds[i].target+'><img src="'+data.prds[i].src+' class="img size_ani"></a></li>';
	} */
	html += '</ul>';
	$(".nav_sub").eq(1).append(html);
}

// 카테고리 PORTFOLIO 생성 - Ajax/json 통신
new Ajax("../json/port.json", portAjax);
function portAjax(data) {
	for(var i in data.ports) {
		var html = '<li class="rt_arrow"><a href="'+data.ports[i].link+' target="'+data.ports[i].target+'>'+data.ports[i].name+'</a></li>';
		$(".nav_sub").eq(3).append(html);
	}
}
// 메인 좌측 네비 - lefts - Ajax/json 통신
new Ajax("../json/left.json", leftAjax);
function leftAjax(data) {
	var html;
	for(var i in data.lefts) {
		html = '<li class="rt_arrow">'+data.lefts[i].name+'</li>';
		$(".left").append(html);
	}
}


// top_nav hover 이벤트
$(".top_icon").mouseenter(function(){
	$(this).children("img").css({"opacity":.7});
});
$(".top_icon").mouseleave(function(){
	$(this).children("img").css({"opacity":1});
});

// nav 이벤트 (nav_sub show/hide)
$(".nav").mouseenter(function(){
	$(this).children(".nav_sub").css({"display":"block", "opacity":0}).stop().animate({"opacity":1, "top":"45px"}, 200);
});
$(".nav").mouseleave(function(){
	$(this).children(".nav_sub").stop().animate({"opacity":0, "top":"80px"}, 200, function(){
		$(this).css({"display":"none"});
	});
});

// rt_wings 이벤트
$(".top_nav .fa-bars").click(function(){
	var $bg = $(".rt_bg");
	var $cont = $(".rt_cont");
	$bg.css({"opacity":0, "display":"block"}).stop().animate({"opacity":.3}, 1000);
	$cont.css({"display":"block", "right":"-240px"}).stop().animate({"right":0}, 1000);
});

$(".rt_cont .fa-close").click(function(){
	var $bg = $(".rt_bg");
	var $cont = $(".rt_cont");
	$bg.stop().animate({"opacity":0}, 800, function(){
		$(this).css({"display":"none"});
	});
	$cont.stop().animate({"right":"-240px"}, 800, function(){
		$(this).css({"display":"none"});
	});
});

$(".rt_bg").click(function(e){
	e.stopPropagation();
	$(".rt_cont .fa-close").trigger("click");
});

//메인배너 / .bans
fadeShow();
function fadeShow() {
	var $wrap = $(".ban");
	var $slide = $(".ban > li");	
	var depth = 10;									//z-index
	var now = 0;										//Animation 대상
	var speed = 500;								//Animation 속도(animation-duration)
	var timeout = 3000;							//Animaton 간격(animation-delay)
	var end = $slide.length - 1;		//마지막 객체의 index값
	var interval;										//Animation 간격에 맞춰 특정된 함수를 실행한다.
	var hei;
	//Pager 초기화
	$slide.each(function(){
		$(this).css({"position":"absolute", "top":0});	//$(".ban > li")의 css 설정
		$(".cycle-pager").append("<span>●</span>");
	});
	$(".cycle-pager span").click(function(){
		now = $(this).index();
		fadeAni();
		clearInterval(interval);
		interval = setInterval(fadeAni, timeout);
	});
	$(".bans").height($slide.eq(0).height());
	$(window).resize(function(){
		$(".bans").height($slide.eq(now).height());
	});
	//최초 실행
	interval = setInterval(fadeAni, timeout);
	function fadeAni() {
		$(window).trigger("resize");
		$(".cycle-pager span").removeClass("cycle-pager-active");
		$(".cycle-pager span").eq(now).addClass("cycle-pager-active");
		var hei = $slide.eq(now).height();
		$(".bans").stop().animate({"height":hei+"px"}, speed);
		$slide.eq(now).css({"z-index":depth++, "opacity":0}).stop().animate({"opacity":1}, speed, function(){
			//여기는 애니메이션 완료된 직후
			$slide.children("div").removeClass("aniset").css({
				"animation-name":"none",
				"animation-fill-mode":"backwards",
			});
			$(this).children("div").each(function(){
				$(this).addClass("aniset");
				$(this).css({
					"animation-name":$(this).data("ani"),
					"animation-delay":$(this).data("delay"),
					"animation-duration":$(this).data("speed"),
					"animation-fill-mode":"forwards"
				});
			});
			if(now == end) now = 0;
			else now++;
		});
	}
}
//horzShow();
function horzShow() {
	//맨 앞의 li를 복사해서 $(".ban")맨 뒤에 붙여라
	$(".ban").append($(".ban > li").eq(0).clone());	
	var $wrap = $(".ban");
	var $slide = $(".ban > li");
	var now = 1;
	var speed = 500;
	var timeout = 3000;
	var end = $slide.length - 1;
	var interval;
	var hei = 0;
	//초기화
	$(window).resize(function(){
		hei = 0;
		$slide.each(function(i){
			//$(".ban > li")중 가장 큰 height 구함
			if(hei < $(this).height()) hei = $(this).height();	
		});
		$wrap.height(hei);		// $(".ban")의 높이를 넣어준다.
	}).trigger("resize");
	$slide.each(function(i){
		$(this).css({"left":(i*100)+"%", "position":"absolute"});
		if(i<end) $(".cycle-pager").append("<span>●</span>");
	});
	$(".cycle-pager span").click(function(){
		now = $(this).index();
		horzAni();
		clearInterval(interval);
		interval = setInterval(horzAni, timeout);
	});
	interval = setInterval(horzAni, timeout);
	function horzAni() {
		if(now == end) pnow = 0;
		else pnow = now;
		$(".cycle-pager span").removeClass("cycle-pager-active");
		$(".cycle-pager span").eq(pnow).addClass("cycle-pager-active");
		$wrap.stop().animate({"left":(-now*100)+"%"}, speed, function(){
			$(window).trigger("resize");
			if(now == end) {
				$wrap.css({"left":0});
				now = 1;
			}
			else now++;
		});
	}	
}
//ctmShow();
function ctmShow() {
	$(".c_slide").append($(".c_slide > li").eq(0).clone());	
	var $wrap = $(".c_slide");
	var $slide = $(".c_slide > li");
	var now = 1;
	var speed = 500;
	var timeout = 3000;
	var end = $slide.length - 1;
	var interval;
	var hei = 0;
	//초기화
	$(window).resize(function(){
		hei = 0;
		$slide.each(function(i){
			//$(".ban > li")중 가장 큰 height 구함
			if(hei < $(this).height()) hei = $(this).height();	
		});
		$wrap.height(hei);		// $(".ban")의 높이를 넣어준다.
	}).trigger("resize");
	$slide.each(function(i){
		$(this).css({"left":(i*100)+"%", "position":"absolute"});
	});
	interval = setInterval(horzAni, timeout);
	function horzAni() {
		if(now == end) pnow = 0;
		else pnow = now;
		$wrap.stop().animate({"left":(-now*100)+"%"}, speed, function(){
			$(window).trigger("resize");
			if(now == end) {
				$wrap.css({"left":0});
				now = 1;
			}
			else now++;
		});
	}	
}
//vertShow();
function vertShow() {
	$(".ban").append($(".ban > li").eq(0).clone());
	var $wrap = $(".ban");
	var $slide = $(".ban > li");
	var now = 1;
	var speed = 500;
	var timeout = 3000;
	var end = $slide.length - 1;
	var interval;
	var hei = 1000;
	//초기화
	$slide.each(function(i){
		if(i<end) $(".cycle-pager").append("<span>●</span>");
	});
	$(".cycle-pager span").click(function(){
		now = $(this).index();
		vertAni();
		clearInterval(interval);
		interval = setInterval(vertAni, timeout);
	});
	interval = setInterval(vertAni, timeout);
	$(".bans").height($slide.eq(0).height());
	$(window).resize(function(){
		$(".bans").height($slide.eq(now).height());
	});
	function vertAni() {
		if(now == end) pnow = 0;
		else pnow = now;
		$(".cycle-pager span").removeClass("cycle-pager-active");
		$(".cycle-pager span").eq(pnow).addClass("cycle-pager-active");
		var top = $slide.eq(now).position().top;
		var hei = $slide.eq(now).height();
		$(".bans").stop().animate({"height":hei+"px"}, speed);
		$wrap.stop().animate({"top":-top+"px"}, speed, function(){
			if(now == end) {
				$wrap.css({"top":0});
				now = 1;
			}
			else now++;
		});
	}
}

/***** hover Animation *****/
$(".hov_ani").each(function(){
	$(this).css({"position":"relative"});
	$(this).append('<ul class="hov_mask" style="display:none"><li></li><li></li><li></li><li></li></ul>');
	$(this).mouseenter(function(){
		var speed = 250;
		var $mask = $(this).children(".hov_mask");
		$mask.fadeIn(speed);
		$mask.children("li").eq(0).stop().animate({"width":$mask.width()-20+"px"}, speed);
		$mask.children("li").eq(1).stop().animate({"width":$mask.width()-20+"px"}, speed);
		$mask.children("li").eq(2).stop().animate({"height":$mask.height()-20+"px"}, speed);
		$mask.children("li").eq(3).stop().animate({"height":$mask.height()-20+"px"}, speed);
	});
	$(this).mouseleave(function(){
		var speed = 125;
		var $mask = $(this).children(".hov_mask");
		$mask.fadeOut(speed);
		$mask.children("li").eq(0).stop().animate({"width":"50%"}, speed);
		$mask.children("li").eq(1).stop().animate({"width":"50%"}, speed);
		$mask.children("li").eq(2).stop().animate({"height":"50%"}, speed);
		$mask.children("li").eq(3).stop().animate({"height":"50%"}, speed);
	});
});

/***** .prds Ajax 연동 *****/
new Ajax("../json/woman.json", prdInit);
new Ajax("../json/man.json", prdInit);
function prdInit(data) {
	var cate = data.cate;
	var arr = [data.all.latest, data.all.top, data.all.best];
	/*
	log("data => ", data);
	log("data.wos => ", data.wos);
	log("data.wos.latest => ", data.wos.latest);
	log("arr => ", arr);
	log("arr[0] => ", arr[0]);
	log("arr[0][0] => ", arr[0][0]);
	*/
	var html = '';
	var v;
	for(var i in arr) {
		html = '<ul class="clear">';
		for(var j in arr[i]) {
			v = arr[i][j];
			html += '<li class="prds"><ul class="prd"><li>';
			html += '<img src="'+v.img1+'" data-src="'+v.img2+'" class="img prd_img">';
			if(v.hot ) html += '<div class="icon_hot">HOT</div>';
			if(v.sale) html += '<div class="icon_sale">SALE</div>';
			html += '<div class="prd_mask"></div>';
			html += '<div class="icon_cart prd_icon aniset" data-over="bottomShow2" data-out="bottomHide2" data-speed="0.3s" data-delay="0">';
			html += '<i class="fa fa-shopping-cart"></i></div>';
			html += '<div class="icon_like prd_icon aniset" data-over="bottomShow2" data-out="bottomHide2" data-speed="0.3s" data-delay="0.2s"><i class="fa fa-heart-o"></i></div>';
			html += '<div class="icon_search prd_icon aniset" data-over="bottomShow2" data-out="bottomHide2" data-speed="0.3s" data-delay="0.4s"><i class="fa fa-search"></i></div></li>';
			html += '<li>'+v.tit+'</li>';
			html += '<li>';
			for(var k=1; k<=5; k++) {
				if(k <= v.star) html += '<i class="fa fa-star"></i>';
				else html += '<i class="fa fa-star-o"></i>'; 
			}					
			html += '</li><li><span>'+v.price+'</span></li>	</ul></li>';
		}
		html += '</ul>';
		$("#"+cate).append(html);
	}
	// 모든 데이터가 DOM에 적용된 상태
	$("#"+cate).imagesLoaded(function(){
		$("#"+cate).find(".spinner").hide(0);
		$(window).resize(function(){
			$("#"+cate).height($("#"+cate).find("ul").eq(0).height());
		}).trigger("resize");
		$("#"+cate).find(".prd").mouseenter(prdHover);
		$("#"+cate).find(".prd").mouseleave(prdLeave);
		$("#"+cate).prev().find(".ghost_bt").eq(0).trigger("click");
	});
}




/***** .prds 버튼 이벤트 *****/
$(".ghost_bt").mouseenter(function(){
	$(this).children("div").css({"transition":"transform 0.2s", "transform":"scale(1)"});
});
$(".ghost_bt").mouseleave(function(){
	$(this).children("div").css({"transition":"transform 0.1s", "transform":"scale(0)"});
});
$(".ghost_bt").click(function(){
	var $parent = $(this).parent().parent().parent();
	$(".ghost_bt", $parent).css({"background-color":"", "color":"", "border":""});
	$(this).css({"background-color":"#333", "color":"#fff", "border":"1px solid #333"});
	var idx = $(this).index();
	$parent.find(".prd_conts > ul").stop().animate({"margin-top":"50px", "opacity":0}, 300, function(){
		$(this).css({"display":"none"});
	});
	$parent.find(".prd_conts > ul").eq(idx).css({"display":"block"}).stop().animate({"margin-top":0, "opacity":1}, 300);
});

/***** .prds 상품 애니메이션 *****/
function prdHover() {
	imgSwap($(this).find(".prd_img"));
	var $mask = $(this).find(".prd_mask");
	var $icon = $(this).find(".prd_icon");
	$mask.stop().fadeIn(200);
	$icon.each(function(){
		var name = $(this).data("over");
		var speed = $(this).data("speed");
		var delay = $(this).data("delay");
		aniInit($(this), name, speed, delay);
	});
}
function prdLeave() {
	imgSwap($(this).find(".prd_img"));
	var $mask = $(this).find(".prd_mask");
	var $icon = $(this).find(".prd_icon");
	$mask.stop().fadeOut(200);
	$icon.each(function(){
		var name = $(this).data("out");
		var speed = $(this).data("speed");
		var delay = $(this).data("delay");
		aniInit($(this), name, speed, delay);
	});
}
function imgSwap(obj) {
	var src = obj.attr("src");
	var srcHover = obj.data("src");
	obj.attr("src", srcHover);
	obj.data("src", src);
}
function aniInit(obj, name, speed, delay) {
	obj.css({"animation-fill-mode": "backwards"});
	obj.css({
		"animation-name": name,
		"animation-duration": speed,
		"animation-delay": delay,
		"animation-fill-mode": "forwards"
	});
}

/***** customer swipe *****/
var $slide = $(".c_slide");
var $slides = $(".c_slide > li");
var swNow = 0;
var swPrev = 0;
var swNext = 0;
var swEnd = $slides.length - 1;
$(".c_slide").swipe({
	swipe: function(evt, dir, dist, dur, fingerCnt, fingerData){
		if(dir == "left") {
			if(swNow < swEnd) swNext = swNow + 1;
			else swNext = 0;
			$slides.eq(swNext).css({"left":"100%", "display":"block"});
			$slide.stop().animate({"left":"-100%"}, 300, function(){
				swNow = swNext;
				swInit();
			});
		}
		if(dir == "right") {
			if(swNow == 0) swPrev = swEnd;
			else swPrev = swNow - 1;
			$slides.eq(swPrev).css({"left":"-100%", "display":"block"});
			$slide.stop().animate({"left":"100%"}, 300, function(){
				swNow = swPrev;
				swInit();
			});
		}
	},
	threshold: 0
});
function swInit() {
	$slide.css({"left":0});
	$slides.eq(swNow).css({"left":0});
	$slides.hide(0);
	$slides.eq(swNow).show(0);
}

/***** TOP 버튼 *****/
$(window).scroll(function(){
	var scTop = $("html, body").scrollTop();
	if(scTop > 200) $(".tops").stop().fadeIn(1000);
	else $(".tops").stop().fadeOut(1000);
}).trigger("scroll");
$(".tops").click(function(){
	$("html, body").stop().animate({"scrollTop":0}, 500);
});
