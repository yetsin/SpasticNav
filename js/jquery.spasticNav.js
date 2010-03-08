(function($) {

	$.fn.spasticNav = function(options) {

		options = $.extend({
            blobOverlap : 10,
            transitionSpeed : 1500,
            reset : 4000,
            color : '#0b2b61'
		}, options);

		return this.each(function() {
            var nav = $(this),
                currentPageItem = $('#selected', nav),
                blob,
                reset;

            $('<li id="blob"></li>').css({
                width : currentPageItem.outerWidth(),
                height : currentPageItem.outerHeight() + options.blobOverlap,
                left : currentPageItem.position().left - 1,
                top : currentPageItem.position().top - options.blobOverlap / 2,
                backgroundColor : options.color
            }).appendTo('#nav');

            blob = $('#blob');

            nav.hover(function() {
                clearTimeout(reset);
                $(this).mousemove(function(e) {
                    if ( $(e.target).is('a') ) {
                        blob.animate(
                            {
                                left : $(e.target).position().left - 1,
                                width : $(e.target).width()
                            },
                            {
                                duration: 1500,
                                easing : 'easeOutElastic',
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
                        }, options.transitionSpeed);
                }, options.reset);
            });

		}); // end each

	}

})(jQuery);