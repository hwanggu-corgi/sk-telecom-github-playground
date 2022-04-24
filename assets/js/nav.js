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

      const navItem = $(this).closest(".nav-item");
      const prevNavItem = $(navItem).prev();

      // if it's tabbing backward
      if (event.shiftKey && event.key.toUpperCase() === "TAB") {

        // if it's an item with submenu
        if ($(prevNavItem).length && $(prevNavItem).hasClass("has-children")) {
          event.preventDefault();

          let currentLiChildren = $(prevNavItem);
          while ($(currentLiChildren).length) {
            $(currentLiChildren).addClass("submenu-open");
            currentLiChildren = $(currentLiChildren).find("> ul > li.has-children").last();
          }

          $(prevNavItem).find(".nav-link").last().focus();
          return;
        }

        $(prevNavItem).find("ul").first().removeClass("submenu-open");

      // if it's tabbing forward
      } else if (event.key.toUpperCase() === "TAB") {

        // if it's an item with submenu
        if ($(navItem).hasClass("has-children")) {
          $(navItem).addClass("submenu-open");
          return;
        }
      }
    });

    $(subMenuLinks).bind('keydown', function (event) {

      if (!event.target.classList.contains("nav-link")) return;

      const navItem = $(this).closest(".nav-item");
      const prevNavItem = $(navItem).prev();

      // if it's tabbing backward
      if (event.shiftKey && event.key.toUpperCase() === "TAB") {

        // if it's first item in submenu
        if (!$(prevNavItem).length) {
          console.log(event.target);
          console.log($(navItem).closest(".nav-item").text());
          $(navItem).parent().closest(".nav-item").removeClass("submenu-open")
          return;
        }

      // if it's tabbing forward
      } else if (event.key.toUpperCase() === "TAB") {

        // if it's an item with submenu
        if ($(navItem).hasClass("has-children")) {
          $(navItem).addClass("submenu-open");
          return;
        }

         // if it's a last of the last in submenu
         if ($(navItem).is(':last-child') && !$(navItem).hasClass("has-children")) {
          $(navItem).closest("ul").removeClass("submenu-open");
        }

        // if it's a last item in submenu
        if ($(navItem).is(':last-child') && !$(navItem).hasClass("has-children")) {
          $(navItem).closest("ul").removeClass("submenu-open");
        }
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
