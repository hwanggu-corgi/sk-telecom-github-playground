(function ($) {
  'use strict';
  var breakpoint = 1200;


  // Headers navigation accessibility for desktop
  $(function () {
    const mainMenuLinks = $('.td-navbar .navbar-nav > li > a');
    const subMenuLinks = $('.td-navbar .dropdown-menu > li > a');
    // on tab, if it hovers over nav-link in main menu
    $(mainMenuLinks).bind('keydown', function (event) {
      if (!event.target.classList.contains("nav-link")) return;
      // if it's backward motion
      if (event.shiftKey && event.key.toUpperCase() === "TAB") {
        console.log($(event.target).next().focus());
      } else if (event.key.toUpperCase() === "TAB") {
        event.preventDefault();
        const $navItem = $(event.target).closest(".nav-item");
        // if it has submenu, then open the submenu
        if (!$($navItem).hasClass("has-children")) {
          $(e.target).next().focus();
          return;
        }
        console.log("I am here");
        console.log($(this).find(".nav-link"));
        $(this).find(".nav-link").first().focus();
      }
    });

    $(subMenuLinks).bind('keydown', function (event) {
      if (!event.target.classList.contains("nav-link")) return;
      // if it's forward motion
      // if it's backward motion
      if (event.shiftKey && event.key.toUpperCase() === "TAB") {
        event.preventDefault();
        // if it has submenu, then close the submenu
      } else if (event.key.toUpperCase() === "TAB") {
        event.preventDefault();
        // if it has submenu, then open the submenu
      }
    });
  });


  // Headers mobile navigation menu that shows on click
  $(function () {
    const body = $('body');
    const header = $('header');
    const mobileMenuBtn = $(header).find('.navbar-mobile-button').first();
    const mobileMenu = $('.td-navbar-mobile');

    $(mobileMenuBtn).click(() => {
      mobileMenuBtn.toggleClass("open");

      if (mobileMenuBtn.hasClass("open")) {
        body.addClass('mobile-menu-open');
        header.addClass('mobile-menu-open');
      } else {
        body.removeClass('mobile-menu-open');
        header.removeClass('mobile-menu-open');
        $(mobileMenu).find(".navbar-submenu").slideUp();
        $(mobileMenu).find(".nav-submenu-btn").removeClass("open");
        $(mobileMenu).find(".nav-item").removeClass("submenu-open");
        $(mobileMenu).find(".td-search-input").val("");
      }
    })
  });

  // Headers mobile navigation menu go back to normal after breakpoint
  $(function () {
    const body = $('body');
    const header = $('header');
    const mobileMenuBtn = $(header).find('.navbar-mobile-button').first();
    const mobileMenu = $('.td-navbar-mobile');

    $(window).resize(() => {
      if ($(document).width() > breakpoint) {
        body.removeClass('mobile-menu-open');
        header.removeClass('mobile-menu-open');
        mobileMenuBtn.removeClass('open');
        $(mobileMenu).find(".navbar-submenu").slideUp();
        $(mobileMenu).find(".nav-submenu-btn").removeClass("open");
        $(mobileMenu).find(".nav-item").removeClass("submenu-open");
        $(mobileMenu).find(".td-search-input").val("");
      }
    });
  });

  // Headers mobile navigation menu opening submenu on click
  $(function () {
    $(".nav-submenu-btn").click(function(e) {
      e.preventDefault();
      const navItem = $(this).closest(".nav-item");
      $(navItem).toggleClass("submenu-open");

      if ($(navItem).hasClass("submenu-open")) {
        $("ul:first", navItem).slideDown();
      } else {
        $("ul:first", navItem).slideUp();
      }
    })
  });
}(jQuery));
