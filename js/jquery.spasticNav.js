(function($) {

	$.fn.spasticNav = function(options) {

		options = $.extend({
            overlap : 10,
            speed : 1500,
            reset : 4000,
            color : '#0b2b61',
            easing : 'easeOutElastic'
		}, options);

		return this.each(function() {
            var nav = $(this),
                currentPageItem = $('#selected', nav),
                blob,
                reset;

            $('<li id="blob"></li>').css({
                width : currentPageItem.outerWidth(),
                height : currentPageItem.outerHeight() + options.overlap,
                left : currentPageItem.position().left - 2,
                top : currentPageItem.position().top - options.overlap / 2,
                backgroundColor : options.color
            }).appendTo('#nav');

            blob = $('#blob');

            nav.hover(function() {
                clearTimeout(reset);
                $(this).mousemove(function(e) {
                    if ( $(e.target).is('a') ) {
                        blob.animate(
                            {
                                left : $(e.target).position().left - 2,
                                width : $(e.target).parent('li').width()
                            },
                            {
                                duration: options.speed,
                                easing : options.easing,
                                queue : false
                            }
                        );
                    }
                }); // end mousemove
            }, function(e) {
                // mouse out
                reset = setTimeout(function() {
                    blob.animate({
                            width : currentPageItem.outerWidth(),
                            left: currentPageItem.position().left
                        }, options.speed);
                }, options.reset);
            });

		}); // end each

	}

})(jQuery);