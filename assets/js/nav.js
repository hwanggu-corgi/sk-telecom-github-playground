(function ($) {
  'use strict';
  var breakpoint = 1200;


  // Headers mobile navigation menu that shows on click
  $(function () {
    const body = $('body');
    const header = $('header');
    const mobileMenuBtn = $(header).find('.navbar-mobile-button').first();

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
    const body = $('body');
    const header = $('header');
    const mobileMenuBtn = $(header).find('.navbar-mobile-button').first();

    $(window).resize(() => {
      if ($(document).width() > breakpoint) {
        body.removeClass('mobile-menu-open');
        header.removeClass('mobile-menu-open');
        mobileMenuBtn.removeClass('open');
      }
    });
  });

  // Headers mobile navigation menu opening submenu on click
  $(function () {
    $(".nav-submenu-btn").click(function(e) {
      e.preventDefault();
      const $navItem = $(this).closest(".nav-item");
      $($navItem).toggleClass("submenu-open");

      if ($($navItem).hasClass("submenu-open")) {
        $("ul:first", $navItem).slideDown();
      } else {
        $("ul:first", $navItem).slideUp();
      }
    })
  });


}(jQuery));
