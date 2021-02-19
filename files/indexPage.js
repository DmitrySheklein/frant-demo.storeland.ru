// Функции для главной страницы
function indexPage() {
    // Слайдер на главной
    $('#slideshow .owl-carousel').on('initialized.owl.carousel changed.owl.carousel', function(e) {
      if (!e.namespace)  {
        return;
      }
      var carousel = e.relatedTarget;
      var itemWidth = 55 //px
      var paddingWidth = 15 //px
      $('.slider-counter').text(carousel.relative(carousel.current()) + 1 + ' / ' + carousel.items().length)
      .css('left', paddingWidth +  (carousel.items().length * itemWidth) + 'px')
    })
    .owlCarousel({
      items: 1,
      loop: true,
      rewind: true,
      lazyLoad: true,
      nav: true,
      navText: ["<i class='slideshow-nav fal fa-angle-left' aria-hidden='true'></i>", "<i class='slideshow-nav fal fa-angle-right' aria-hidden='true'></i>"],
      dots: true,
      autoplay: false,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      smartSpeed: 500,
      dotsSpeed: 400,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      onChange: function(){
        lozad('.sl-lozad', {load: changeSlideshowImage}).observe();
      }
    });
    lozad('.sl-lozad', {load: changeSlideshowImage}).observe();

    function changeSlideshowImage(el){
      var $img = $(el);
      var desktopLink = 'desktop-src';
      var mobileLink = 'mobile-src';
      var bgLink = '';
      var webpSupport = (!!$img.data('webp')) && support_format_webp();
      var prefix = (webpSupport) ? 'webp-' : '';

      if(getClientWidth() < 991) {
        bgLink = $img.data(prefix + mobileLink);  
      } else {
        bgLink = $img.data(prefix + desktopLink);  
      }
      
      if(bgLink){
        $img.css('background-image', 'url("' + bgLink + '")');
      }
    }
    $(window).on('resize', $.debounce(300, 
      function(){
      $('.sl-lozad').each(function(i, el){changeSlideshowImage(el);})
      })
    );
    function support_format_webp(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))&&0==e.toDataURL("image/webp").indexOf("data:image/webp")}
    support_format_webp()

    // Преимущества
    $("#features .features-list").owlCarousel({
      loop: false,
      rewind: true,
      lazyLoad: false,
      nav: false,
      dots: false,
      autoplay: false,
      smartSpeed: 500,
      touchDrag: true,
      pullDrag: true,
      responsiveClass: true,
      responsiveRefreshRate: 100,
      responsive: {
        0:{items:1},
        320:{items:1,margin: 30, autoWidth: true},
        480:{items:2,margin: 30, autoWidth: true},
        768:{items:3,margin: 30, autoWidth: true},
        992:{items:4,margin: 30, autoWidth: false},
        1200:{items:4,margin: 30,mouseDrag: false}
      }
    });  

    
    //Функция показать больше 
    $('.products-button-load').on('click', function () {
      var $btn = $(this);

      if($btn.hasClass('_loaded')){
        $btn.closest('.products-container').find('.products-grid .item').filter('._visible').removeClass('_visible').hide();
        $btn
          .removeClass('_loaded')
          .find('span')
          .text('Показать все')
      }else{ 
        $btn.closest('.products-container').find('.products-grid .item').not(':visible').addClass('_visible').show();
        $btn
          .addClass('_loaded')
          .find('span')    
          .text('Скрыть')
      }
    })


    $(".products-container.section:not(.pdt-sale)").each(function () {
      var $navBlock = $(this).find('.navigation');
      // 
      $(this).find('.products-grid').owlCarousel({
        margin: 30,
        loop: false,
        rewind: true,
        lazyLoad: true,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        navContainer: $navBlock,
        navText: [, ],        
        navText: ['<svg class="slideshow-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.213 476.213"><path d="M476.213 223.106H57.426l34.393-34.393L70.606 167.5 0 238.106l70.606 70.607L91.819 287.5l-34.393-34.394h418.787z"/></svg>', '<svg class="slideshow-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.2 476.2"><path d="M0 253.1h418.8l-34.4 34.4 21.2 21.2 70.6-70.6-70.6-70.6-21.2 21.2 34.4 34.4H0z"/></svg>'],
        smartSpeed: 500,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        responsiveClass: true,
        responsiveRefreshRate: 100,
        responsive: {
          0:{items:1},
          320:{items:2},
          480:{items:2},
          540:{items:2},
          768:{items:3},
          992:{items:3},
          1200:{items:4}
        },          
        onInitialized: changeNavBtn
      });            
    })
    $(".products-container.section.pdt-sale").each(function () {
      var $navBlock = $(this).find('.navigation');
      // 
      $(this).find('.products-grid').owlCarousel({
        margin: 30,
        loop: false,
        rewind: true,
        lazyLoad: true,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        navContainer: $navBlock,
        navText: [, ],        
        navText: ['<svg class="slideshow-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.213 476.213"><path d="M476.213 223.106H57.426l34.393-34.393L70.606 167.5 0 238.106l70.606 70.607L91.819 287.5l-34.393-34.394h418.787z"/></svg>', '<svg class="slideshow-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.2 476.2"><path d="M0 253.1h418.8l-34.4 34.4 21.2 21.2 70.6-70.6-70.6-70.6-21.2 21.2 34.4 34.4H0z"/></svg>'],
        smartSpeed: 500,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        responsiveClass: true,
        responsiveRefreshRate: 100,
        responsive: {
          0:{items:1},
          320:{items:1},
          768:{items:1},
          992:{items:2},
          1200:{items:2}
        },          
        onInitialized: changeNavBtn
      });            
    })
    // Отсчет даты до окончания акции
    function counterDate() {
      // Устанавливаем дату обратного отсчета ММ-ДД-ГГ
      var end = $('.sale-counter').first().attr('end');
      if(!end) return;
      var countDownDate = new Date(end).getTime();
      function drawCounter() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);     
        // Вывод
        $('.sale-counter').each(function(i, el){
          $(el).find('.days span').text(days);
          $(el).find('.hours span').text(hours);
          $(el).find('.minutes span').text(minutes);
          $(el).find('.seconds span').text(seconds);
        })
        // Счетчик завершен
        if (distance < 0) {
          clearInterval(x);
          $(el).find('span').text("0");
        }
      }
      // Обновление счетчика каждую секунду
      var x = setInterval(drawCounter, 1000);      
      drawCounter();

    }
    counterDate();
    function changeNavBtn(event){
      var items = event.item.count;
      var size = event.page.size;
      var $nav = $(event.target).siblings('.block-title').find('.navigation');
      
      if (items > size){
        $nav.show();
      } else {
        $nav.hide();
      }
    }      

    // Слайдер брендов
    $("#main .brands-list").owlCarousel({
      margin: 15,
      loop: false,
      rewind: true,
      lazyLoad: true,      
      nav: true,
      navContainer: '.brands-navigation',
      navText: ['<svg class="slideshow-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.213 476.213"><path d="M476.213 223.106H57.426l34.393-34.393L70.606 167.5 0 238.106l70.606 70.607L91.819 287.5l-34.393-34.394h418.787z"/></svg>', '<svg class="slideshow-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.2 476.2"><path d="M0 253.1h418.8l-34.4 34.4 21.2 21.2 70.6-70.6-70.6-70.6-21.2 21.2 34.4 34.4H0z"/></svg>'],
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      autoHeight: false,
      smartSpeed: 500,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      responsiveClass:true,
      responsive:{
        0:{items:2},
        767:{items:2},
        768:{items:4},
        992:{items:2},
        1199:{items:2}
      }
    });
    // Клик по табам в блоке новости
    $('#news .tabs-headerList').on('click', '.tabs-headerLink', function(event){
      event.preventDefault()
      
      var $link = $(this);
      var $parent = $link.parent('.tabs-headerItem');
      var tabId = $link.data('href');
      
      if ($parent.hasClass('active')){
        return;
      };
  
      preloadShow($('#news .tabs-body .preloader'));
      
      var $splitter = $link.closest('.tabs-headerList').find('.nav-splitter');
      $splitter.css('width', $link.outerWidth()).css('left', $link.position().left)
      $parent.addClass('active').siblings().removeClass('active')
      $('#news .tabs-body .tabs-content').removeClass('active').filter('[id="' + tabId +'"]').addClass('active');
      
      preloadHide($('#news .tabs-body .preloader'))
    })
    // Слайдер новостей (все новости без группировки)
    $("#news .all.owl-carousel").owlCarousel({
      margin: 30,
      loop: false,
      rewind: true,
      lazyLoad: true,
      navContainer: '#news .navigation',
      nav: true,
      navText: [, ],        
      navText: ['<svg class="slideshow-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.213 476.213"><path d="M476.213 223.106H57.426l34.393-34.393L70.606 167.5 0 238.106l70.606 70.607L91.819 287.5l-34.393-34.394h418.787z"/></svg>', '<svg class="slideshow-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.2 476.2"><path d="M0 253.1h418.8l-34.4 34.4 21.2 21.2 70.6-70.6-70.6-70.6-21.2 21.2 34.4 34.4H0z"/></svg>'],
      dots: false,
      autoplay: false,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      autoHeight: false,
      smartSpeed: 500,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      responsiveClass:true,
      
      responsive:{
        0:{items:1, autoWidth: false},
        767:{items:2, autoWidth: false},
        768:{items:3, autoWidth: false},
        992:{items:3, autoWidth: true},
        1199:{items: 3, autoWidth: true,}
      }
    });
    // Слайдер новостей (группы)
    $("#news .owl-carousel").owlCarousel({
      margin: 10,
      loop: false,
      rewind: true,
      lazyLoad: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      autoHeight: false,
      smartSpeed: 500,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      onRefresh: function (event){
        var $preloader = $(event.target).closest('.tabs-body').find('.preloader');
        
        preloadHide($preloader)
      },
      responsiveClass:true,
      responsive:{
        0:{items:1},
        767:{items:2},
        768:{items:3},
        992:{items:3},
        1199:{items:5}
      }
    });
  
  }