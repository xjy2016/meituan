var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true
});
$('.iconfont.top').click(function(){
	$('html,body').animate({"scrollTop":0},600);
})

var i = 1;
$(window).scroll(function(){
	var h = $(this).height();
	var h1 = $(this).scrollTop();
	var h2 = $(document).height();
	if (h1>=h2-h) {
		if (i<=4) {
			i++;
			$('.jiazai').show();
			ajax(showImg);
		}else{
			$('section h3').show();
		}
	}
	if (h1>h/2) {
		$('.iconfont.top').show();
	}else{
		$('.iconfont.top').hide();
	}
})
ajax(showImg)
function ajax(callback){
	$.ajax({
		url:'https://diviner.jd.com/diviner?p=610009&uuid=12396477&lid='+(i-1)*15+1+'&lim='+i*15+'&cb=tempGuessLikeCallback',
		dataType:'json',
		jsonp:'callback',
		scriptCharset:"gb2312",
		jsonpCallback:'tempGuessLikeCallback',
		success:function(res){
			var d = res.data;
			var html = '';
			$.each(d, function(i,ele) {
				html += '<li><a class="rect" href="https://item.jd.com/'+ele.spu;
				html += '.html"><div class="left"><img src="img/load.jpg" change="https://img13.360buyimg.com/n1/s80x80_'+ele.img+'"/></div>';
				html +='<div class="right"><p>'+ ele.t.substr(0,8) +'</p><p>'+ ele.t +'</p>';
				html+='<p><span class="pri"><b class="pri1">'+ele.jp+'元</b>门市价:'+ parseInt(ele.jp)*2+
				'元</span><span class="xiaoliang">已售'+ele.c3+'</span></p></div></a></li>';
			});
			setTimeout(function(){
				$('section h3').before('<ul class="list'+ i+'">'+html+'</ul>');//<p>第'+ i +'页</p>
				if (typeof callback == 'function') {
					callback();
				}
			},1000)
		}
	})
}
$('.jiazai').hide();
function showImg() {
	$('.jiazai').hide();
	$('section .list'+i+' img').each(function(){
		$(this).animate({opacity:0.3}, 500, function() {
			$(this).attr('src', $(this).attr('change')).animate({opacity: 1}, 1000);
		})
	})
}
var s = parseInt($('.time-sec').text());
var m = parseInt($('.time-min').text());
var h = parseInt($('.time-hour').text());
var timer = setInterval(function(){
	s--;
	if (s<=-1) {
		s=59;
		m--;
		if (h<=-1) {
			m=59;
			h--;
			if (h<=-1) {
				clearInterval(timer);
			}
		}
	}
	$('.time-sec').text(s)
	$('.time-min').text(m)
	$('.time-hour').text(h)
},1000)

function getDay(){
	var a = new Date();
	return a;
}
var d = new Date(2016,10,24,21-8,00,00);
jisuan();
setInterval(jisuan,1000);
function jisuan(){
	var b = getDay();
	var c = new Date(d-b);
	var h = (c.getDate()-1)*24+c.getHours();
	var m = c.getMinutes();
	var s = c.getSeconds();
	$('.time-hour').text(h);
	$('.time-min').text(m);
	$('.time-sec').text(s);
}
