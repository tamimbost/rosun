(function ($, window) {
  "use strict";
  $(window).on('load', function () {
    // Fade out the overlay when the page has loaded
    $(".site-preloader").delay(0).fadeOut(1000, function () {
        $(this).removeClass('active').addClass('hidden');
    });
});

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
});

  var mtJs = {
    m: function () {
      mtJs.d();
      mtJs.methods();
    },
    d: function () {
      this._window = $(window);
      this._document = $(document);
      this._body = $("body");
      this._html = $("html");
    },
    methods: function () {
      this.niceSelectActivation();
      this.inlineCssActivation();
      this.headerSticky();
      this.swiperActivation();
      this.mobileMenuActivation();
      this.adToCardSitebar();
      this.adToCardSitebarActivation();
      this.countDownActivation();
      this.productCounter();
      this.counterUpActivation();
      this.menualePriceInputRange();
      this.autoPriceRangeBar();
      this.ratingChecked();
      this.productDetailsZoom();
      this.faqActivation();
      this.eyeActivation();
      this.topToScroll();
      this.siteOpenNewspopup();
    },
    
    // Start Top To Scroll 
    topToScroll: function (){
      $(document).ready(function (){
        var scrollPath = document.querySelector(".scroll-up path");
        var pathLength = scrollPath.getTotalLength();
        scrollPath.style.transition = scrollPath.style.WebkitTransition = "none";
        scrollPath.style.strokeDasharray = pathLength + " " + pathLength;
        scrollPath.style.strokeDashoffset = pathLength;
        scrollPath.getBoundingClientRect();
        scrollPath.style.transition = scrollPath.style.WebkitTransition =
          "stroke-dashoffset 10ms linear";
        var updatescroll = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          var scroll = pathLength - (scroll * pathLength) / height;
          scrollPath.style.strokeDashoffset = scroll;
        };
        updatescroll();
        $(window).scroll(updatescroll);
        var offset = 50;
        var duration = 950;
        jQuery(window).on("scroll", function () {
          if (jQuery(this).scrollTop() > offset) {
            jQuery(".scroll-up").addClass("active-scroll");
          } else {
            jQuery(".scroll-up").removeClass("active-scroll");
          }
        });
        jQuery(".scroll-up").on("click", function (event) {
          event.preventDefault();
          jQuery("html, body").animate(
            {
              scrollTop: 0,
            },
            duration
          );
          return false;
        });
      });
    },
    // End Top To Scroll

    // Start Categoriey Bar Hide Show
    headerSticky: function () {
      $(document).ready(function () {
        const $headerCategory = $('.mt__hero-category-bar');
        const $allCategoriesButton = $('.mt__header-category'); // Assuming this is the "All Categories" button
        let isHeaderSticky = false;
    
        // Function to handle category visibility based on screen width
        function checkCategoryVisibility() {
          const windowWidth = $(window).width();
          if (windowWidth <= 1299) {
            // Force hide the category bar without animation if the window width is less than 1299px
            $headerCategory.hide();
          } else {
            // Otherwise, ensure category bar is visible
            $headerCategory.show();
          }
        }
    
        // Initial check when the document is ready
        checkCategoryVisibility();
    
        // Check category visibility on window resize
        $(window).resize(function () {
          checkCategoryVisibility();
        });
    
        // Check sticky header state on scroll
        $(window).on("scroll", function () {
          const ScrollBarPostion = $(window).scrollTop();
    
          // Add sticky class when scroll position > 150px
          if (ScrollBarPostion > 150) {
            $(".mt__header-adding-stikcy-menu-1, .mt__header-adding-stikcy-menu-2, .mt__hero-category-bar")
              .addClass("mt__header-sticky");
            isHeaderSticky = true;
    
            // Hide the category bar when header becomes sticky
            if ($(window).width() > 1299) { // Only animate hide on larger screens
              $headerCategory.stop().slideUp(500);
            } else {
              $headerCategory.hide(); // Force hide when small screen
            }
          } else {
            $(".mt__header-adding-stikcy-menu-1, .mt__header-adding-stikcy-menu-2, .mt__hero-category-bar")
              .removeClass("mt__header-sticky");
            isHeaderSticky = false;
    
            // Show the category bar when header is no longer sticky
            if ($(window).width() > 1299) { // Only animate show on larger screens
              $headerCategory.stop().slideDown(500);
            } else {
              $headerCategory.show(); // Force show on small screens
            }
          }
        });
    
        // Show category bar when hovering over "All Categories" in sticky state
        $allCategoriesButton.hover(
          function () {
            if (isHeaderSticky && $(window).width() > 1299) {
              $headerCategory.stop().slideDown(500); // Show the category bar
            }
          },
          function () {
            if (isHeaderSticky && $(window).width() > 1299) {
              $headerCategory.stop().slideUp(500); // Hide the category bar when mouse leaves
            }
          }
        );
    
        // Optional: Hide category bar when mouse leaves the category list itself
        $headerCategory.mouseleave(function () {
          if (isHeaderSticky && $(window).width() > 1299) {
            $headerCategory.stop().slideUp(500); // Hide when mouse leaves the category area
          }
        });
      });
    },
    

    // Start Password Hide Show
    eyeActivation: function (){
      $(document).ready(function() {
        $('.mt__toggle-password').on('click', function() {
            const passwordInput = $('#mt__password');
            const eyeIcon = $('.mt__eye-icon');
            const eyeSlashIcon = $('.mt__eye-slash-icon');
            
            if (passwordInput.attr('type') === 'password') {
                passwordInput.attr('type', 'text');
                eyeIcon.hide();
                eyeSlashIcon.show();
            } else {
                passwordInput.attr('type', 'password');
                eyeIcon.show();
                eyeSlashIcon.hide();
            }
        });
    });
    },
    // End Password Hide Show

    // Start Faq Area
    faqActivation: function (){
      $(document).ready(function(){
        let question = document.querySelectorAll(".mt__question");

        question.forEach(question => {
            question.addEventListener("click", event => {
                const active = document.querySelector(".mt__question.mt__active");
                if(active && active !== question ) {
                    active.classList.toggle("mt__active");
                    active.nextElementSibling.style.maxHeight = 0;
                }
                question.classList.toggle("mt__active");
                const answer = question.nextElementSibling;
                if(question.classList.contains("mt__active")){
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = 0;
                }
            })
        })
      });
    },
    // End Faq Area

    // Start Product Detalis Zoom
    productDetailsZoom: function (){
      $(document).ready(function(){
        $('.mt__main-product-img-item').mousemove(function(event) {
            var $image = $(this).find('img'); 
            var imgWidth = $image.width();     
            var imgHeight = $image.height();
            var containerWidth = $(this).width();
            var containerHeight = $(this).height();
            var offsetX = event.pageX - $(this).offset().left;
            var offsetY = event.pageY - $(this).offset().top;
            var percentageX = (offsetX / containerWidth) * 100;
            var percentageY = (offsetY / containerHeight) * 100;
            $image.css({
                'transform-origin': `${percentageX}% ${percentageY}%`,
                'transform': 'scale(2)'
            });
        }).mouseleave(function() {
            $(this).find('img').css({
                'transform': 'scale(1)', 
                'transform-origin': 'center'
            });
        });
    });
    },
    // End Product Detlis zoom

    // Start Rating Checked
    ratingChecked: function (){
      $(document).ready(function(){
        const ratingCheckboxes = document.querySelectorAll('#mt__ratings input[type="checkbox"]');
        ratingCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    ratingCheckboxes.forEach(cb => {
                        if (cb !== this) cb.checked = false;
                    });
                }
                console.log(this.id + " is " + (this.checked ? "checked" : "unchecked"));
            });
        });
      });
    },
    // End Rating Checked

    // Start Price Range Bar
    autoPriceRangeBar: function (){
      $(document).ready(function (){
        const minRange = $('#min-range');
        const maxRange = $('#max-range');
        const minPrice = $('#min-price');
        const maxPrice = $('#max-price');
        function updateRange() {
            const minValue = parseInt(minRange.val());
            const maxValue = parseInt(maxRange.val());
            minPrice.text(`$${minValue}.00`);
            maxPrice.text(`$${maxValue}.00`);
            const percentageMin = ((minValue - 19) / (140 - 19)) * 100;
            const percentageMax = ((maxValue - 19) / (140 - 19)) * 100;
            minRange.next('.range').css('background', 
                `linear-gradient(to right, #ddd ${percentageMin}%, #f5b200 ${percentageMin}%, #f5b200 ${percentageMax}%, #ddd ${percentageMax}%)`);
        }
        minRange.on('input', function () {
            if (parseInt(minRange.val()) > parseInt(maxRange.val()) - 1) {
                minRange.val(parseInt(maxRange.val()) - 1);
            }
            updateRange();
        });
        maxRange.on('input', function () {
            if (parseInt(maxRange.val()) < parseInt(minRange.val()) + 1) {
                maxRange.val(parseInt(minRange.val()) + 1);
            }
            updateRange();
        });
        updateRange();
      })
    },
    // End Price Range Bar

    // Start Menualy Price Range
    menualePriceInputRange: function (){
      $(document).ready(function () {
        function formatCurrency(input) {
            let value = $(input).val().replace(/[^0-9]/g, ''); 
            if (value) {
                $(input).val(`$${parseInt(value, 10)}`);
            } else {
                $(input).val('');
            }
        }
        $('#mt__min-price, #mt__max-price').on('input', function () {
            formatCurrency(this);
        });
    });
    
    },
    // End Menualy Price Range

    // Start Counter Up 
    counterUpActivation: function (){
      $(document).ready(function (){
        $('.mt__counter').counterUp({
          delay: 10,
          time: 1000
      });
      });
    },
    // End Counter Up

    // Start Product Counter
    productCounter: function () {
      $(document).ready(function () {
        $(".counter-container").each(function () {
          const $counter = $(this).find(".counters");
          const $increaseBtn = $(this).find(".increase");
          const $decreaseBtn = $(this).find(".decrease"); 
          let count = parseInt($counter.val(), 10) || 0; 
          function updateCounter(value) {
            $counter.val(value < 10 ? `0${value}` : value);
          }
          updateCounter(count);
          $increaseBtn.on("click", function () {
            count++;
            updateCounter(count);
          });
          $decreaseBtn.on("click", function () {
            if (count > 0) {
              count--;
              updateCounter(count);
            }
          });
          $counter.on("input", function () {
            let value = parseInt($counter.val(), 10);
            if (isNaN(value) || value < 0) {
              count = 0;
            } else {
              count = value;
            }
            updateCounter(count);
          });
          $counter.on("blur", function () {
            updateCounter(count);
          });
        });
      });
    },
    // End Product Counter

    // Start Count Down
    countDownActivation: function () {
      $(document).ready(function () {
        function formatNumber(num) {
          return num < 10 ? "0" + num : num;
        }
        $(".countdown").each(function () {
          var $countdown = $(this);
          var targetDate = $countdown.data("target-date");
          var countdownDate = new Date(targetDate).getTime();
          var countdownInterval = setInterval(function () {
            var now = new Date().getTime();
            var timeRemaining = countdownDate - now;
            var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            var hours = Math.floor(
              (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            var minutes = Math.floor(
              (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
            );
            var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            days = formatNumber(days);
            hours = formatNumber(hours);
            minutes = formatNumber(minutes);
            seconds = formatNumber(seconds);
            $countdown.find(".days").text(days);
            $countdown.find(".hours").text(hours);
            $countdown.find(".minutes").text(minutes);
            $countdown.find(".seconds").text(seconds);
            if (timeRemaining < 0) {
              clearInterval(countdownInterval);
              $countdown.find(".days").text("00");
              $countdown.find(".hours").text("00");
              $countdown.find(".minutes").text("00");
              $countdown.find(".seconds").text("00");
            }
          }, 1000);
        });
      });
    },
    // End Count Down

    // Start Ad To Card Sitebar Aactivation
    adToCardSitebarActivation: function () {
      $(document).ready(function () {
        $(".mt__add-to-card-show").on("click", function () {
          $(".cart-container").addClass("mt__card-container-active");
          $(".mt__overlay").addClass("active"); 
          $("body").addClass("no-scroll"); 
        });
        $(".mt__mobile-menu-close-btn > a, .mt__overlay").on(
          "click",
          function () {
            $(".cart-container").removeClass("mt__card-container-active");
            $(".mt__overlay").removeClass("active"); 
            $("body").removeClass("no-scroll"); 
          }
        );
      });
    },
    // End Ad To Card Sitebar Aactivation

    // Start Ad To Card Sitebar
    adToCardSitebar: function () {
      $(document).ready(function () {
        $(".remove-btn").on("click", function () {
          const cartItem = $(this).closest(".cart-item");
          cartItem.remove();
          updateTotal();
        });
        $(".quantity-btn").on("click", function () {
          const quantitySpan = $(this).siblings("span");
          let quantity = parseInt(quantitySpan.text());

          if ($(this).text() === "+") {
            quantity++; 
          } else if ($(this).text() === "-" && quantity > 1) {
            quantity--;
          }
          quantitySpan.text(quantity); 
          updateTotal(); 
        });

        function updateTotal() {
          let total = 0;
          $(".cart-item").each(function () {
            const price = parseFloat(
              $(this).find(".item-price").text().replace("$", "")
            );
            const quantity = parseInt(
              $(this).find(".item-quantity span").text()
            );
            total += price * quantity;
          });
          $(".total").text(`TOTAL: $${total.toFixed(2)}`);
        }
        function checkCartEmpty() {
          if ($(".cart-item").length === 0) {
            $(".cart-container").html(
              '<h3 class="empty-message">Your cart is empty.</h3>'
            );
            $(".empty-message").css({
              "color": "#fff", 
              "font-size": "24px", 
              "text-align": "center", 
              "margin-top": "20px", 
              "font-weight": "700",
            });
          }
        }

        $(".remove-btn").on("click", function () {
          checkCartEmpty();
        });
      });
    },
    // End Ad To Card Sitebar

    // Start Mobile Menu Activation
    mobileMenuActivation: function () {
      $(document).ready(function () {
        $(".mt__mobile-sub-menu-inner a").on("click", function (e) {
          if ($(this).next(".mt__mobile-sub-menu").length > 0) {
            e.preventDefault(); 
            $(".mt__mobile-sub-menu").not($(this).next()).slideUp();
            $(".mt__mobile-menu-icon")
              .not($(this).find(".mt__mobile-menu-icon"))
              .removeClass("rotate"); 
            $(this).next(".mt__mobile-sub-menu").slideToggle();
            $(this).find(".mt__mobile-menu-icon").toggleClass("rotate"); 
          }
        });
    
        // Mobile menu open
        $(".mt__mobilemenu-bar").on("click", function () {
          $(".mt__mobile-menu").addClass("mt__mobile-menu-active");
          $(".mt__overlay").addClass("active"); 
          $("body").addClass("no-scroll"); 
        });
    
        $(".mt__mobile-menu-close-btn > a, .mt__overlay").on(
          "click",
          function () {
            $(".mt__mobile-menu").removeClass("mt__mobile-menu-active");
            $(".mt__overlay").removeClass("active");
            $("body").removeClass("no-scroll");
          }
        );
      });
    },
    
    // End Mobile Menu Activation

    // Start Swiper Slide Activation
    swiperActivation: function () {
      // Start Hero Home 1 Slider
      $(document).ready(function () {
        var swiper = new Swiper(".home-1-hero", {
          slidesPerView: 1,
          loop: true,
          effect: "fade",
          autoplay: {
            delay: 3000,
          },
          pagination: {
            el: ".swiper-pagination1",
            clickable: true,
          },
        });
      });
      // End Hero Home 1 Slider

      // Start Shop By Categories Home 1
      $(document).ready(function () {
        var swiper = new Swiper(".mt__shop-by-categories-home-one", {
          slidesPerView: 10,
          spaceBetween: 25,
          breakpoints: {
            1781: {
              slidesPerView: 10,
            },
            1780: {
              slidesPerView: 7,
            },
            1600: {
              slidesPerView: 6,
            },
            1300: {
              slidesPerView: 6,
            },
            991: {
              slidesPerView: 5,
            },
            888: {
              slidesPerView: 4,
            },
            767: {
              slidesPerView: 4,
            },
            575: {
              slidesPerView: 3,
            },
            439: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 2,
            },
          },
          navigation: {
            nextEl: ".mt__shop-by-categories-swiper-button-prev-home-one",
            prevEl: ".mt__shop-by-categories-swiper-button-next-home-one",
          },
        });
      });
      // End Shop By Categories Home 1

            // Start Shop By Categories Home 2
            $(document).ready(function () {
              var swiper = new Swiper(".mt__shop-by-categories-home-two", {
                slidesPerView: 5,
                spaceBetween: 10,
                breakpoints: {
                  1920: {
                    slidesPerView: 5
                  },
                  1099:{
                    slidesPerView:4
                  },
                  991:{
                    slidesPerView:3
                  },
                  767:{
                    slidesPerView:2
                  },
                  575:{
                    slidesPerView:2
                  },
                  0:{
                    slidesPerView:1
                  }

                },
                navigation: {
                  nextEl: ".mt__shop-by-categories-swiper-button-prev-home-two",
                  prevEl: ".mt__shop-by-categories-swiper-button-next-home-two",
                },
              });
            });
            // End Shop By Categories Home 2

      // Start Feature Product Home 1
      $(document).ready(function () {
        var swiper = new Swiper(".mt__feature-product-home-two", {
          slidesPerView: 5,
          spaceBetween: 16,
          breakpoints: {
            1781: {
              slidesPerView: 5,
            },
            1199: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          },
          navigation: {
            nextEl: ".mt__feature-product-swiper-button-prev-home-one",
            prevEl: ".mt__feature-product-swiper-button-next-home-one",
          },
        });
      });
      // End Feature Product  Home 1

      // Start Flash Sell Product Home 1
      $(document).ready(function () {
        var swiper = new Swiper(".mt__flash-sell-product-home-one", {
          slidesPerView: 7,
          spaceBetween: 25,
          breakpoints: {
            1499: {
              slidesPerView: 6,
            },
            1299: {
              slidesPerView: 5,
            },
            992: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            320: {
              slidesPerView: 1,
            },
            0:{
              slidesPerView:0,
            }
          },
          navigation: {
            nextEl: ".mt__flash-sell-product-swiper-button-prev-home-one",
            prevEl: ".mt__flash-sell-product-swiper-button-next-home-one",
          },
        });
      });

      // Start Top Selling Product Home 1
      $(document).ready(function () {
        var swiper = new Swiper(".mt__top-selling-item-home-one", {
          slidesPerView: 4,
          spaceBetween: 16,
          breakpoints: {
            1920: {
              slidesPerView: 4,
            },
            1399: {
              slidesPerView: 3,
            },
            1099: {
              slidesPerView: 2,
            },
            840: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            },
          },
          navigation: {
            nextEl: ".mt__top-selling-product-swiper-button-prev-home-one",
            prevEl: ".mt__top-selling-product-swiper-button-next-home-one",
          },
        });
      });
      // End Top Selling Product Home 1

      // Start Flash Sale Product Home 1
      $(document).ready(function () {
        var swiper = new Swiper(".mt__top-selling-item-home-two", {
          slidesPerView: 4,
          spaceBetween: 16,
          breakpoints: {
            1920: {
              slidesPerView: 4,
            },
            1399: {
              slidesPerView: 3,
            },
            1100:{
              slidesPerView:3,
            },
            1099: {
              slidesPerView: 3,
            },
            992:{
              slidesPerView:3,
            },
            991:{
              slidesPerView:2,
            },
            768:{
              slidesPerView:2,
            },
            767:{
              slidesPerView:1
            }, 
            0: {
              slidesPerView: 1,
            },
          },
          navigation: {
            nextEl: ".mt__top-selling-product-swiper-button-prev-home-two",
            prevEl: ".mt__top-selling-product-swiper-button-next-home-two",
          },
        });
      });
      // End Flash Sale  Product Home 1

      // Start Testimonial Slider Home 1
      $(document).ready(function () {
        var swiper = new Swiper(".mt__testimonial-home-one", {
          slidesPerView: 1,
          loop: true,
          navigation: {
            nextEl: ".mt__testmonial-swiper-button-prev-home-one",
            prevEl: ".mt__testmonial-swiper-button-next-home-one",
          },
        });
      });
      // End Testimonial Slider Home 1

      // Start Blog Slider Home 1
      $(document).ready(function () {
        var swiper = new Swiper(".mt__blog-slider-home-one", {
          slidesPerView: 4,
          spaceBetween: 25,
          loop: true,
          breakpoints: {
            1920: {
              slidesPerView: 4,
            },
            1350: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 2,
            },
            776: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            },
          },
          navigation: {
            nextEl: ".mt__blog-swiper-button-prev-home-one",
            prevEl: ".mt__blog-swiper-button-next-home-one",
          },
        });
      });
      // End Blog Slider Home 1

      // Start Popular Product Home 2
      $(document).ready(function () {
              var swiper = new Swiper(".mt__popular-product-home-two", {
                slidesPerView: 5,
                spaceBetween: 20,
                loop: true,
                breakpoints: {
                  1920: {
                    slidesPerView: 5,
                  },
                  1299: {
                    slidesPerView: 3,
                  },
                  1099: {
                    slidesPerView: 3,
                  },
                  991: {
                    slidesPerView: 3,
                  },

                  767:{
                    slidesPerView:2,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                },
                navigation: {
                  nextEl: ".mt__popular-product-swiper-button-prev-home-two",
                  prevEl: ".mt__popular-product-swiper-button-next-home-two",
                },
              });
      });
      // End Popular Product 2

      // Start Deals Day Home 2
      $(document).ready(function () {
        var swiper = new Swiper(".mt__deals-day-home-two", {
          slidesPerView: 5,
          spaceBetween: 20,
          loop: true,
          breakpoints: {
            1920: {
              slidesPerView: 5,
            },
            1399: {
              slidesPerView: 4,
            },
            1099: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 3,
            },
            850:{
              slidesPerView:2,
            },
            575: {
              slidesPerView: 1,
            },
            0:{
              slidesPerView:1,
            }
          },
          navigation: {
            nextEl: ".mt__deals-day-swiper-button-prev-home-two",
            prevEl: ".mt__deals-day-swiper-button-next-home-two",
          },
        });
      });
      // End Deals Day Home 2

      // Start Weekly Hot Deal Home 2
      $(document).ready(function () {
        var swiper = new Swiper(".mt__weekly-hot-dealis-home-two", {
          slidesPerView: 4,
          loop: true,
          breakpoints: {
            1920: {
              slidesPerView: 4,
            },
            1699: {
              slidesPerView: 3,
            },
            1499: {
              slidesPerView: 3,
            },
            1299:{
              slidesPerView:2,
            },
            992:{
              slidesPerView:2,
            },
            991: {
              slidesPerView: 1,
            },
            0:{
              slidesPerView:1,
            }
          },
          navigation: {
            nextEl: ".mt__deals-day-swiper-button-next-home-two",
            prevEl: ".mt__deals-day-swiper-button-prev-home-two",
          },
        });
      });
      // End Weekly Hot Deal Home 2

      // Stat Blog Area Home 2
      $(document).ready(function () {
        var swiper = new Swiper(".mt__blog-home-two", {
          slidesPerView: 4,
          spaceBetween: 25,
          loop: true,
          breakpoints: {
            1920: {
              slidesPerView: 4,
            },
            1199: {
              slidesPerView: 3,
            },
            1099: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 3,
            },
            767:{
              slidesPerView:2,
            },
            575: {
              slidesPerView: 1,
            },
            0:{
              slidesPerView:1,
            }
          },
          navigation: {
            nextEl: ".mt__blog-swiper-button-prev-home-two",
            prevEl: ".mt__blog-swiper-button-next-home-two",
          },
        });
      });
      // End Blog Area Home 2

      // Start Product Details Slider
      $(document).ready(function () {
        var swiper = new Swiper(".mt__product-details-item-inner", {
          slidesPerView: 1,
          loop: true,
          navigation: {
            nextEl: ".mt__blog-swiper-button-prev-home-two",
            prevEl: ".mt__blog-swiper-button-next-home-two",
          },
        });
      });
      // End Product Details Slider



      // Start Team Slider About Inner
      $(document).ready(function () {
        var swiper = new Swiper(".mt__team-about-inner", {
          slidesPerView: 4,
          spaceBetween: 25,
          loop: true,
          breakpoints: {
            1920: {
              slidesPerView: 4,
            },
            1099: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 3,
            },
            767:{
              slidesPerView:2,
            },

            575: {
              slidesPerView: 2,
            },
            0:{
              slidesPerView:1,
            }
          },
          navigation: {
            nextEl: ".mt__team-swiper-button-prev-about-inner",
            prevEl: ".mt__team-swiper-button-next-about-inner",
          },
        });
      });
      // End Team Slider About Inner


      // Start Testimonial Area Home 2
      $(document).ready(function () {
        var swiper = new Swiper(".mt__testimonial-home-two", {
          slidesPerView: 3,
          spaceBetween: 25,
          loop: true,
          breakpoints: {
            1920: {
              slidesPerView: 3,
            },
            1099: {
              slidesPerView: 2,
            },
            767:{
              slidesPerView:1,
            },
            0:{
              slidesPerView:1,
            }
          },
          navigation: {
            nextEl: ".mt__testimonial-swiper-button-prev-home-two",
            prevEl: ".mt__testimonial-swiper-button-next-home-two",
          },
        });
      });
      // End Testimonial Area Home 2

      // Start Inner Cart
      $(document).ready(function () {
        var swiper = new Swiper(".mt__cart-inner-all-page", {
          slidesPerView: 5,
          spaceBetween: 16,
          loop: true,
          breakpoints: {
            1299: {
              slidesPerView: 4,
            },
            1099: {
              slidesPerView: 4,
            },
            991:{
              slidesPerView:3,
            },
            767:{
              slidesPerView:2,
            },
            575:{
              slidesPerView:2,
            },
            0:{
              slidesPerView:1,
            }
          },
          navigation: {
            nextEl: ".mt__inner-proudct-swiper-button-prev-home-one",
            prevEl: ".mt__inner-product-swiper-button-next-home-one",
          },
        });
      });
      // End Inner Cart 

    },
    // End Swiper Slide Activation

    // Start Inline Css Activation
    inlineCssActivation: function () {
      $(document).ready(function () {
        $("[data-background]").each(function () {
          $(this).css(
            "background-image",
            "url( " + $(this).attr("data-background") + "  )"
          );
        });
      });
    },
    // End Inline Css Activation

    // Start News Latter Popup
    siteOpenNewspopup: function () {
      $(document).ready(function () {
        function showpanel() {
          $(".mt__newslatter-popup-overlay").addClass("active");
          $(".mt__newsletter-popup").addClass("popup");
        }
        setTimeout(showpanel, 4000)
      });
    
      $(".mt__newslatter-popup-overlay").on('click', function () {
        $(".mt__newsletter-popup").removeClass("popup")
        $(".mt__newslatter-popup-overlay").removeClass("active")
      });
      $(".newsletter-close-btn").on('click', function () {
        $(".mt__newsletter-popup").removeClass("popup")
        $(".mt__newslatter-popup-overlay").removeClass("active")
      });
    },
    // End News Latter Popup

    // Start Nice Select Activation
    niceSelectActivation: function () {
      $(document).ready(function () {
        $(".mt__header-top-select1").niceSelect();
      });
    },
    // End Nice Select Activation
  };

  mtJs.m();
})(jQuery, window);
