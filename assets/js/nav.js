(function ($) {
  'use strict';


  // Headers mobile navigation menu that shows on click
  $(function () {
    var body = $('body');
    var header = $('header');
    var mobileMenuBtn = $(header).find('.navbar-mobile-button').first();

    $(mobileMenuBtn).click(() => {
      mobileMenuBtn.toggleClass("open");

      if (mobileMenuBtn.hasClass("open")) {
        body.addClass('mobile-menu-open');
        header.addClass('mobile-menu-open');
      } else {
        body.removeClass('mobile-menu-open');
        header.removeClass('mobile-menu-open');
      }
    })
  });

}(jQuery));
