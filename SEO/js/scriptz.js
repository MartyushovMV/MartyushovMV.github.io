$(function() {      
  var slider = $('.slider1'),
    sliderContent = slider1.html(),                      // Содержимое слайдера
    slideWidth = $('.slider-box1').outerWidth(),         // Ширина слайдера
    slideCount = $('.slider1 img').length,               // Количество слайдов
    prev = $('.slider-box1 .prev'),                      // Кнопка "назад"
    next = $('.slider-box1 .next'),                      // Кнопка "вперед"
    sliderInterval = 15000,                              // Интервал смены слайдов
    animateTime = 0,                                 // Время смены слайдов
    course = 1,                                         // Направление движения слайдера (1 или -1)
    margin = - slideWidth;                              // Первоначальное смещение слайдов
 
  $('.slider1 img:last').clone().prependTo('.slider');   // Копия последнего слайда помещается в начало.
  $('.slider1 img').eq(1).clone().appendTo('.slider');   // Копия первого слайда помещается в конец.  
  $('.slider1').css('margin-left', -slideWidth);         // Контейнер .slider сдвигается влево на ширину одного слайда.
 
  function nextSlide(){                                 // Запускается функция animation(), выполняющая смену слайдов.
    interval = window.setInterval(animate, sliderInterval);
  }
 
  function animate(){
    if (margin==-slideCount*slideWidth-slideWidth){     // Если слайдер дошел до конца
      slider.css({'marginLeft':-slideWidth});           // то блок .slider возвращается в начальное положение
      margin=-slideWidth*2;
    }else if(margin==0 && course==-1){                  // Если слайдер находится в начале и нажата кнопка "назад"
      slider.css({'marginLeft':-slideWidth*slideCount});// то блок .slider перемещается в конечное положение
      margin=-slideWidth*slideCount+slideWidth;
    }else{                                              // Если условия выше не сработали,
    margin = margin - slideWidth*(course);              // значение margin устанавливается для показа следующего слайда
    }
    slider.animate({'marginLeft':margin},animateTime);  // Блок .slider смещается влево на 1 слайд.
  }
 
  function sliderStop(){                                // Функция преостанавливающая работу слайдера      
    window.clearInterval(interval);
  }
 
  prev.click(function() {                               // Нажата кнопка "назад"
    if (slider.is(':animated')) { return false; }       // Если не происходит анимация
    var course2 = course;                               // Временная переменная для хранения значения course
    course = -1;                                        // Устанавливается направление слайдера справа налево
    animate();                                          // Вызов функции animate()
    course = course2 ;                                  // Переменная course принимает первоначальное значение
  });
  next.click(function() {                               // Нажата кнопка "назад"
    if (slider.is(':animated')) { return false; }       // Если не происходит анимация
    var course2 = course;                               // Временная переменная для хранения значения course
    course = 1;                                         // Устанавливается направление слайдера справа налево
    animate();                                          // Вызов функции animate()
    course = course2 ;                                  // Переменная course принимает первоначальное значение
  });
 
  slider.add(next).add(prev).hover(function() {         // Если курсор мыши в пределах слайдера
    sliderStop();                                       // Вызывается функция sliderStop() для приостановки работы слайдера
  }, nextSlide);                                        // Когда курсор уходит со слайдера, анимация возобновляется.
 
  nextSlide();                                          // Вызов функции nextSlide()
});