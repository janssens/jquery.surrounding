/*!
 * Jquery Surrounding v1.1
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
			option.source = myImg.attr("src");
		}
		$(this).css({"background":"url("+option.source+")","background-size":"auto 100%","cursor":"pointer"});
		$(this).mousewheel(function(event, delta) {
			var p = parseInt($(this).css("background-position").split(" ")[0].replace("px",""));
					$(this).css("background-position", (p + delta * 30)+"px");
			event.preventDefault();
		});

		$(this).on("dblclick",function(){
			if(! that.hasClass("fullscreen")) {
				that.clone().appendTo("body").addClass("fullscreen").css({"position":"fixed","top":0,"left":0,"margin":0,"border":0}).animate({"width":"100%","height":"100%"},500,function(){jQuery(this).surround(option);});
			}else{
				that.animate({"opacity":0},500,function(){that.remove();});
			}
		});
		var startX=0;
			
		$(this).bind('touchstart mousedown',function(e){
			e.preventDefault();
			if (e.type == 'touchstart'){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				startX = touch.pageX;
				var now       = new Date().getTime();
				var lastTouch = $(this).data('lastTouch') || now + 1;
				var delta = now - lastTouch;
				if(delta < 500 && delta > 0){//double tap
					$(this).data('lastTouch', null);
					$(this).trigger("dblclick");
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
			startX=0;
			$(this).css({"cursor":"pointer"});
		});
	};
})(jQuery);