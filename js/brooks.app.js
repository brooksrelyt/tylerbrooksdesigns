
$(document).ready (function () {

    require('http').createServer((req, res) => {
        res.end('▲ Hello World')
    }).listen(process.env.PORT)

    
	if("ontouchstart" in window){
    document.documentElement.className = document.documentElement.className + " touch";
}
if(!$("html").hasClass("touch")){
    $(".parallax").css("background-attachment", "fixed");
    $(".come-in").css("transform", "translateY(0px)");
}

function fullscreenFix(){
    var h = $('body').height();
    $(".bg-inner-content").each(function(i){
        if($(this).innerHeight() <= h){
            $(this).closest(".full-width").addClass("not-overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

function backgroundResize(){
    var windowH = $(window).height();
    $(".bg").each(function(i){
        var path = $(this);
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;

        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;

        var remainingH = 0;
        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }

        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;

        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();


function parallaxPosition(e){
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function(i){
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;

        if(bottomWindow > top && topWindow < bottom){
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");

            var min = 0;

            var max = - imgH + heightWindow;

            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow;
            top = top - overflowH;
            bottom = bottom + overflowH;

            var value = min + (max - min) * (currentWindow - top) / (bottom - top);

            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}
if(!$("html").hasClass("touch")){
    $(window).resize(parallaxPosition);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}
	
$(window).scroll (function () {
    var sT = $(this).scrollTop();
    if (sT >= 500) {
        $('.header').addClass('header-bg');
        $('.brand').css({'color': '#181818'});
        $('#nav-toggle').addClass('scroll');
        // $('#nav-toggle').addClass('white');

    }else {
        $('.header').removeClass('header-bg');
        $('.brand').css({'color': '#fff'});
        $('#nav-toggle').removeClass('scroll');
        // $('#nav-toggle').removeClass('white');
    }
});
    
$('#nav-toggle').click(function(){
    $(this).toggleClass('scroll');
    $(this).toggleClass('white');
    // $('#menu').slideToggle();
    $('#menu').animate({width : 'toggle'}, 400);
    $('#menu').toggleClass('animated bounce');

    $(this).toggleClass('active');
});

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});

$(window).load(function() {
    $('#preloader').fadeOut(300, function() {
      $('body').css('overflow','visible');
      $(this).remove();
    });
});

    function homeText(){
		//var windowHeight = $(window).height();
		$(".work-item").each(function(i){
			var path = $(this);
			var contentWidth = path.width();
			var contentHeight = path.height();
			var divWidth = path.attr("data-width");
			var divHeight = path.attr("data-height");
			var ratio = divWidth / divHeight;

			var remainingHeight = 0;

			divHeight = contentHeight + remainingHeight;
	        divWidth = divHeight * ratio;

			if(contentWidth > divWidth){
				divWidth = contentWidth;
				divHeight = divWidth / ratio;
			};
			path.data("resized-divWidth", divWidth);
			path.data("resized-divHeight", divHeight);
			path.css("height", divHeight + "px");
		});
	}
	$(window).resize(homeText);
	$(window).focus(homeText);
	homeText();
});

var trigger = $('.trigger');
    trigger.on('click', function(event){
    event.preventDefault();
    $(this).next('.content').slideToggle(200).end().parent('li').toggleClass('content-visible');
});

(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       only accounts for vertical position, not horizontal.
     */
    var $w = $(window);
    $.fn.visible = function(partial,hidden,direction){

        if (this.length < 1)
            return;

        var $t        = this.length > 1 ? this.eq(0) : this,
            t         = $t.get(0),
            vpWidth   = $w.width(),
            vpHeight  = $w.height(),
            direction = (direction) ? direction : 'both',
            clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

        if (typeof t.getBoundingClientRect === 'function'){

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect(),
                tViz = rec.top    >= 0 && rec.top    <  vpHeight,
                bViz = rec.bottom >  0 && rec.bottom <= vpHeight,
                lViz = rec.left   >= 0 && rec.left   <  vpWidth,
                rViz = rec.right  >  0 && rec.right  <= vpWidth,
                vVisible   = partial ? tViz || bViz : tViz && bViz,
                hVisible   = partial ? lViz || rViz : lViz && rViz;

            if(direction === 'both')
                return clientSize && vVisible && hVisible;
            else if(direction === 'vertical')
                return clientSize && vVisible;
            else if(direction === 'horizontal')
                return clientSize && hVisible;
        } else {

            var viewTop         = $w.scrollTop(),
                viewBottom      = viewTop + vpHeight,
                viewLeft        = $w.scrollLeft(),
                viewRight       = viewLeft + vpWidth,
                offset          = $t.offset(),
                _top            = offset.top,
                _bottom         = _top + $t.height(),
                _left           = offset.left,
                _right          = _left + $t.width(),
                compareTop      = partial === true ? _bottom : _top,
                compareBottom   = partial === true ? _top : _bottom,
                compareLeft     = partial === true ? _right : _left,
                compareRight    = partial === true ? _left : _right;

            if(direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if(direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if(direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };

})(jQuery);

var win = $(window);

var allMods = $(".module");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
  } 
});

win.scroll(function(event) {
  
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
    } 
  });
  
});