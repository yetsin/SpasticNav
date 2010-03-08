var Site = function() {
    this.navBlob();
};

Site.prototype.navBlob = function() {
    var nav = $('#nav'),
            currentPageItem = $('#selected', nav),
            blobOverlap = 10, 
            blob,
            reset;

    $('<div id="blob"></div>').css({
        width : currentPageItem.width(),
        height : currentPageItem.outerHeight() + blobOverlap,
        left : currentPageItem.position().left,
        top : currentPageItem.position().top - blobOverlap / 2
    }).appendTo('#nav');

    blob = $('#blob');

    nav.hover(function() {
        clearTimeout(reset);
        $(this).mousemove(function(e) {
            console.log('pageX: ' + e.pageX + '; navWidth: ' + nav.width());
                blob.animate(
                    {
                        width : $(e.target).width(),
                        left : (e.pageX > nav.width()) ? blob.left : e.pageX - $(e.target).parent('li').width() / 2
                    },
                    {
                        duration: 'slow',
                        easing : 'easeOutCirc',
                        queue : false
                    }
                );

        }); // end mousemove
    }, function(e) {
        // mouse out
        blob.animate({
            left : $(e.target).parent('li').position().left
        }, 800);

        reset = setTimeout(function() {
            blob.animate({
                width : currentPageItem.outerWidth(),
                left: currentPageItem.position().left
            });
        }, 2000);
    });
};
new Site();