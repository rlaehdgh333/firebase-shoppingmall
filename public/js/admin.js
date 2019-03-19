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
});

// database = CRUD(Create/Read/Update/Delete)
// Firebase Init 
const log = console.log;
var config = {
    apiKey: "AIzaSyCQAYi_CxC_S5w7voYDqNODfKhjh9XgFGs",
    authDomain: "shoppingmall-dc78d.firebaseapp.com",
    databaseURL: "https://shoppingmall-dc78d.firebaseio.com",
    projectId: "shoppingmall-dc78d",
    storageBucket: "shoppingmall-dc78d.appspot.com",
    messagingSenderId: "369380810809"
  };
firebase.initializeApp(config);

// 공통 변수
var db = firebase.database();	//firebase의 데이터베이스 객체
var ref = new Array();
var key = "";

// 페이지 시작과 동시에 homeInit()실행하고, FB이벤트 콜백함수를 생성한다.
homeInit();
function homeInit() {
	ref[0] = db.ref("root/home/");
	ref[0].on("child_added", homeAdd);
	ref[0].on("child_removed", homeRev);
	ref[0].on("child_changed", homeChg);
}
/***** Firebase Callback 함수.시작 *****/
// Home 데이터가 추가되면 data변수에 추가된 내용을 담아 실행한다.
function homeAdd(data){
	var sel = ["", ""];
	if(data.val().target == "_blank") sel[0] = "selected";
	else sel[1] = "selected"; 
	var html = `
	<li id="${data.key}">
		<input type="text" class="w3-input w3-border w3-show-inline-block home_title" 
		value="${data.val().title}">
		<input type="text" class="w3-input w3-border w3-show-inline-block home_link" 
		value="${data.val().link}">
		<select class="w3-select w3-border w3-show-inline-block home_target">
			<option value="_blank" ${sel[0]}>새창</option>
			<option value="_self"  ${sel[1]}>현재창</option>
		</select>
		<button class="w3-green w3-button" onclick="dataChg(this);">수정</button>
		<button class="w3-red w3-button" onclick="dataRev(this);">삭제</button>
	</li>`;
	$("#homes").append(html);
}
// Home 데이터가 삭제되면 data변수에 삭제된 내용을 담아 실행한다.
function homeRev(data) {
	$("#"+data.key).remove();
}
// Home 데이터가 수정되면 data변수에 수정된 내용을 담아 실행한다.
function homeChg(data) {
	$("#"+data.key).stop().animate({"opacity":0}, 300, function(){
		$(this).css({"opacity":1});
	});
}
/***** Firebase Callback 함수.종료 *****/


// home 저장 버튼을 눌렀을때.
$("#bt1_save").on("click", function(){
	if($("#title1").val() == "") {
		alert("제목 !!");
		return;
	}
	if($("#link1").val() == "") {
		alert("링크 !!");
		return;
	}
	//Firebase 추가 명령
	ref[0].push({
		title: $("#title1").val(),
		link: $("#link1").val(),
		target: $("#target1").val()
	}).key;
	$("#title1").val("");
	$("#link1").val("");
});
// home 삭제버튼을 눌렀을때
function dataRev(obj) {
	if(confirm("정말로 삭제하시겠습니까?")) {
		//Firebase 삭제 명령
		db.ref("root/home/"+$(obj).parent().attr("id")).remove();
	}
}
// home 수정버튼을 눌렀을때
function dataChg(obj) {
	var $li = $(obj).parent();
	key = $li.attr("id");
	console.log(key); 
	if($li.find(".home_title").val() == "") {
		alert("제목 !!");
		return;
	}
	if($li.find(".home_link").val() == "") {
		alert("링크 !!");
		return;
	}
	//Firebase 수정 명령
	db.ref("root/home/"+key).update({
		title: $li.find(".home_title").val(),
		link: $li.find(".home_link").val(),
		target: $li.find(".home_target").val()
	});
}















//page1 / HOME
/*
(function(){
	ref = db.ref("root/home");
	ref.on("child_added", homeAdd);
}());
$("#bt1_save").click(function(){
	var $title = $("#title1");
	var $link = $("#link1");
	var $target = $("#target1");
	if($title.val() == ""){
		alert("제목을 입력하세요.");
		return;
	}
	if($link.val() == ""){
		alert("링크주소를 입력하세요.");
		return;
	}
	ref.push({
		title: $title.val(),
		link: $link.val(),
		target: $target.val()
	}).key;
	$title.val('');
	$link.val('');
});
function homeAdd(data) {
	var sel = ['', ''];
	if(data.val().target == "_blank") sel[0] = "selected";
	else sel[1] = "selected";
	var html = `
	<div id="${data.id}">
		<input type="text" class="w3-input w3-border w3-show-inline-block" 
		value="${data.val().title}">
		<input type="text" class="w3-input w3-border w3-show-inline-block" 
		value="${data.val().link}">
		<select class="w3-select w3-border w3-show-inline-block">
			<option value="_blank" ${sel[0]}>새창</option>
			<option value="_self" ${sel[1]}>현재창</option>
		</select>
		<button type="button" class="w3-indigo w3-button">수정</button>
		<button type="button" class="w3-red w3-button">삭제</button>
	</div>`;
	$("#homes").append(html);
}
*/

