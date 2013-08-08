/*!
 * Jquery Surrounding v1.3
 * a lightweight jquery plugin plugin which takes an ordinary image tag and transforms it into a gorgeous interactive 360° panorama
 * https://github.com/janssens/jquery.surrounding
 * GPL 2 License
 * by Gaëtan Janssens
 */

(function($) {
	$.fn.surround = function(option) {
		var myImg = $(this).find("img:first").hide();
		var that = $(this);
		if (!option){
			option = new Object;
		}
		if (!option.source){
			option.source = myImg.attr("src");
		}
		if (!option.step){
			option.step = 20;
		}
		$(this).css({"background":"url("+option.source+")","background-size":"auto 100%","cursor":"pointer"});
		$(this).mousewheel(function(event, delta) {
			var p = parseInt($(this).css("background-position").split(" ")[0].replace("px",""));
			$(this).css("background-position", (p + delta * option.step)+"px");
			event.preventDefault();
		});

		function switchFullscreen(){
			if(! that.hasClass("surroundingFullscreen")) {
				var offset = that.offset();
				that.clone().appendTo("body").addClass("surroundingFullscreen").css({"opacity":0,"position":"fixed","width":that.width()+"px","left":offset.left,"margin":0,"top":offset.top-$(document).scrollTop()}).animate({"background-position":0,"width":"100%","height":"100%","top":0,"left":0,"border":0,"opacity":1},500,function(){jQuery(this).surround(option);});
				window.location.hash = 'surroundingFullscreen';
			}else{
				that.animate({"opacity":0},500,function(){that.remove();});
				var scr = document.body.scrollTop;
				window.location.href = '#';
				document.body.scrollTop = scr;
			}
		}

		if ("onhashchange" in window) {
			window.onhashchange = locationHashChanged;
		}
		$(document).keydown(function(e) {
		    if (e.keyCode == 27) {
		        $(".surroundingFullscreen").animate({"opacity":0},500,function(){$(this).remove();});
		    }
		});

		function locationHashChanged() {
		    if (!window.location.hash){
				$(".surroundingFullscreen").animate({"opacity":0},500,function(){$(this).remove();});
			}
		}
		
		$(this).on("dblclick",function(){
			switchFullscreen();
		});
		var startX=0;
		var pressTimer;

		$(this).bind('touchstart mousedown',function(e){
			e.preventDefault();
			if (e.type == 'touchstart'){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				startX = touch.pageX;
				var now       = new Date().getTime();
				var lastTouch = $(this).data('lastTouch') || now + 1;
				var delta = now - lastTouch;
				pressTimer = window.setTimeout(function() { switchFullscreen(); },1000);
				if(delta < 500 && delta > 0){//double tap
					$(this).data('lastTouch', null);
					switchFullscreen();
				}else{
					$(this).data('lastTouch', now);
				}
			}else{
				startX = e.pageX;
			}
			$(this).css({"cursor":"w-resize"});
		});
		$(this).bind('touchmove mousemove',function(e){
			e.preventDefault();
			if (startX!=0){
				var delta;
				if (e.type == 'touchmove'){
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					delta = startX - touch.pageX;
					startX = touch.pageX;
					if (delta!=0){
						clearTimeout(pressTimer);
					}
				}else{
					delta = startX - e.pageX;
					startX = e.pageX;
				}
				var p = parseInt($(this).css("background-position").split(" ")[0].replace("px",""));
				$(this).css("background-position", (p - delta)+"px");
			}
		});
		$(this).bind('touchend mouseup mouseleave',function(e){
			e.preventDefault();
			clearTimeout(pressTimer);
			startX=0;
			$(this).css({"cursor":"pointer"});
		});
	};
})(jQuery);