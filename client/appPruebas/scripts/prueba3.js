$(function () {
    if (window.location == window.parent.location) {
        $('#fullscreen').text('Go back to Blog Layout Snippet on Bootsnipp (Click Here)');
        $('#fullscreen').attr('href', 'http://bootsnipp.com/mouse0270/snippets/846vX');
        $('#fullscreen').css('margin-left','-391.5px')
    }    
    $('#fullscreen').on('click', function(event) {
        event.preventDefault();
        window.parent.location =  $('#fullscreen').attr('href');
    });
    
    
    
    $('#toggle_posts').on('click', function(event) {
		event.preventDefault();
		$('#posts').toggleClass('open');
	});

	$('a[href^="#post-"]').on('click', function(event) {
		event.preventDefault();
		$('article.active').removeClass('active');
		$('#comments').removeClass('active');

		var percentage = parseInt($(window).width()) - parseInt($(this).css('width'));
		percentage = percentage / parseInt($(window).width());
		percentage = percentage * 100;

		if (percentage <= 20) {
			$('#posts').removeClass('open');
		}

		// THIS IS WHERE AJAX CODE WOULD GO TO LOAD ARTICLES DYNAMICALLY
		$($(this).attr('href')).addClass('active');
	});

	$('a[href^="#comments-"]').on('click', function(event) {
		event.preventDefault();

		// THIS IS WHERE AJAX CODE WOULD GO TO LOAD ARTICLES DYNAMICALLY
		$('#comments').toggleClass('active');
	});

	$('article > .title > .close').on('click', function(event) {
		event.preventDefault();
		$('#comments').removeClass('active');
		$(this).closest('article').removeClass('active');
	});
	$('#comments > .title > .close').on('click', function(event) {
		event.preventDefault();
		$(this).closest('#comments').removeClass('active');
	});   
});