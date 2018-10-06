(function() {
            
    var windowH = $(window).height(),
        documElem = $(document),
        slideDownPage = $('.slide-down-page'),
        slideUpPage = $('.slide-up-page'),
        content = $('.maincontent'),
        btns = $('.btn'),
        animSpeed = 600;
            
    slideDownPage.css({
        height: windowH + 'px',
        top: -windowH + 'px'
    });
    
    slideUpPage.css({
        height: windowH + 'px',
        top: windowH + 'px',
        display: 'none'
    });
            
    btns.on('click', function(e) {
        
        
        if ( $(this).hasClass('openUp') ) {
            slideDownPage.animate({'top': 0}, animSpeed);
            content.animate({'margin-top': windowH + 'px'}, animSpeed);
            setTimeout(function() {
                content.css('display', 'none' );
            },600);
        }
        else if ( $(this).hasClass('closeDown') ){
            slideDownPage.animate({'top': -windowH + 'px'}, animSpeed);
            content.animate({'margin-top': 0}, animSpeed);
            content.css('display', 'flex' );
        }
        else if ( $(this).hasClass('openDown') ){
            slideUpPage.css('display', 'flex');
            slideUpPage.animate({'top': 0}, animSpeed);
            content.animate({'margin-top': -windowH + 'px'}, animSpeed);
            setTimeout(function() {
                content.css('display', 'none' );
            },600);
        }
        else if ( $(this).hasClass('closeUp') ) {
            slideUpPage.animate({'top': windowH + 'px'}, animSpeed);
            content.animate({'margin-top': 0}, animSpeed);
            content.css('display', 'flex' );
            setTimeout(function() {
                slideUpPage.css('display', '');
            },600);
        }
        else if ( $(this).hasClass('graph') ) {
            $('.graphs').css('display', 'flex');
            $('.pies').css('display', 'none');
        }
        else if ( $(this).hasClass('pie') ) {
            $('.graphs').css('display', 'none');
            $('.pies').css('display', 'flex');
        }
        e.preventDefault();
    });           
              
            
})();