/* var depth = 0;
var now = 0;
var end = $(".slide").length - 1;
$(".slide").each(function(){
	if(depth < $(this).css("z-index")) depth = $(this).css("z-index");
});
depth++;
ani();
function ani() {
	$(".slide").eq(now).css({"z-index":depth++, "opacity":0});
	$(".slide").eq(now).delay(3000).animate({"opacity":1}, 1000, function(){
		if(now == end) now = 0;
		else now++;
		ani();
	});
} */

var SlideFade = (function(){
	function SlideFade(slides, options) {
		var obj = this;
		this.slides = slides;
		this.delay = options.delay;
		this.speed = options.speed;
		this.now = 0;
		this.end = this.slides.length - 1;
		this.depth = 0;
		console.log(this.end);
		this.init(obj);
	}
	SlideFade.prototype.init = function(obj) {
		obj.slides.each(function(){
			if(obj.depth < $(this).css("z-index")) obj.depth = $(this).css("z-index");
		});
		obj.depth++;
		obj.ani(obj);
	}
	SlideFade.prototype.ani = function(obj) {
		var target = obj.slides.eq(obj.now);
		target.css({"z-index":obj.depth++, "opacity":0});
		target.delay(obj.delay).animate({"opacity":1}, obj.speed, function(){
			if(obj.now == obj.end) obj.now = 0;
			else obj.now++;
			obj.ani(obj);
		});
	}
	return SlideFade;
}());


