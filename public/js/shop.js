// HTML Header Include
w3.includeHTML(function(){
	var locName = document.URL;
	var fullName =locName.substring(locName.lastIndexOf("/") + 1, document.URL.length);
	var fName = fullName.split(".");
	var loc = ["admin", "shop", "blog", "port"];
	var index = 0;
	for(var i in loc){
		if(loc[i] == fName[0]) {
			index = i;
			break;
		} 
	}
	$(".navs li").css({"color":"#aaa", "background-color":"transparent"});
	$(".navs li").eq(index).css({"color":"#fff", "background-color":"#444"});
	$(".navs li").click(function(){
		location.href = $(this).data("src");
	});
	$(".page").html($(".page").html().replace(/[\n\r]/g, "<br>"));
	$(".page").html($(".page").html().replace(/[\t]/g, "&nbsp;&nbsp;&nbsp;&nbsp;"));
});

