/*
* lazy loads elements with default selector as '.lozad'
*/
$(function(){
  lozad().observe();
})

$.fancybox.defaults.btnTpl.smallBtn = '<button data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><i class="material-icons">close</i></button>'
$.fancybox.defaults.lang = "ru";
$.fancybox.defaults.i18n = {
    ru: {
        CLOSE: "Закрыть",
        NEXT: "Вперёд",
        PREV: "Назад",
        ERROR: "Контент не может быть загружен. <br/> Пожалуйтста попробуйте ещё раз.",
        DOWNLOAD: "Скачать",
        SHARE: "Поделиться",
        ZOOM: "Увеличить"
    }
};
$.fancybox.defaults.wheel = false;
$.fancybox.defaults.smallBtn = true;
$.fancybox.defaults.animationEffect = 'fade';
$.fancybox.defaults.transitionEffect = false;
$.fancybox.defaults.hideScrollbar = true;
$.fancybox.defaults.toolbar = false;
$.fancybox.defaults.infobar = false;
$.fancybox.defaults.touch = false;
$.fancybox.defaults.buttons = [
    "close"
]
/*
* Noty default
*/ 
Noty.overrideDefaults({
  layout: "bottomRight",
  theme: 'metroui',
  timeout: "3000",
  killer: true,
  progressBar: true,
  animation: {
    open: 'animated bounceInRight', 
    close: 'animated bounceOutRight'
  }
});  
// Возвращает правильное окончание для слова
function genWordEnd(num, e, m, mm) {
  // Если забыли указать окончания
  if(typeof (e) == "undefined") { e = ''; }
  if(typeof (m) == "undefined") { e = 'а'; }
  if(typeof (mm) == "undefined"){ e = 'oв'; }
  // Если передали пустую строку, вместо цифры
  if(0 == num.length) { num = 0; }
  // Превращаем цифру в правильный INT
  num = GetSum(num).toString();
  // Получаем последний символ цифры
  ch1 = num.substring(num.length-1);
  // Получаем последний символ цифры
  ch2 = num.length == 1 ? 0 : num.substring(num.length-2, num.length-1);
  // Если последняя цифра - 1, вернем единственное число
  if(ch2!=1 && ch1==1)               {return e;}
  // Если последняя цифра - от 2 до 4х , вернем множественное чило из массива с индексом 2
  else if(ch2!=1 && ch1>1 && ch1<=4) {return m;}
  // Если последняя цифра - от 5 до 0 , вернем множественное чило из массива с индексом 3
  else if(ch2==1 || ch1>4 || ch1==0) {return mm;}
}

// Считает сумму  33 599,65 + 2000 - 1910-41,6
function GetSum(val,precision) {
  if(typeof (precision) == "undefined" || precision < 0) { precision = 0; }
  // Возводим в степень точности 10 для округления
  var p = Math.pow(10,precision);  
  try {return Math.round(parseFloat(eval(val.toString().replace(/\s/gi, "").replace(/,/gi, ".")))*p)/p;} catch (e) {return 0;}
}

// Форматирует цену
function number_format(n,e,t,r){var i=n,a=e,o=function(n,e){var t=Math.pow(10,e);return(Math.round(n*t)/t).toString()};i=isFinite(+i)?+i:0,a=isFinite(+a)?Math.abs(a):0;var u,d,f="undefined"==typeof r?",":r,h="undefined"==typeof t?".":t,l=a>0?o(i,a):o(Math.round(i),a),s=o(Math.abs(i),a);s>=1e3?(u=s.split(/\D/),d=u[0].length%3||3,u[0]=l.slice(0,d+(0>i))+u[0].slice(d).replace(/(\d{3})/g,f+"$1"),l=u.join(h)):l=l.replace(".",h);var c=l.indexOf(h);return a>=1&&-1!==c&&l.length-c-1<a?l+=new Array(a-(l.length-c-1)).join(0)+"0":a>=1&&-1===c&&(l+=h+new Array(a).join(0)+"0"),l}
// Добавляет пробел 1000 -> 1 000  /  10000 -> 10 000 
function addSpaces(nStr){
  if(typeof nStr == 'number'){
	  nStr = String(nStr);
  }

  return nStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}  
// Проверка вводимых значений в количестве товара
function keyPress(oToCheckField, oKeyEvent) {
  return oKeyEvent.charCode === 0 || /\d/.test(String.fromCharCode(oKeyEvent.charCode));
}

// Функция определения ширины экрана пользователя
function getClientWidth() {return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;}

// Работа с cookie файлами. 
// Получение переменной из cookie
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Установка переменной в cookie
function setCookie(name, value, options) {
  options = options || {};
  var expires = options.expires;
  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) { 
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];    
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

// Удаление переменной из cookie
function deleteCookie(name, options ) {
  options = options || {};
  options.expires = -1;
  setCookie(name, "", options)
}

// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError (desc, page, line) {
  var img=document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';
  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

// Превращает поле пароля в текстовое поле и обратно
// @LinkObject - ссылка по которой кликнули
// @InputObject - объект у которого нужно изменить тип поля
function ChangePasswordFieldType (LinkObject, InputObject) {
  var 
    // Ссылка по которой кликнули
    LObject = $(LinkObject),
    // Объект у которого изменяем тип с password на text
    IObject = $(InputObject),
    // Старый текст ссылки
    txtOld = LObject.html(),
    // Новый текст ссылки
    txtNew = LObject.attr('rel');
  // Если объекты не получены, завершим работу функции
  if( LObject.length==0 || IObject.length==0 ) {
    return false;
  }
  // Изменяем у ссылки текст со старого на новый
  LObject.html(txtNew);
  // Старый текст ссылки сохраняем в атрибуте rel 
  LObject.attr('rel', txtOld);
  // Изменяем тип input поля
  if(IObject[0].type == 'text') {
    IObject[0].type = 'password';
  } else {
    IObject[0].type = 'text';
  }
}

// Крутит изображение при обновлении картинки защиты от роботов
function RefreshImageAction(img,num,cnt) {
  if(cnt>13) { return false; }
  $(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
  num = (num==6)?0:num;
  setTimeout(function(){RefreshImageAction(img, num+1, cnt+1);}, 50);
}

// Показать пароль 
function showPass(){
    $('.showPass').on('click', function(){
    ChangePasswordFieldType(this, $('#sites_client_pass'));
    ChangePasswordFieldType(this, $('#login-password'));
    ChangePasswordFieldType(this, $('#password-reg'));
    ChangePasswordFieldType(this, $('#password-rec'));
    return false;
  });
}
$(function(){
  showPass()
});
// Галочка политики
$(function () {
  $('.pp-checkbox').on('change', function () {
    $(this).closest('form').find('[type=submit]').toggleClass('_disabled')
  })
})
// Основные функции
function mainFunctions() {
  $(function(){
    // Фикс шапки 
    (function() {
      var $headerFixed = $('.header-fixed');
      var $header = $('.header');
      
      if($headerFixed.length && $header.length) {
        var isHeaderFixed = false,
        headerCanFix = true,
        headerFixedHeight = $headerFixed.actual('outerHeight'),
        headerNormalHeight = $header.actual('outerHeight'),
        headerDiffHeight = headerNormalHeight - headerFixedHeight;

        if (headerDiffHeight <= 0) {
          headerDiffHeight = 0;
        }
        
        $(window).on('scroll', function () {
          var scrollTop = $(window).scrollTop();
          
          if (!isHeaderFixed && getClientWidth() > 1200) {
            if ((scrollTop > headerNormalHeight) && headerCanFix) {
              isHeaderFixed = true;

              $header.find(".header-main-content__top").clone().appendTo($headerFixed.find(".header-main-wrap"));

              $headerFixed.css('top', '-' + headerNormalHeight + 'px');
              $headerFixed.addClass('_fixed');
              $headerFixed.animate({top: '0'}, {
                duration: 300, complete:
                    function () {
                      lozad().observe();
                    }
              });              
              
            } 
          } else if (isHeaderFixed || !headerCanFix) {
            if ((scrollTop <= headerDiffHeight ) || !headerCanFix) {
                isHeaderFixed = false;
                $headerFixed.removeClass('_fixed');
                $headerFixed.find(".header-main-content__top").html('')
            }
        }      
        })
        // $(".header .header-main-content__top").clone().appendTo(".header-fixed .header-main-content__top");
      }
    })()
    // Вызов функции редиректа при обратном звонке
    // Возвращаем пользователя на страницу с которой был сделан обратный звонок
    $('.callbackredirect').val(document.location.href);
    // AJAX подписка
    $('.subscribeForm').on('submit', function(e){
      e.preventDefault();
      
      var $form = $(this);
      var url = $form.prop('action');
      var formData = $form.serializeArray();
      formData.push({name: 'ajax_q', value: 1});
      formData.push({name: 'only_body', value: 1});
      
      if($form.valid()){
        $.getJSON(url, formData, function(d){          
          var notyText = (d.status == 'ok') ? d.message : 'Произошла ошибка, попробуйте ещё раз';
          var notyType = (d.status == 'ok') ? 'success' : 'error';
          
          if($form.hasClass('subscribeForm') && notyType === 'success'){
            notyText = "Запрос на подписку успешно отправлен администрации магазина."
          }
          new Noty({
            text: '<div class="noty_content">'+ notyText +'</div>',
            type: notyType
          }).show()
          
          if(notyType == 'success'){
            $form[0].reset();
          }
        })
      }
      
    })
        
    // Добавление товара в корзину
    $(document).on('click', '.add-cart', function() {
      var $btn  = $(this);
      $btn.addClass('_loading')
      $btn.find('span').last().html('<i class="material-icons rotating">donut_large</i>')
  
      var form = $(this).closest('form');
      if ($(this).hasClass('_cart-page')) {
        form.attr('rel', 'cartPage')
      }      
      if ($(this).hasClass('quick')) {
        form.attr('rel', 'quick');
      } else {
        var rel = form.attr('rel');
        if (rel) {
          form.attr('rel', rel.replace('quick', ''));
        }
      }
      form.trigger('submit');
      return (false);
    })
    // Слайдер в подвале
    $('#footer .block.collapse .title').on('click', function(){
      if(getClientWidth() <= 991){
        $(this).toggleClass('active').next('.block-content').slideToggle();
      }
    })

  // Уведомить о поступлении товара
  $(document).on('click', '.empty[data-fancybox], .goodsDataMainModificationEmpty', function(){
    var $formBlock = $(this).closest('.goodsListForm, .goodsDataForm');
    var goodsMod = $formBlock.find('[name="form[goods_mod_id]"]').val();
    $('#fancy-notify-goods-mod').val(goodsMod)
  })
  // Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией  
  $("#myform, .feedbackForm,.clientForm, .clientForm._login, .clientForm._reg,.clientForm._recovery, .goodsDataOpinionAddForm, .callbackForm").each(function(){
    $(this).validate()
  });
  // Формы логина и регистрации 
  $('.clientForm._login,.clientForm._reg, .clientForm._recovery').on('submit', function (e) {
    e.preventDefault();


    // Находим форму, которую отправляем на сервер
    var $formBlock = $($(this).get(0));
    if(!$formBlock.valid()){
      return;
    }
    // Проверка на существование формы отправки запроса на добавление товара в корзину
    if (1 > $formBlock.length || $formBlock.get(0).tagName != 'FORM') {
      alert('Не удалось найти форму');
      return false;
    }
      
    // Получаем данные формы, которые будем отправлять на сервер
    var formData = $formBlock.serializeArray();
    // Сообщаем серверу, что мы пришли через ajax запрос
    // formData.push({name: 'ajax_q', value: 1});
    // formData.push({name: 'only_body', value: 1});

    $.ajax({
      type: "POST",
      cache: false,
      url: $formBlock.attr('action'),
      data: formData,
      success: function(data,textStatus, jqXHR) {
        console.log(
          textStatus, jqXHR
        );
        var msgText = $(data).find('.message').text();

        if(msgText == 'Покупателя с таким emailом не существует'){
          msgText = 'Пользователь с таким e-mail не найден.Проверьте правильность введенных данных или <a>зарегистрируйтесь</a>'
        }
        if(msgText == 'Указанный пароль для входа в личный кабинет покупателя не верен'){
          msgText = 'Неверный пароль <br> Проверьте правильность введенных данных или <a>восстановите пароль</a>'
        }
        console.log(
          $(data).find('.message').text()
        );
        // console.log(data);
        var $errorBlock = $('<div>').addClass('error-block').html(msgText);
        $formBlock.find('.error-block').remove()
        $formBlock.prepend($errorBlock)
      }
    })

  })
  // Переключение логина/регистрации
  $('.fancybox-login-tumbler').on('click', '.fancybox-login-tumbler__btn', function () {
    if ($(this).hasClass('_active')) {
      return;
    }
    
    $(this).addClass('_active').siblings().removeClass('_active');
    $(this).closest('.fancybox-login-content').find('.fancybox-body').toggle();
    $('.fancybox-login .title').toggle();
  })
  // Отправка формы по Ctrl+Enter
  $('form').bind('keypress', function(e){
    if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
  // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
  }).find('input').bind('keypress', function(e){
    if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
  });

  });
}

// Запуск блока Вы смотрели
function viewed(){
  // Вы смотрели
  var owl = $("#viewed .viewed-items").owlCarousel({
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
      0:{items:1,margin: 5},
      320:{items:2,margin: 10},
      480:{items:2,margin: 10},
      565:{items:3,margin: 30},
      768:{items:4,margin: 30},
      992:{items:5,margin: 30},
      1200:{items:6,margin: 30}
    },
    onInitialized : function (evt) {
      var items = evt.item.count;
      // console.log(evt);
    }
  });
}
function tippyViewBtn() {
  $(function () {
    tippy('.view-mode-btn', {
      theme: 'mytheme',
      onShow(instance) {
        var $link = $(instance.reference);
        var titleName = $link.attr('title');
        $link.removeAttr('title');
        $link.attr('data-title', titleName);
        instance.setContent($link.attr('data-title'));
      }
    });     
  }) 
}

// Добавление товара в корзину
function addCart() {
  $('.goodsDataForm, .goodsToCartFromCompareForm, .goodsListForm').off('submit').on('submit', function() {    
    // Выносим функции из шаблонов
    if ($(this).attr('rel') === 'quick') {
      quickOrder(this);
      return (false);
    }
    
    $('#header .cart').addClass('have-items');
    $('.cart .count').animate({opacity: 0,display: "none"},500);
    $('.cart .count').animate({display: "inline",opacity: 1} , 500 );
    
    // Находим форму, которую отправляем на сервер, для добавления товара в корзину
    var formBlock = $($(this).get(0));
    
      // Проверка на существование формы отправки запроса на добавление товара в корзину
      if (1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
        alert('Не удалось найти форму добавления товара в корзину');
        return false;
      }
      
      // Получаем данные формы, которые будем отправлять на сервер
      var formData = formBlock.serializeArray();
      // Сообщаем серверу, что мы пришли через ajax запрос
      formData.push({name: 'ajax_q', value: 1});
      // Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
      //formData.push({name: 'fast_order', value: 1});
      // Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
      $.ajax({
        type: "POST",
        cache: false,
        url: formBlock.attr('action'),
        data: formData,
        success: function(data) {
          var $btn = $('.add-cart._loading')

          if(!$btn.hasClass('_goods-page')) {
            $btn.removeClass('_loading').find('span').last().html("В корзину");
          }
          
          var msg = $(data).find('.notify').html();
          var type = $(data).find('.notify').hasClass('good') ? 'success' : 'error';
          var isAdded = ('success' == type) ? true : false;
          var iconTemplate = (isAdded) ? '<span class="material-icons">done</span>' : '<span class="material-icons">close</span>';
          var notyText, notyTheme, notyCloseWith;

          if (isAdded){
            var $msgBlock = $('<div>').html(msg);
            var goodsName = $msgBlock.find('a').first().text();
            var $cartLink = $($msgBlock.find('a').last()[0].outerHTML).addClass('noty-cart-btn').text('Перейти в корзину');
            var goodsMod = $(data).find('.cart-product').find('.properties').text();

            notyText = '<div class="noty__content">'+ '<div class="noty__content-text">'+ 'Товар ' + '<b>' + goodsName + '</b>' + ' добавлен в корзину!'  + '</div>' + '<div class="noty-goods-prop">' + goodsMod + '</div>' + $cartLink[0].outerHTML +'</div>';
            notyTheme = 'addCart';
            notyCloseWith = ['click', 'button'];
          } else {
            notyText = '<div class="noty__content">'+ iconTemplate + '<div class="noty__content-text">' + msg + '</div>' +'</div>';
            notyTheme = 'metroui';
            notyCloseWith = ['click'];
          }

          if(isAdded){$.fancybox.close();};
          // Если есть функция, которая отображает сообщения пользователю
          if(typeof(Noty) == "function") {
            new Noty({
              text: notyText,
              theme: notyTheme,
              type: type,
              closeWith: notyCloseWith,
              layout: "bottomRight",
              timeout: "2000",              
              animation: {
                  open: 'animated fadeInRight', 
                  close: 'animated fadeOutRight',
                  easing: 'swing',
                  speed: 500                  
              }              
            }).show();
          }
          $btn.removeClass('_added').find('span').last().html('В корзину');

          if(formBlock.attr('rel') === 'cartPage' && type === 'success'){
            document.location.href = '/cart'
          }          

          // Обновляем данные корзины
          var cartCount = $(data).filter('#newCartCount').html();
          $('.header-iconsItem._cart .header-iconsItem-icon').html(cartCount).attr('data-count', cartCount);
          $('.cart .count').html(cartCount).attr('data-count', cartCount);
          
          $('.cart .header-toolsContent').html($(data).filter('#newCartContent').html());
          $('.cart .dropdown').html($(data).filter('#newCartData').html());

          var modId = $('.goodsDataMainModificationId').val();
          var $cartData = $(data).filter('#newCartData');
          var $countBlock = $cartData.find('.item[data-goods-mod-id="' + modId +'"]').find('.header-toolsAmount.quantity')
          var newCount = $countBlock.text();
          var measureName = $countBlock.find('.measure-name').text();
          var $goodsCart = $('.goods-cart');
          var $goodsCartCount = $goodsCart.find('.goods-cart-count');

          if($btn.hasClass('_goods-page') && newCount) {
            $goodsCart.addClass('_show')
            $goodsCartCount.text(newCount)
            $btn.removeClass('_loading').find('span').last().html("+1 " + measureName);
          }
        }
      });
    return false;
  });
}
// Добавление в сравнение и избранное
function addto() {
  $(function(){
    tippy('.add-compare', {
      theme: 'mytheme',
      onShow(instance) {
        var $link = $(instance.reference);
        var title = $link.hasClass('added') ? $link.data('del-tooltip') : $link.data('add-tooltip');

        $link.removeAttr('title');        
        instance.setContent(title);
      }
    });
    tippy('.add-wishlist', {
      theme: 'mytheme',   
      // placement: 'top-end',      
      placement: 'top',      
      onShow(instance) {
        var $link = $(instance.reference);
        var isLogin = $('.header-loginLink').hasClass('_is-login');

        if(!isLogin){
          instance.setProps({
            content: '<div>Пожалуйста, <a href="/user/login">авторируйтесь</a>, <br> чтобы добавить в избранное</div>',
            allowHTML: true,
            interactive: true,            
          });
        } else {
          var title = $link.hasClass('added') ? $link.data('del-tooltip') : $link.data('add-tooltip');

          $link.removeAttr('title');        
          instance.setContent(title);
        }
      }
    });
  })
  // Добавление/удаление товара на сравнение/избранное через ajax
  $('.add-compare').off('click').on('click', function(){
    // Объект ссылки, по которой кликнули
    var 
      a = $(this)
      ,addUrl = a.attr('data-action-add-url')
      ,delUrl = a.attr('data-action-delete-url')
      ,addTitle = a.attr('data-action-add-title')
      ,delTitle = a.attr('data-action-delete-title')
      ,isAdd = a.attr('data-action-is-add')
      ,pName = a.attr('data-prodname')
      ,pImage = a.attr('data-prodimage')
      ,pPrice = a.attr('data-mod-id-price')
      ,pUrl = a.attr('data-produrl')
      ,pDataid = a.attr('data-id')
      ,pDataprice = a.attr('data-mod-id')
      ,pDataGoodsid = a.attr('data-goodsid')
      ,aText = a.parent().find('.add-compare')
      ,addTooltip = a.attr('data-add-tooltip')
      ,delTooltip = a.attr('data-del-tooltip')
      requestUrl = a.attr('href')
    ;
    
    // Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
    if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
      requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsDataMainModificationId').val());
    }
    
    // Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
    if(addUrl && delUrl) {
      $.ajax({
        type : "POST",
        dataType: 'json',
        cache : false,
        url : requestUrl,
        data : {
          'ajax_q': 1
        },
        success: function(data) {
          if(isAdd == 1){   
            $('.compare-items .dropdown-items-list').prepend(
                "<li class=\"item\" data-id=\"" + pDataid +  "\">" +                    
                    "<a href=\"" + pUrl + "\" title=\"" + pName + "\" class=\"product-image\">" + 
                      "<img src=\"" + pImage + "\" alt=\"" + pName + "\" class=\"goods-image-icon\">" +
                    "</a>" + 
                    "<div class=\"product-details\">" + 
                      "<p class=\"product-name\">" + 
                        "<a class=\"name\" href=\"" + pUrl + "\" title=\"" + pName + "\">" + pName + "</a>" +
                        "<a data-href=\"" + delUrl + "?id=" + pDataprice + "\" data-goods-mod-id=\"" + pDataprice + "\" class=\"item-remove material-icons\" title=\"Убрать товар из списка сравнения\" onclick=\"removeFromCompare($(this))\">" +
                          "close"+
                        "</a>" +
                      "</p>" + 
                      "<span class=\"price RUB\" data-price=\"" + pPrice + "\"><span><span class=\"num\">" + addSpaces(String(pPrice)) + "&nbsp;</span></span></span>"+
                    "</div>"+
                "</li>"
              );
          } else {
            $('.compare-items .dropdown-items-list').find('li.item[data-id="'+ pDataid +'"]').remove();
          }
          if('ok' == data.status) {
            if(isAdd == 1) {
              var 
                from = addUrl
                ,to = delUrl
                ,newIsAddStatus = 0
                ,newTitle = delTitle ? delTitle : ''
                ,newTooltip = delTooltip ? delTooltip : ''
              ;
              a.addClass('added');
            } else {
              var 
                from = delUrl
                ,to = addUrl
                ,newIsAddStatus = 1
                ,newTitle = addTitle ? addTitle : ''
                ,newTooltip = addTooltip ? addTooltip : ''
              ;
              a.removeClass('added');
            }
            
            // Если указано, что изменилось число товаров на сравнении
            if(typeof(data.compare_goods_count) != 'undefined') {
              // Блок информации о том, что есть товары на сравнении
              var sidecount = $('.compare .count');
              var $compareBlock = $('.header-iconsItem._compare')
              // Если на сравнении больше нет товаров
              // Указываем информацию о новом количестве товаров на сравнении
              // Блок обновления списка сравнения в каталога
              sidecount.animate({display: "none"},500,function(){
              sidecount.text(data.compare_goods_count);                 
              sidecount.attr('data-count', data.compare_goods_count);                 
                if(data.compare_goods_count > 0){
                  $('.compare').addClass('have-items');
                  $('.compare .compare-items .empty').hide();
                  $('.compare .compare-items .actions').show();     
                  $compareBlock.addClass('_active')         
                }else{
                  $('.compare').removeClass('have-items');
                  $('.compare .compare-items .empty').show();
                  $('.compare .compare-items .actions').hide();  
                  $compareBlock.removeClass('_active')                
                }
              }).animate({display: "inline"} , 500 );
            }
            
            // Обновляем ссылку, на которую будет уходить запрос и информацию о ней
            a.attr('href', a.attr('href').replace(new RegExp(from), to))
             .attr('title', newTitle)
             .attr('data-tooltip', newTooltip)
             .attr('data-action-is-add', newIsAddStatus);
          }
          
          var msgType = ('ok' == data.status) ? 'success' : 'error';
          var message = ('ok' == data.status) ? data.message.replace('сравнения', '<a href="/compare" class="underline">сравнения</a>') : data.message;
          var iconTemplate = ('ok' == data.status) ? '<span class="material-icons">done</span>' : '<span class="material-icons">close</span>';
          // Если есть функция, которая отображает сообщения пользователю
          if(typeof(Noty) == "function") {
            new Noty({
              text: '<div class="noty__content">'+ iconTemplate + '<div class="noty__content-text">' + message + '</div>' +'</div>',
              type: msgType,
              layout: "bottomRight",
              timeout: "2000",
              animation: {
                  open: 'animated fadeInRight', 
                  close: 'animated fadeOutRight',
                  easing: 'swing',
                  speed: 500                  
              }              
            }).show();                
          }

        }
      });
      return false;
    }
  });

  // Добавление/удаление товара на сравнение/избранное через ajax
  $('.add-wishlist').off('click').on('click', function(){
    // Объект ссылки, по которой кликнули
    var 
      a = $(this)
      ,addUrl = a.attr('data-action-add-url')
      ,delUrl = a.attr('data-action-delete-url')
      ,addTitle = a.attr('data-action-add-title')
      ,delTitle = a.attr('data-action-delete-title')
      ,isAdd = a.attr('data-action-is-add')
      ,aText = a.parent().find('.add-wishlist')
      ,pName = a.attr('data-prodname')
      ,pImage = a.attr('data-prodimage')
      ,pUrl = a.attr('data-produrl')
      ,pDataid = a.attr('data-id')
      ,pDataprice = a.attr('data-mod-id')
      ,pPrice = a.attr('data-mod-id-price')
      ,pDataGoodsid = a.attr('data-goodsid')
      ,addTooltip = a.attr('data-add-tooltip')
      ,delTooltip = a.attr('data-del-tooltip')
      requestUrl = a.attr('href')
    ;
    
    // Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
    if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
      requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsDataMainModificationId').val());
    }
    
    // Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
    if(addUrl && delUrl) {
      $.ajax({
        type : "POST",
        dataType: 'json',
        cache : false,
        url : requestUrl,
        data : {
          'ajax_q': 1
        },
        success: function(data) {          
          if(isAdd == 1){   
            $('.favorites-items .dropdown-items-list').prepend(
              "<li class=\"item\" data-id=\"" + pDataid +  "\">" +                 
                "<a href=\"" + pUrl + "\" title=\"" + pName + "\" class=\"product-image\">"+
                  "<img src=\"" + pImage + "\" alt=\"" + pName + "\" class=\"goods-image-icon\">"+
                "</a>"+
                "<div class=\"product-details\">"+
                  "<p class=\"product-name\">"+
                    "<a class=\"name\" href=\"" + pUrl + "\" title=\"" + pName + "\">" + pName + "</a>"+
                    "<a data-href=\"" + delUrl + "?id=" + pDataprice + "\" data-goods-mod-id=\"" + pDataprice + "\" class=\"item-remove material-icons\" title=\"Убрать товар из списка сравнения\" onclick=\"removeFromFavorites($(this))\">" +
                      "close" +
                    "</a>"+
                  "</p>"+
                  "<span class=\"price RUB\" data-price=\"" + pPrice + "\"><span><span class=\"num\">" + addSpaces(String(pPrice)) + "&nbsp;</span></span></span>"+
                "</div>"+
              "</li>"
            );
          } else {
            $('.favorites-items .dropdown-items-list').find('li.item[data-id="'+ pDataid +'"]').remove();
          }
          if('ok' == data.status) {
            if(isAdd == 1) {
              var 
                from = addUrl
                ,to = delUrl
                ,newIsAddStatus = 0
                ,newTitle = delTitle ? delTitle : ''
                ,newTooltip = delTooltip ? delTooltip : ''
              ;
              a.addClass('added');
            } else {
              var 
                from = delUrl
                ,to = addUrl
                ,newIsAddStatus = 1
                ,newTitle = addTitle ? addTitle : ''
                ,newTooltip = addTooltip ? addTooltip : ''
              ;
              a.removeClass('added');
            }
            
            // Если указано, что изменилось число товаров на сравнении
            if(typeof(data.favorites_goods_count) != 'undefined') {
              // Блок информации о том, что есть товары на сравнении
              var sidecount = $('.favorites .count');
              var $favoritesBlock = $('.header-iconsItem._favorites')  
              // Если на сравнении больше нет товаров
              // Указываем информацию о новом количестве товаров на сравнении
              // Блок обновления списка сравнения в каталога
              sidecount.animate({display: "none"},500,function(){
              sidecount.text(data.favorites_goods_count);                 
              sidecount.attr('data-count', data.favorites_goods_count);                 
                if(data.favorites_goods_count > 0){
                  $('.favorites').addClass('have-items');
                  $('.favorites .favorites-items .empty').hide();
                  $('.favorites .favorites-items .actions').show();
                  $favoritesBlock.addClass('_active')           
                }else{
                  $('.favorites').removeClass('have-items');
                  $('.favorites .favorites-items .empty').show();
                  $('.favorites .favorites-items .actions').hide();     
                  $favoritesBlock.removeClass('_active')               
                }
              }).animate({display: "inline"} , 500 );
            }
            
            // Обновляем ссылку, на которую будет уходить запрос и информацию о ней
            a.attr('href', a.attr('href').replace(new RegExp(from), to))
             .attr('title', newTitle)
             .attr('data-tooltip', newTooltip)
             .attr('data-action-is-add', newIsAddStatus);
          }
          
          var msgType = ('ok' == data.status) ? 'success' : 'error';
          var message = ('ok' == data.status) ? data.message.replace('избранное', '<a href="/user/favorites" class="underline">избранное</a>') : data.message;
          var iconTemplate = ('ok' == data.status) ? '<span class="material-icons">done</span>' : '<span class="material-icons">close</span>';
          // Если есть функция, которая отображает сообщения пользователю
          if(typeof(Noty) == "function") {
              new Noty({
                text: '<div class="noty__content">'+ iconTemplate + '<div class="noty__content-text">' + message + '</div>' +'</div>',
                type: msgType,
                layout: "bottomRight",
                timeout: "2000",
                animation: {
                    open: 'animated fadeInRight', 
                    close: 'animated fadeOutRight',
                    easing: 'swing',
                    speed: 500                  
                }              
              }).show();                
          }
          
        }
      });
      return false;
    }
  });
}
  
// Быстрый заказ
function quickOrder(formSelector) {
  // Находим форму, которую отправляем на сервер, для добавления товара в корзину
  var formBlock = $($(formSelector).get(0));
  // Проверка на существование формы отправки запроса на добавление товара в корзину
  if(1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
    alert('Не удалось найти форму добавления товара в корзину');
    return false;
  }
  // Получаем данные формы, которые будем отправлять на сервер
  var formData = formBlock.serializeArray();
  // Сообщаем серверу, что мы пришли через ajax запрос
  formData.push({name: 'ajax_q', value: 1});
  // Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа 
  formData.push({name: 'fast_order', value: 1});
  // Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
  $.ajax({
    type    : "POST",
    cache	  : false,
    url		  : formBlock.attr('action'),
    data		: formData,
    beforeSend: function () {
      loadFile('cartPage', 'css');
      loadFile('cartPage', 'js');
    },
    success: function(data) {
      $('.add-cart.quick._loading').removeClass('_loading').find('span').text("Купить в 1 клик")      
      $.fancybox.open(data, {
        keyboard: false,
        baseClass: "_quickOrder",
        afterShow(){
          var loaded = loadFile('cartPage', 'css') && loadFile('cartPage', 'js');

          if(loaded) {
            $(function(){ quickOrderScripts()});
            $(function(){ OrderScripts()});
            $(function(){ address()});
            $(function(){ coupons()});
            $('.zoneSelect select').off('change').on('change',function(){
              optValue = $(this).find('option:selected').attr('value');
              $('.zones input[value="'+optValue+'"]').click();
              WithZone =  $('.deliveryZoneRadio:checked').attr('price');
              $('.changeprice').text(WithZone); 
            });
            $(function () {
              preloadHide(null, true)
            });            
          }
        }
      })
    }
  });
  return false;
}

// Функция Быстрого просмотра товара c модификацией
function quickViewMod() {
  // Действие при нажатии на кнопку в корзину товара c модификацией
  $(function() {
    $(document).on('mouseover', '.item._with-mod', function (params) {
      var isLoad = loadFile('goodsPage', 'css') && loadFile('goodsPage', 'js');
      if(isLoad) {
        $(document).off('mouseover', '.item._with-mod');
      }     
    })
    $(document).on('click', 'a.quickviewmod', function() {
      if (!$(this).hasClass('quick')) {
        $(this).addClass('_loading');
      }      
      var href = $(this).attr('href');
      href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
      quickViewShowMod(href);
      return false;
    });
  });
}
// Быстрый просмотр товара с модификацией
function quickViewShowMod(href, atempt) {
  // Если массив с подгруженными заранее карточками товара для быстрого просмотра ещё не создан - создадим его.
  if(typeof(document.quickviewPreload) == 'undefined') {
    document.quickviewPreload = [];
  }
  var $btn = $('.quickviewmod._loading');
  $btn.find('.fal').remove();
  $btn.find('span').last().html('<i class="material-icons rotating">donut_large</i>')

  $.ajax({
    type    : "GET",
    cache	  : false,
    url		  : href,
    beforeSend: function () {
      loadFile('goodsPage', 'css');
      loadFile('goodsPage', 'js');
    },
    success: function(data) {
      $btn.removeClass('_loading').find('span').last().html('В корзину')

      $.fancybox.close();
      $.fancybox.open(data, {
        padding: 0,
        autoSize: true,
        maxWidth: 500,
        baseClass: "_modification",
        afterShow: function() {
          $('.fancybox-container._modification .block-bg').prepend('<div class="preloader"><span class="content-loading"></span></div>')          
          var isLoad = loadFile('goodsPage', 'css') && loadFile('goodsPage', 'js');

          if(isLoad){
            // Обновление доступности модификаций
            goodsMods($('.fancybox-content.product-view'));
            goodsPage();
            addCart();
            quantity();
            // Стилизация селектов
            $('.fancybox-inner .product-view [name="form[properties][]"]').styler();

            if($('.wrapper').hasClass('_cart-page')){
              $('.fancybox-inner .add-cart.button').addClass('_cart-page');
            }
            $('.fancybox-inner .product-view .product-order').removeClass('col-md-4 col-md-6 col-lg-6');
            $('.fancybox-container._modification .product-view .block-bg > .row').css({visibility: 'visible',opacity: 1})
            preloadHide($('.fancybox-container._modification .block-bg .preloader'), true);
          };
        }
      });
    }
  });

}


// Функция + - для товаров
function quantity() {
  //Regulator Up копки + в карточке товара при добавлении в корзину
  $('.qty-plus').off('click').click(function(){
    var 
      quantity = $(this).parent().find('.quantity, .cartqty'),
      currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal + 1);
      quantity.trigger('change');
      getTotalGoodPrice($(this), quantity.val());
    }
    return false;
  });
  //Regulator Down копки - в карточке товара при добавлении в корзину
  $('.qty-minus').off('click').click(function(){
    var 
      quantity = $(this).parent().find('.quantity, .cartqty'),
      currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal) && !(currentVal <= 1) ){
      quantity.val(currentVal - 1);
      quantity.trigger('change');
      getTotalGoodPrice($(this), quantity.val());
    }
    return false;
  });
  // Если вводят 0 то заменяем на 1
  $('.qty-wrap .quantity').off('change').on('change', function(){
    var $input = $(this);
    if($input.val() < 1){
      $input.val(1); 
    }
    getTotalGoodPrice($input, $input.val());
  });
  var getTotalGoodPrice = function ($el, goodsCount) {
    var $goodPriceBlock = $el.closest('.item').find('.total-good');
    var $priceBlock = $goodPriceBlock.find('.price')
    var goodPrice = $priceBlock.data('price');

    $priceBlock.find('.num').text(addSpaces(goodPrice * goodsCount));

    if(goodsCount > 1) {
      $goodPriceBlock.show()
    } else {
      $goodPriceBlock.hide()
    }
  }
}

// Удаление товара из Сравнения без обновлении страницы
function removeFromCompare(e){
  if(confirm('Вы точно хотите удалить товар из сравнения?')){
  var $link = $(e);
  var url = $link.data('href');
  var goodsModId = $link.attr('data-goods-mod-id');
  var $compareBlock = $('.compare').first();
  var compareCount = $compareBlock.find('.count').text();

  $('.compare').find('.item-remove[data-goods-mod-id='+ goodsModId +']').closest('.item').fadeOut().remove();
  $.ajax({ 
    cache : false,
    url		: url,
    success: function(){
      var oldCount = compareCount;
      var newCount = oldCount - 1;
      $('.compare .count').text(newCount).attr('data-count', newCount);
      
      if(newCount === 0){
          $('.compare').removeClass('have-items');
          $('.compare .compare-items .empty').show();
          $('.compare .actions').hide();
      }
      var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
      if(obj.length) {
        obj.attr("data-action-is-add", "1")
        .removeAttr("title")
        .removeClass("added")
        .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
      }
		}
  })
  }
}

// Удаление ВСЕХ товаров из Сравнения без обновлении страницы
function removeFromCompareAll(e){
  if(confirm('Вы точно хотите очистить сравнение?')){
  var del = e;
  var url = del.data('href');
  var $compareBlock = $('.compare').first();

  $.ajax({ 
    cache   : false,
    url		  : url,
    success: function(){
      // Очищаем активные кнопки сравнения на товарах
      $compareBlock.find('.item-remove').each(function(){
        var goodsModId = $(this).attr('data-goods-mod-id');
        var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');

        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }         
      })
      
      $('.compare').removeClass('have-items');
      $('.compare .count').text("0").attr('data-count',"0");
      $('.compare .actions').hide();
      $('.compare .compare-items .item').remove();
      $('.compare .compare-items .empty').show();
		}
  })
  }
}

// Удаление товара из Избранного без обновлении страницы
function removeFromFavorites(e){
  if(confirm('Вы точно хотите удалить товар из избранного?')){
  var $link = $(e);
  var url = $link.data('href');
  var goodsModId = $link.attr('data-goods-mod-id');
  var $favoriteBlock = $('.favorites').first();
  var favoriteCount = $favoriteBlock.find('.count').text();

  $('.favorites').find('.item-remove[data-goods-mod-id='+ goodsModId +']').closest('.item').fadeOut().remove();
  $.ajax({ 
    cache    : false,
    url		  : url,
    success: function(){
      var oldCount = favoriteCount;
      var newCount = oldCount - 1;
      $('.favorites .count').text(newCount).attr('data-count', newCount);
      
      if(newCount === 0){
          $('.favorites').removeClass('have-items');
          $('.favorites .favorites-items .empty').show();
          $('.favorites .actions').hide();          
        }
      var obj = $('.add-wishlist[data-mod-id="' + goodsModId + '"]');
      if(obj.length) {
        obj.attr("data-action-is-add", "1")
        .removeAttr("title")
        .removeClass("added")
        .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
      }
		}
  })
  }
}

// Удаление ВСЕХ товаров из Избранное без обновлении страницы
function removeFromFavoritesAll(e){
  if(confirm('Вы точно хотите очистить избранное?')){
  var del = e;
  var url = del.data('href');
  var $favoriteBlock = $('.favorites').first();

  $.ajax({ 
    cache   : false,
    url		  : url,
    success: function(d){
      // Очищаем активные кнопки избранное на товарах
      $favoriteBlock.find('.item-remove').each(function(){
        var goodsModId = $(this).attr('data-goods-mod-id');
        var obj = $('.add-wishlist[data-mod-id="' + goodsModId + '"]');
        
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }        
      })    
      
      $('.favorites').removeClass('have-items');
      $('.favorites .count').text("0").attr('data-count', '0');
      $('.favorites .actions').hide();
      $('.favorites .favorites-items .item').remove();
      $('.favorites .favorites-items .empty').show();
		}
  })
  }
}

// Удаление товара из корзины без обновлении страницы
function removeFromCart(e){
  if(confirm('Вы точно хотите удалить товар из корзины?')){
  var $link = e;  
  var goodsModId = $link.attr('data-goods-mod-id');
  var url = $link.data('href');
  var quantity = $link.data('count');
  var $cartBlock = $('.cart').first();
  var cartCount = $cartBlock.find('.header-toolsCounter').text();

  $('.cart').find('.item-remove[data-goods-mod-id='+ goodsModId +']').closest('.item').fadeOut().remove();

  $.ajax({
    cache   : false,
		url		  : url,
    success: function(d){
        var oldCount = cartCount
        var oldQuantity = quantity;
        var newCount = oldCount - oldQuantity;
        var $cartBlock = $('.cart');
        
        if(newCount === 0){
          $('.header-iconsItem._cart .header-iconsItem-icon').html("0").attr('data-count', 0);
          $cartBlock.find('.count').html("0").attr('data-count', "0");
          $cartBlock.find('.header-toolsContent').find('.price .num').text("0");
          $cartBlock.find('.dropdown-content._cart .dropdown-items-list').hide();
          $cartBlock.find('.dropdown-content._cart .cart-products-header').hide();
          $cartBlock.find('.dropdown-content._cart .subtotal').hide();
          $cartBlock.find('.dropdown-content._cart .actions').hide();
          $cartBlock.find('.dropdown-content._cart .empty').show();
        } else {
          $('.header-iconsItem._cart .header-iconsItem-icon').html(newCount).attr('data-count', newCount);
          $cartBlock.find('.count').text(newCount).attr('data-count',newCount);
          $cartBlock.find('.header-toolsContent').find('.price').html($(d).find('.total-sum').html());
          $cartBlock.find('.total-sum').html($(d).find('.total-sum').html()); 
          
          var $goodsCart = $('.goods-cart');
          var $goodsBtn = $('.add-cart._goods-page');

          $goodsCart.removeClass('_show');
          $goodsBtn.find('span').text('В корзину')          
        }
      }
    })
  }
}

// Удаление ВСЕХ товаров из Корзины без обновлении страницы
function removeFromCartAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить корзину?')){
  var $link = e;  
  $link.parent().fadeOut().remove();
  var url = $link.data('href');
  $.ajax({ 
    cache   : false,
    url		  : url,
    success: function(){
      $('.header-iconsItem._cart .header-iconsItem-icon').html('0').attr('data-count', '0');
      $('.cart .count').text("0").attr('data-count', "0");
      $('.cart .header-toolsContent').find('.price .num').text("0");
      $('.cart .dropdown-content._cart .dropdown-items-list').hide().html('');
      $('.cart .dropdown-content._cart .cart-products-header').hide();
      $('.cart .dropdown-content._cart .subtotal').hide();
      $('.cart .dropdown-content._cart .actions').hide();
      $('.cart .dropdown-content._cart .empty').show();
      var $goodsCart = $('.goods-cart');
      var $goodsBtn = $('.add-cart._goods-page');      

      $goodsCart.removeClass('_show');
      $goodsBtn.find('span').text('В корзину')       
		}
  })
  }
}

// Наверх
$(function(){
  // hide #back-top first
  $("#back-top").hide();
	// fade in #back-top
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 100) {
			$('#back-top').show()
		} else {
			$('#back-top').hide()
		}
	});
	// scroll body to 0px on click
	$('#back-top').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});

// Загрузчик файлов 
function loadFile(fileName, ext, cb){
  if(!fileName){console.error('Не передано имя загружаемого файла');return;}
  if(!ext){console.error('Не передано расширение загружаемого файла');return;}
  if(!(typeof cb === 'function')){cb = function(){}};

  var $file = $('#' + fileName + '-' + ext);  
  var attrName = (ext === 'css') ? 'href' : 'src';
  
  if(!$file.length){console.error('Файл не найден в разметке и не может быть загружен');return;}
  // Если файл уже загружен
  if($file.attr(attrName)){
    cb();
    // console.log('Already loaded');
    return (true);
  }
  $file.on('load', cb)
  $file.attr(attrName, $file.data(attrName));
}

// Предзагрузчик
function preloadHide(currentPreloader, nodelay) {
  var $preloader = currentPreloader || $('.preloader'),
  $spinner = $preloader.find('.content-loading');
  $spinner.fadeOut();
  $preloader.delay((nodelay)? 0 : 500).fadeOut('fast');
}

function preloadShow(currentPreloader) {
  var $preloader = currentPreloader || $('.preloader'),
  $spinner = $preloader.find('.content-loading');
  $spinner.show();
  $preloader.show();
}

// Адаптивное меню и каталог
function openMenu() {
// Иконки в мобильной версии
function headerIcons() {
  $('.header-icons').on('click', '.header-iconsItem', function(evt){
    var $icon = $(this);
    var id = $icon.attr('data-target');
    var $icons = $icon.siblings();
    console.log(id, id === '/');
    if(id === '#link'){
      document.location.href = $icon.attr('data-link');

      return;
    }
    $icons.each(function(index, icon){
      var id = $(icon).attr('data-target');
    
      $(icon).removeClass('_active');
      if(id !== '#link'){
        $(id).slideUp()
      }
    })
  
    $icon.toggleClass('_active')
    $(id).slideToggle()
  })
  
  $(document).on('click', function(e){
    if(getClientWidth() <= 767){
    if(!$(e.target).parents('.header-icons,._header-mobile').length && !$(e.target).hasClass('_header-mobile')) {
      $('._header-mobile').slideUp();
      $('.header-iconsItem').removeClass('_active');
    }
    }
  })
  }
  headerIcons();
  
  // Основной каталог в шапке
  function headerCatalog() {
    var e,
        $headerCatalog = $(".header-catalog"),
        $catalogIcon = $('.header-iconsItem._catalog'),
        $catalogBtn = $(".header-catalogBtn"),        
        $catalogBtnIcon = $catalogBtn.find('.header-catalogIcon'),        
        $catalogMenu = $(".header-catalogMenu"),
        $catalogItem = $(".header-catalogItem"),
        $headerSubcatalog = $(".header-subcatalog"),
        $headerOverlay = $(".header-overlay");                          
        $headerCloseBtn = $('.header-closeBtn')
        
        $headerCatalog.hover(
          function() {
            if (getClientWidth() > 992) {
              (e = setTimeout(function() {
                  $catalogBtn.addClass('_active')
                  // $catalogBtnIcon.text('close')   
                  blurPage()               
                  $catalogMenu.add($headerOverlay).addClass("_visible")
              }, 100))                                
            }
        },
          function() {
          if (getClientWidth() > 992) {
            (clearTimeout(e),
                setTimeout(function() {
                    $catalogBtn.removeClass('_active')
                    $catalogBtnIcon.text('drag_indicator')
                    unBlurPage()
                    $catalogMenu.add($headerOverlay).removeClass("_visible")
                }, 100))                              
          }
        });
        $catalogItem.hover(
          function() {
           if (getClientWidth() > 992) {
              $(this).find($headerSubcatalog).addClass("_visible");                              
            }
          },
          function() {
            if (getClientWidth() > 992) {
              $headerSubcatalog.removeClass("_visible")                              
            }
        })
      // Мобильная версия
      $catalogBtn.add($catalogIcon).click(function() {
        if (getClientWidth() <= 991) {
          // $catalogBtn.addClass('_blur');
          blurPage();
          $catalogMenu.add($headerOverlay).addClass("_visible");
          $("body").addClass("modal-open")                         
        }
      }),
      $headerOverlay.add($headerCloseBtn).click(function() {
        if (getClientWidth() <= 991) {
          // $catalogBtn.removeClass('_blur');
          unBlurPage();
          $catalogMenu.add($headerOverlay).removeClass("_visible");
          $("body").removeClass("modal-open")                              
        }
      })
      var $bluredElements = $('body .wrapper > div, .header-logo, .header-main-content__top, .header-main-content__bottom-wrap > div:not(.header-catalog)');
      function blurPage(){
        // $bluredElements.addClass('_blur')
      }
      function unBlurPage(){
        // $bluredElements.removeClass('_blur')
      }
      $catalogMenu.on('click', '.parent .header-arrow', function(evt){
        if (getClientWidth() <= 991) {
          evt.preventDefault()
          
          var $arrow = $(this);
          var $link = $arrow.parent();
          
          if($arrow.hasClass('active')){
            $arrow.removeClass('active')
            $link.removeClass('active').next('.sub').slideUp();
          } else {
            $arrow.addClass('active')
            $link.addClass('active').next('.sub').slideDown() ;
          }
          
        }                              
      });
  }
  headerCatalog();
  
  function removeActiveLinks(){
    if (getClientWidth() > 992) {
      var $headerCatalog = $('.header-catalogMenu');
      
      $headerCatalog.find('.header-catalogLink, .header-subcatalogTitle, .header-catalogMenu').removeClass('active');
      $headerCatalog.find('.header-subcatalog-third, .sub').show();
    }
  }
  $(window).on('resize', $.debounce(300, removeActiveLinks))

}
// Анимация кнопок Избранное, Сравение, Быстрый просмотр
$(function(){
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}
	var support = { animations : Modernizr.cssanimations },
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		onEndAnimation = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.animations ) {
					if( ev.target != this ) return;
					this.removeEventListener( animEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(); }
			};
			if( support.animations ) {
				el.addEventListener( animEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		},
		eventtype = mobilecheck() ? 'touchstart' : 'click';
  $('.add-wishlist, .add-compare').addClass('cbutton');
	[].slice.call( document.querySelectorAll( '.cbutton' ) ).forEach( function( el ) {
		el.addEventListener( eventtype, function( ev ) {
			classie.add( el, 'cbutton--click' );
			onEndAnimation( classie.has( el, 'cbutton--complex' ) ? el.querySelector( '.cbutton__helper' ) : el, function() {
				classie.remove( el, 'cbutton--click' );
			} );
		} );
	});
});
// Загрузка основных функций шаблона
$(function(){
  mainFunctions();
  addCart();
  addto();
  quantity();
  openMenu();  
  viewed();
  quickViewMod();
  mainnav();
});

// Запуск основных функций для разных разрешений экрана
$(function(){
  if(getClientWidth() > 767){
    
  }
  // Запуск функций при изменении экрана
  $(window).resize(function(){
    if(getClientWidth() > 767){
      
    }
  });
});

// Модальное окно
$(function(){
  function modal() {
    if(!$.cookie('modal')){
      // Если cookie не установлено появится окно с задержкой 3 секунды
      var delay = 3000;
      var data = $("#fancybox-popup").html();
      setTimeout(function(){
        $.fancybox.open(data, {
          autoSize: true,
          maxWidth: 700,
          padding: 15,
          content: data
        });       
      }, delay)
      
     // Запоминаем в куках, что посетитель уже заходил
     $.cookie('modal', true, {
      // Время хранения cookie в днях
       expires: 1,
       path: '/'
     });    
    }
  }  
  // Уберите комментарии // со строчек ниже для запуска
  // modal();
})
// Баннер уведомления
$(function(){
  function banner() {
    // Если в куках нет записи
    if(!$.cookie('banner-top')){
     var $bannerTop = $('.banner-top');
     // Показываем баннер
     $bannerTop.show()
     
     $('.banner-top .banner-top-closeBtn').on('click', function(){
       // Скрываем баннер
       $bannerTop.hide()
       // Запоминаем в куках, что посетитель уже заходил
       $.cookie('banner-top', true, {
        // Время хранения cookie в днях
         expires: 1,
         path: '/'
       });         
     })
    }
  }  
  // Уберите комментарии // со строчек ниже для запуска
  // banner();
})

// Дополнительные пункты меню в шапке Перенос пунктов меню
function mainnav(){
  var overMenuExist = $('.overflowMenu li').length;
  if(overMenuExist){
   $('.overflowMenu li').removeClass('mainnav__replaced');
   $('.mainnav .mainnav__more').remove();
   $('.overflowMenu li').each(function(){
     $('.mainnav .mainnav__list').append($(this));
   })
  }
  menuWidth = $('.mainnav').width();
  menuCount = $('.mainnav .mainnav__list li').length + 1;
  var nextCheck = 0;
  var CurrentWidthCounter = 0;
  for(var i=1; i < menuCount;  i++){
    currentWidth = parseInt(Math.ceil($('.mainnav .mainnav__list li:nth-child('+i+')').width())) + 46;
    nextCheck += currentWidth;
    if(nextCheck > menuWidth){
      var a = i;
      for(a;a < menuCount;a++){
        $('.mainnav .mainnav__list li:nth-child('+ a +')').addClass('mainnav__replaced');
      }
      $('.mainnav .mainnav__list').append('<li class="mainnav__item mainnav__more"><a class="mainnav__link">Ещё <span class="material-icons">keyboard_arrow_down</span></a></li>');
      $('.mainnav__more').append($('<ul>').addClass('overflowMenu'))
      $('.mainnav .mainnav__replaced').each(function(){
        $('.overflowMenu').append($(this));
      });
      menuMorePosition = parseInt($('.mainnav__more').position().left);
      $('.mainnav .mainnav__more').on('click',function(){
        $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');
        $('.overflowMenu').hasClass('active') ? $('.overflowMenu').removeClass('active') : $('.overflowMenu').addClass('active');
        $('.mainnav .mainnav__list').hasClass('active') ? $('.mainnav .mainnav__list').removeClass('active') : $('.mainnav .mainnav__list').addClass('active');
      });
      $(function($){
        $(document).on('mouseup', function (e){ 
          var div = $(".overflowMenu.active"); 
          var btn = $(".mainnav .mainnav__more");
          if (!div.is(e.target) && div.has(e.target).length === 0 && !btn.is(e.target)) {
            div.removeClass('active');
            btn.removeClass('active');
            $('.mainnav .mainnav__list').removeClass('active');
          }
        });
      });
      return false;
    }
  }
}
// Поиск в шапке
$(function(){
  function toggleSearch() {
    $('.header-search .search').toggleClass('_active');
    // $('.wrapper').toggleClass('_blur');
    // $('body .wrapper > div, .header-logo, .header-main-content__top, .header-main-content__bottom-wrap > div:not(.header-search) ').toggleClass('_blur')
  }
  $('.header-search .search-close').on('click', function(e){
    toggleSearch();
  }
  )
  $('.header-search .header-searchLink, .header-search .search-overlay').on('click', function(e){
    e.preventDefault()
    toggleSearch();
  })

})
// Файл в форме контактов
function feedbackPage(){
  $(function () {
    $('#feedback_file').on('change',function(e){
      var $btn = $('.file .button');
      var $clearBtn = $('#clear-file');
      
      if(e.target.files.length){
        var fileName = e.target.files[0].name;
        $btn.text(fileName);
        $clearBtn.show()
      } else {
        $btn.text('Выберите файл');
        $clearBtn.hide()
      }
    })
    $('#clear-file').on('click', function(){
      var $input = $('#feedback_file');
      
      if($input[0].files.length) {
        $input.val(null)
        $('.file .button').text('Выберите файл')
        $(this).hide()
      }
    })    
  })
}