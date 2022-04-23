(function ($) {
  'use strict';
  var breakpoint = 1200;


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

  // Headers mobile navigation menu go back to normal after breakpoint
  $(function () {
    var body = $('body');
    var header = $('header');
    var mobileMenuBtn = $(header).find('.navbar-mobile-button').first();

    $(window).resize(() => {
      if ($(document).width() > breakpoint) {
        body.removeClass('mobile-menu-open');
        header.removeClass('mobile-menu-open');
        mobileMenuBtn.removeClass('open');
      }
    });
  });

}(jQuery));
