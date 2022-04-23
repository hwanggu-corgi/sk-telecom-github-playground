(function ($) {
  'use strict';

  // Headers mobile navigation menu that shows on click
  $(function () {
      var nav = $('nav.td-navbar').first();
      if (!nav) return;

      var mobileMenuBtn = nav.find('.navbar-mobile-button').first();
      if (!mobileMenuBtn) return;

      $(mobileMenuBtn).click(() => {
        nav.toggleClass("open");
      })
  });

}(jQuery));
