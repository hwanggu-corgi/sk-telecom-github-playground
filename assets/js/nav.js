(function ($) {
  'use strict';
  var breakpoint = 1200;


  // Accessibility for desktop main menu items
  $(function () {
    const mainMenuLinks = $('.td-navbar .navbar-nav > li > a');

    // on tab, if it hovers over nav-link in main menu
    $(mainMenuLinks).bind('keydown', function (event) {
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

        // if it's an item without submenu
        $(prevNavItem).find("ul").first().removeClass("submenu-open");

      // if it's tabbing forward
      } else if (event.key.toUpperCase() === "TAB") {

        // if it's an item with submenu
        if ($(navItem).hasClass("has-children")) {
          $(navItem).addClass("submenu-open");
          return;
        }

        // if it's an item without submenu
      }
    });
  });

  // Accessibility for desktop submenu items
  $(function () {
    function closeSubmenu(currentLi) {
      // if all submenus closed
      console.log("here 1");
      if (!$(currentLi).parent().hasClass("dropdown-menu")) {
        return;
       }
      console.log("here 2");
      // if current li is not the last in submenu
      if (!$(currentLi).is(":last-child")) {
       return;
      }
      console.log("here 3");
      const nextLi = $(currentLi).parent().closest("li.has-children");
      nextLi.removeClass("submenu-open");
      closeSubmenu(nextLi);
    }

    const subMenuLinks = $('.td-navbar .dropdown-menu > li > a');

    $(subMenuLinks).bind('keydown', function (event) {
      const navItem = $(this).closest(".nav-item");
      const prevNavItem = $(navItem).prev();
      const nextNavItem = $(navItem).next();
      console.log("I am here")
      // if it's tabbing backward
      if (event.shiftKey && event.key.toUpperCase() === "TAB") {

        // if it's a first item in submenu
        if (!$(prevNavItem).length) {
          $(navItem).parent().closest(".nav-item").removeClass("submenu-open");
          return;
        }

        // if it's an item wiith submenu
        if ($(prevNavItem).hasClass("has-children")) {
          $(prevNavItem).addClass("submenu-open");
          return;
        }

        // if it's an item without submenu
        if (!$(prevNavItem).hasClass("has-children")) {
          $(navItem).parent("ul").find("li.has-children").removeClass("submenu-open");
          return;
        }

      // if it's tabbing forward
      } else if (event.key.toUpperCase() === "TAB") {
        // if current item has submenu
        console.log("I am in tab");
        if ($(navItem).hasClass("has-children")) {
          console.log("I am here has children");
          $(navItem).addClass("submenu-open");
          return;
        }

        // if next item is none
        if ($(nextNavItem).length === 0) {
          console.log("I am in here 2");
          closeSubmenu(navItem);
          return;
        }
      }
    });
  })

  // Show or hide mobile menu
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

  // Remove mobile menu after breakpoint in window.width
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

  // Open mobile submenu on click
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
