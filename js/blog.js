$(document).ready(function(){
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

    $(window).scroll (function () {
        var sT = $(this).scrollTop();
        if (sT >= 500) {
            $('.header').addClass('header-bg');
            $('.header h1').css({'color': '#181818'});
            $('#nav-toggle').addClass('scroll');
            // $('#nav-toggle').addClass('white');

        }else {
            $('.header').removeClass('header-bg');
            $('.header h1').css({'color': '#fff'});
            $('#nav-toggle').removeClass('scroll');
            // $('#nav-toggle').removeClass('white');
        }
    });
});

