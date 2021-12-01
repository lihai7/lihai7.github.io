"use strict";
$(function () {
  /*---Прелоадер---*/
  var preloader = (function () {
    var persentTotal = 0;
    var preloader = $(".preloader");

    var imgPath = $("*").map(function (index, element) {
      var background = $(element).css("background-image");
      var img = $(element).is("img");
      var path = "";

      if (background != "none") {
        if (background.indexOf("url") != -1) {
          path = background.replace('url("', "").replace('")', "");
        }
      }

      if (img) {
        path = $(element).attr("src");
      }

      if (path) return path;
    });

    var setPersents = function (total, current) {
      var persents = Math.ceil((current / total) * 100);
      var strokeDasharray = parseInt(
        $(".preloader__circle circle").css("stroke-dasharray")
      );

      $(".preloader__circle circle").css(
        {
          "stroke-dashoffset":
            strokeDasharray - (persents * strokeDasharray) / 100,
        },
        100
      );

      if (persents >= 100) {
        setTimeout(function () {
          // Действие после загрузки
          preloader.fadeOut();
        }, 500);
      }
    };

    var loadImages = function (images) {
      if (!images.length) preloader.fadeOut();

      images.forEach(function (img, i, images) {
        var fakeImage = $("<img>", {
          attr: {
            src: img,
          },
        });

        fakeImage.on("load", function () {
          persentTotal++;
          setPersents(images.length, persentTotal);
        });
      });
    };

    return {
      init: function () {
        var imgs = imgPath.toArray();

        loadImages(imgs);
      },
    };
  })();

  preloader.init();
});

window.App = {
  W: $(window),
  D: $(document),
  H: $("html"),
  B: $("body"),
  ie: false,
  edge: false,
  firefox: false,
  mainpage: false,
};

var ua = window.navigator.userAgent.toLowerCase(),
  is_ie = /trident/gi.test(ua) || /msie/gi.test(ua);

function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  }
  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  var scrollFadeIn = document.querySelectorAll(".js-scroll-fade-in");

  var options = {
    threshold: 0.3,
  };

  // if (isMobile()) {
  //   options.threshold = 0.1
  // }

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];

      var lazyBlock = entry.target;
      if (entry.isIntersecting) {
        lazyBlock.classList.add("visible");
        observer.unobserve(lazyBlock);
      }
    }
  }, options);

  for (var i = 0; i < scrollFadeIn.length; i++) {
    var element = scrollFadeIn[i];

    observer.observe(element);
  }
});

$(".parallax-window").parallax({
  speed: 0.9,
});

// Sticky header
// $(function() {

//   var header = $(".js-sticky-header"); // Меню

//   var clone = header.clone();
//   clone.addClass('js-sticky-header_sticky');
//   $('body').prepend(clone);

// 	var scrollPrev = 0 // Предыдущее значение скролла

// 	$(window).scroll(function() {

// 		var scrolled = $(window).scrollTop(); // Высота скролла в px
// 		var firstScrollUp = false; // Параметр начала сколла вверх
// 		var firstScrollDown = false; // Параметр начала сколла вниз

// 		// Если скроллим
// 		if ( scrolled > 800 ) {

//       if (!is_ie) {
//         // Если текущее значение скролла > предыдущего, т.е. скроллим вниз
//         if ( scrolled > scrollPrev ) {
//           firstScrollUp = false; // Обнуляем параметр начала скролла вверх
//           // Если меню видно
//           if ( scrolled < clone.height() + clone.offset().top) {
//             // Если только начали скроллить вниз
//             if ( firstScrollDown === false ) {
//               clone.css({
//                 "opacity": "0",
//                 "pointer-events": "none"
//               });
//               firstScrollDown = true;
//             }
//           // Если меню НЕ видно
//           } else {
//             clone.css({
//               "opacity": "1",
//               "pointer-events": "auto"
//             });
//           }

//         // Если текущее значение скролла < предыдущего, т.е. скроллим вверх
//         } else {
//           firstScrollDown = false; // Обнуляем параметр начала скролла вниз
//           // Если меню не видно
//           if ( scrolled > clone.offset().top ) {

//             // Если только начали скроллить вверх
//             if ( firstScrollUp === false ) {

//               clone.css({
//                 "opacity": "0",
//                 "pointer-events": "none"
//               });
//               firstScrollUp = true;
//             }
//           } else {
//             clone.css({
//               "opacity": "1",
//               "pointer-events": "auto"
//             });
//           }
//         }
//         // Присваеваем текущее значение скролла предыдущему
//         scrollPrev = scrolled;
//       } else {
//         clone.css({
//           "opacity": "1",
//           "pointer-events": "auto"
//         });
//       }

// 		} else {
//       clone.css({
//         "opacity": "0",
//         "pointer-events": "none"
//       });
//     }

// 	});

// });

$(function () {
  $(".scrollbar-outer").scrollbar();

  $(".js-modal-btn").modalVideo();

  // Go to
  function goTo(e) {
    e.preventDefault();
    var hash = $(this).attr("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        "swing"
      );

    $(".burger").removeClass("burger_is-active");

    $(".nav-menu").removeClass("nav-menu_is-active");
  }
  $(".js-go-to").on("click", goTo);

  // Burger
  $(".burger").on("click", function (e) {
    e.preventDefault();

    $(this).toggleClass("burger_is-active");

    $(".nav-menu").toggleClass("nav-menu_is-active");
  });
});

// Sliders
$(function () {
  var formatSlider = new Swiper(".format-slider", {
    slidesPerView: "1",
    spaceBetween: 100,
    loop: true,
    navigation: {
      nextEl: ".format-slider__controllers .format-slider__controll_next",
      prevEl: ".format-slider__controllers .format-slider__controll_prev",
    },
    breakpoints: {
      1200: {
        spaceBetween: 30,
      },
    },
  });

  var videosSlider = new Swiper(".videos-slider", {
    slidesPerView: "auto",
    spaceBetween: 70,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".videos__controllers .format-slider__controll_next",
      prevEl: ".videos__controllers .format-slider__controll_prev",
    },
    breakpoints: {
      1200: {
        spaceBetween: 30,
      },
    },
  });

  var partnersList = new Swiper(".partners-list", {
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    mousewheel: true,
    breakpoints: {
      1000: {
        direction: "horizontal",
        freeMode: false,
      },
    },
  });

  var partnersText = new Swiper(".partners-text", {
    thumbs: {
      swiper: partnersList,
    },
    breakpoints: {
      1000: {
        spaceBetween: 30,
      },
    },
  });

  function removeTransformNoe() {
    if ($(window).width() <= 1000) {
      $(".partners-text .swiper-wrapper").removeClass("transform-none");
    } else {
      $(".partners-text .swiper-wrapper").addClass("transform-none");
    }
  }

  removeTransformNoe();

  $(window).on("resize", removeTransformNoe);

  document.addEventListener(
    "wheel",
    function (e) {
      var target = e.target;

      if (!$(target).parents(".swiper-container").hasClass("partners-list"))
        return;
      var area = target;

      var delta = e.deltaY || e.detail || e.wheelDelta;

      if (delta < 0 && area.scrollTop == 0) {
        e.preventDefault();
      }

      if (
        delta > 0 &&
        area.scrollHeight - area.clientHeight - area.scrollTop <= 1
      ) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  $(".format-tab__item").on("click", function (e) {
    e.preventDefault();

    $(".format-tab__item_is-active").removeClass("format-tab__item_is-active");

    $(this).addClass("format-tab__item_is-active");
    var indexActiveElem = $(this).parent(".tabs li").index();

    $(".tab-content").each(function (index, item) {
      $(item).removeClass("tab-content_is-active");
    });

    var nextElem =
      $(".contents-for-tabs").find(".tab-content")[indexActiveElem];
    $(nextElem).addClass("tab-content_is-active");
  });
});

// accordion
$(function () {
  $(".accordion__heading-item").on("click", function () {
    $(this).toggleClass("accordion__heading-item_is-active");
    var parent = $(this).parents(".accordion__item");
    var info = $(parent).find(".accordion__info");
    var animateTime = 300;

    if ($(info).height() === 0) {
      autoHeightAnimate($(info), animateTime);
    } else {
      $(info).stop().animate({ height: "0" }, animateTime);
    }
  });

  function autoHeightAnimate(element, time) {
    var curHeight = element.height();
    var autoHeight = element.css("height", "auto").outerHeight();

    element.height(curHeight);
    element.stop().animate({ height: autoHeight }, parseInt(time));
  }
});

// Number
$(function () {
  var target_block = $(".join__fifteen"); // Ищем блок
  var blockStatus = true;

  $(window).scroll(function () {
    var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
    // var e_top = target_block.offset().top; // Расстояние от блока со счетчиками до верха всего документа
    var w_height = $(window).height(); // Высота окна браузера
    var d_height = $(document).height(); // Высота всего документа
    var e_height = target_block.outerHeight(); // Полная высота блока со счетчиками

    var scrollEvent =
      w_height + w_top == d_height

    if (scrollEvent && blockStatus) {
      $(".join__value").css("opacity", "1");
      $(".join__dots .join__dot").each(function (index, dot) {
        setTimeout(function () {
          $(dot).css("opacity", "1");
        }, index * 250);
      });
      blockStatus = false; // Запрещаем повторное выполнение функции до следующей перезагрузки страницы.

      $({ numberValue: 0 }).animate(
        { numberValue: 15 },
        {
          duration: 3000, // Продолжительность анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд
          easing: "linear",

          step: function (val) {
            $(".join__fifteen").html(Math.ceil(val)); // Блок, где необходимо сделать анимацию
          },
        }
      );
    }
  });
});

function elementActive(element) {
  element.next().css({
    top: "-10%",
    left: 0,
    fontSize: "12px",
    color: "#B4B4B4",
  });
  element.css({
    borderBottom: "1px solid #AD86FF",
  });
}

function elementDisactive(element) {
  element.next().css({
    top: "50%",
    left: "26px",
    fontSize: "14px",
    color: "#40444E",
  });
  element.css({
    borderBottom: "1px solid #EFEFEF",
  });
}

function scrollbarWidth() {
  var block = $("<div>").css({ height: "50px", width: "50px" }),
    indicator = $("<div>").css({ height: "200px" });

  $("body").append(block.append(indicator));
  var w1 = $("div", block).innerWidth();
  block.css("overflow-y", "scroll");
  var w2 = $("div", block).innerWidth();
  $(block).remove();
  return w1 - w2;
}

// Input focus
// $(function() {

//   var input = $('.form__input');

//   input.on('focus', function() {
//       elementActive(input);

//       if (input.attr('type') === 'tel') {
//         input.attr('placeholder', '+7 (...');
//       }
//     });

//     input.on('focusout', function() {
//       if (!input.val().length) {
//         elementDisactive(input);
//       }

//       if (input.attr('type') === 'tel') {
//         input.attr('placeholder', '');
//       }
//     });

//     input.on('change', function() {
//       if (element.val().length) {
//         elementActive(input)
//       } else {
//         elementDisactive(input)
//       }
//     });

// });

// Pop up
$(function () {
  var popUp = $(".feedback-pop-up");
  var bodyElem = $("body");

  $(".js-open-pop-up").on("click", function (e) {
    e.preventDefault();
    popUp.css("display", "block");
    setTimeout(function () {
      popUp.addClass("feedback-pop-up_is-active");
      bodyElem.css({
        overflow: "hidden",
        "padding-right": scrollbarWidth() + "px",
      });
    }, 300);
  });

  $(".feedback-pop-up__close").on("click", function (e) {
    e.preventDefault();
    popUp.removeClass("feedback-pop-up_is-active");
    bodyElem.css({
      overflow: "auto",
      "padding-right": "0px",
    });
    setTimeout(function () {
      popUp.css("display", "none");
    }, 300);
  });

  $(".feedback-pop-up__overlay").on("click", function (e) {
    e.preventDefault();
    popUp.removeClass("feedback-pop-up_is-active");
    setTimeout(function () {
      popUp.css("display", "none");
    }, 300);
  });
});

// Form submit + validation
$(function () {
  $(".phone-mask").mask("0 (000) 000-00-00");

  var formValidator = function (form) {
    var formSubmit = $(form);
    var inputs = formSubmit.find("input, select, textarea");
    var required = formSubmit.find("[data-required]");
    var submitBtn = formSubmit.find("[data-submit]");
    formSubmit
      .find("[data-required]")
      .not(":checkbox")
      .addClass("_notvalidated");

    handleChange();

    function handleChange() {
      inputs.on("change keyup input", function (e) {
        var $input = $(e.target);

        // Запускаем проверки
        if ($input.is(":checkbox[data-required]")) {
          validateRequiredCheckbox($input);
        } else if ($input.is("[data-required]")) {
          validateRequired($input);
        }
        /**
            Теперь поле либо валидно, либо у него
            есть класс _error, и ложной разблокировки
            кнопки сабмита не будет
        */
        $input.removeClass("_notvalidated");

        // Считаем ошибки
        calculateErrors();
      });
    }

    function validateRequired($input) {
      // Проверяем обязательные поля
      var val = $input.val().replace(/\s/g, "");

      /**
          Убираем или подставляем класс _error,
          а также текст об ошибке
      */

      if (val.length > 0) {
        $input.removeClass("_error");
      } else {
        $input.addClass("_error");
      }
    }

    function validateRequiredCheckbox($input) {
      // Проверяем обязательные чекбоксы

      if ($input.is(":checked")) {
        $input.removeClass("_error");
      } else {
        $input.addClass("_error");
      }
    }

    function calculateErrors() {
      // Подводим итоги проверок
      const errors = formSubmit.find("._error, ._notvalidated").length;

      if (errors > 0) {
        submitBtn.attr("disabled", true);
      } else {
        submitBtn.removeAttr("disabled");
      }
    }
  };

  function resetForm(_form) {
    _form.find(".js-submit").attr("disabled", true);
    _form.find("[data-required]").each(function (index, item) {
      $(item).addClass("_notvalidated").removeClass("_error").val("");
    });
    elementDisactive($(".form__input"));
  }

  function initForm() {
    $(".js-validate-form").each(function () {
      var $form = $(this);
      var $btn = $form.find(".js-submit");

      new formValidator(this);

      $form.on("submit", function (e) {
        e.preventDefault();

        // Блокируем кнопку сабмита
        $btn.attr("disabled", true);

        $.ajax({
          url: $form.attr("action"),
          data: $form.serialize(),
          type: $form.attr("method") || "POST",
          context: this,
          success: function (response) {
            // Сообщение об успешной отправке

            console.log("Успешная отправка");

            window.location.href = "./thanks";

            resetForm($form);
          },
          error: function () {
            // Ошибка отправки
            console.log("Ошибка отправки формы");
            // Разблокируем кнопку
            $btn.removeAttr("disabled");
          },
        });
      });

      // Отключаем автозаполнение полей в хроме
      $form
        .find('[type="text"], [type="email"], [type="tel"], [type="password"]')
        .attr("autocomplete", "new-password");
    });

    // Антиспам
    (function () {
      // return;
      var seconds = 0; // Проверка phantomJS

      var isBot = function isBot() {
        var retval = false;
        if (window._phantom || window.callPhantom) retval = true;
        if (window.__phantomas) retval = true; //PhantomJS-based web perf metrics + monitoring tool

        if (window.Buffer) retval = true; //nodejs

        if (window.emit) retval = true; //couchjs

        if (window.spawn) retval = true; //rhino

        if (window.webdriver) retval = true; //selenium

        if (window.domAutomation || window.domAutomationController)
          retval = true; //chromium based automation driver
        // if (window.outerWidth === 0 && window.outerHeight === 0) retval = true; //headless browser

        return retval;
      };

      if (isBot()) {
        return false;
      } // Считаем, сколько времени пользователь провёл на сайте, и отправляем это в форме

      $(".js-validate-form").each(function () {
        var name = $(this).data("name");
        $(this).append(
          '<input type="hidden" name="'.concat(
            name,
            '" class="js-input-seconds" value="0" />'
          )
        );
      });
      clearInterval(App.antispamTimeout);
      App.antispamTimeout = setInterval(function () {
        seconds++;
        App.H.find(".js-input-seconds").val(seconds);
      }, 1000);
    })();

    // Фикс autocomplete="off" для IE и Edge
    if (App.ie || App.edge) {
      window.onbeforeunload = function () {
        $('form[autocomplete="off"]').each(function () {
          this.reset();
        });
      };
    }

    // Для поля телефона допускаем только цифры, пробел и +-()
    App.H.find("[data-phone]").on("input", function () {
      var val = $(this)
        .val()
        .replace(/[^0-9\s()+-]/g, "");
      $(this).val(val);
    });
  }

  if ($(".js-validate-form").length) {
    initForm();
  }
});

$("#send_request").on("click", function (e) {
  e.preventDefault();
  var location = $("#contactdobform-zone").val();
  var eventDate = $("#contactdobform-dob").val();
  var players = $("#contactdobform-count").val();
  var playersAge = $("#contactdobform-age").val();
  var name = $("#contactdobform-name").val();
  var phone = $("#contactdobform-phone").val();
  var email = $("#contactdobform-email").val();
  var comments = $("#contactdobform-body").val();
  $.ajax({
    url: "ajax.php",
    dataType: "json",
    method: "POST",
    data: {
      location: location,
      eventDate: eventDate,
      players: players,
      playersAge: playersAge,
      name: name,
      phone: phone,
      email: email,
      comments: comments,
    },
    success: function (data) {
      if (data.r == "1") {
        //_gaq.push(['_trackEvent', 'landings_requests', 'request_submission', 'Ремаркетинг']);
        alert("Заявка успешно отправлена");
        jQuery("#sdts_cl_modal").click();
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText + "|\n" + status + "|\n" + error);
    },
  });
});

