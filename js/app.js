"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
document.addEventListener('DOMContentLoaded', function () {
  // slides up/down/toggle
  var slideUpQna = function slideUpQna(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    if (target.previousElementSibling) {
      target.previousElementSibling.style.pointerEvents = 'none';
    }
    window.setTimeout(function () {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      if (target.previousElementSibling) {
        target.previousElementSibling.style.pointerEvents = 'auto';
      }
    }, duration);
    target.parentNode.classList.remove('is--open');
  };
  var slideDownQna = function slideDownQna(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    target.style.removeProperty('display');
    var display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    if (target.previousElementSibling) {
      target.previousElementSibling.style.pointerEvents = 'none';
    }
    window.setTimeout(function () {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      if (target.previousElementSibling) {
        target.previousElementSibling.style.pointerEvents = 'auto';
      }
    }, duration);
    target.parentNode.classList.add('is--open');
  };
  var slideToggleQna = function slideToggleQna(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    if (window.getComputedStyle(target).display === 'none') {
      return slideDownQna(target, duration);
    } else {
      return slideUpQna(target, duration);
    }
  };

  // checker
  var useItemChecker = function useItemChecker(els, onClickOutside) {
    var checkBodyClick = function checkBodyClick(e) {
      var currentEl = e.target;
      while (currentEl) {
        if (els.includes(currentEl)) break;
        currentEl = currentEl.parentNode;
      }
      if (!currentEl) {
        onClickOutside();
        removeBodyChecker();
      }
    };
    function setBodyChecker() {
      document.documentElement.addEventListener('click', checkBodyClick);
    }
    function removeBodyChecker() {
      document.documentElement.removeEventListener('click', checkBodyClick);
    }
    return {
      setBodyChecker: setBodyChecker,
      removeBodyChecker: removeBodyChecker
    };
  };

  // accordeon
  var accordeonTrigger = document.querySelectorAll('.accordeon__trigger');
  if (accordeonTrigger) {
    accordeonTrigger.forEach(function (item) {
      item.addEventListener('click', function (event) {
        event.preventDefault();
        if (!item.parentNode.classList.contains('is--open')) {
          slideDownQna(item.nextElementSibling);
        } else {
          slideUpQna(item.nextElementSibling);
        }
      });
    });
  }

  // languages
  var languagesTrigger = document.querySelectorAll('.c-language__trigger');
  if (languagesTrigger) {
    languagesTrigger.forEach(function (item) {
      var close = function close() {
        var parent = item.closest('.c-language');
        parent.classList.remove('is--active');
      };
      var itemChecker = useItemChecker([item.parentNode], close);
      item.addEventListener('click', function (event) {
        event.preventDefault();
        var parent = item.closest('.c-language');
        if (!parent.classList.contains('is--active')) {
          parent.classList.add('is--active');
          itemChecker.setBodyChecker();
        } else {
          close();
        }
      });
    });
  }

  // mobile menu
  var mobileMenu = document.getElementById('menu');
  var mobileMenuTrigger = document.getElementById('hamburger-toggle');
  var mobileMenuLinks = document.querySelectorAll('.menu__nav .nav__link');
  if (mobileMenu && mobileMenuTrigger) {
    mobileMenuTrigger.addEventListener('click', function (event) {
      event.preventDefault();
      if (mobileMenu.classList.contains('is--active')) {
        mobileMenuTrigger.classList.remove('is--active');
        mobileMenu.classList.remove('is--active');
        document.body.classList.remove('scroll-disabled');
      } else {
        mobileMenuTrigger.classList.add('is--active');
        mobileMenu.classList.add('is--active');
        document.body.classList.add('scroll-disabled');
      }
    });
    if (mobileMenuLinks) {
      mobileMenuLinks.forEach(function (item) {
        item.addEventListener('click', function () {
          if (mobileMenu.classList.contains('is--active')) {
            mobileMenuTrigger.classList.remove('is--active');
            mobileMenu.classList.remove('is--active');
            document.body.classList.remove('scroll-disabled');
          }
        });
      });
    }
  }

  // tabs
  var removebgTabsItems = document.querySelectorAll('.remove-bg-tabs__item');
  if (removebgTabsItems) {
    removebgTabsItems.forEach(function (item, i) {
      item.addEventListener('click', function () {
        var parent = item.closest('.remove-bg-tabs');
        parent.querySelectorAll('.remove-bg-tabs__item').forEach(function (child) {
          return child.classList.remove('is--active');
        });
        parent.querySelectorAll('.remove-bg-tabs__holder').forEach(function (child) {
          return child.classList.remove('is--active');
        });
        item.classList.add('is--active');
        var el = parent.querySelector('.is--active');
        var index = _toConsumableArray(parent.querySelectorAll('.remove-bg-tabs__item')).indexOf(el);
        parent.querySelectorAll('.remove-bg-tabs__holder')[index].classList.add('is--active');
      });
    });
  }

  // switcher before & after
  var switcherBtn = document.querySelectorAll('.switcher__btn');
  if (switcherBtn) {
    switcherBtn.forEach(function (item, i) {
      item.addEventListener('click', function () {
        var parent = item.closest('.switcher__wrapper');
        parent.querySelectorAll('.switcher__btn').forEach(function (child) {
          return child.classList.remove('is--active');
        });
        item.classList.add('is--active');
      });
    });
  }

  // nouislider bruh size
  var bruhSizeSlider = document.querySelectorAll('.bruh-size__range');
  if (bruhSizeSlider) {
    bruhSizeSlider.forEach(function (slider) {
      var parent = slider.closest('.bruh-size__wrapper');
      var value = parent.querySelector('.bruh-size__value');
      noUiSlider.create(slider, {
        start: 15,
        step: 1,
        range: {
          'min': 0,
          'max': 30
        },
        connect: [true, false]
      });
      slider.noUiSlider.on('update', function (values, handle) {
        value.textContent = Math.round(values[handle]);
      });
    });
  }

  // samples
  var samplesWrapper = document.querySelector('.samples__wrapper');
  if (samplesWrapper && window.innerWidth >= 768) {
    var msnry = new Masonry(samplesWrapper, {
      itemSelector: '.samples__item',
      columnWidth: '.samples__item',
      percentPosition: true
    });
  }

  // colors
  var colorPicker = document.querySelector('.c-colors__input-color');
  if (colorPicker) {
    colorPicker.addEventListener('input', function () {
      var parent = colorPicker.closest('.c-colors__item');
      var input = parent.querySelector('.c-colors__input');
      var circle = parent.querySelector('.c-colors__circle');
      circle.style.background = colorPicker.value;
      input.checked = true;
    });
  }

  // slider images
  var sliders = document.querySelectorAll('.slider-container');
  sliders.forEach(function (slider) {
    var sliderBefore = slider.querySelector('.slider-before');
    var sliderAfter = slider.querySelector('.slider-after');
    var sliderHandle = slider.querySelector('.slider-handle');
    var isDragging = false;
    function handleMove(e) {
      if (!isDragging) return;
      var clientX;
      if (e.type === 'mousemove') {
        clientX = e.clientX;
      } else if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
      }
      var rect = slider.getBoundingClientRect();
      var offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;
      var percentage = offsetX / rect.width * 100;
      sliderHandle.style.left = "".concat(percentage, "%");
      sliderAfter.style.clipPath = "inset(0 0 0 ".concat(percentage, "%)");
    }
    sliderHandle.addEventListener('mousedown', function () {
      isDragging = true;
    });
    sliderHandle.addEventListener('touchstart', function () {
      isDragging = true;
    });
    document.addEventListener('mouseup', function () {
      isDragging = false;
    });
    document.addEventListener('touchend', function () {
      isDragging = false;
    });
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
  });
});