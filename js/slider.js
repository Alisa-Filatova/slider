var $slide = $('.slide');
var translateWidth = 0;
var slideCurrent = 1;
var slideInterval = 3000;
var slideCount = $slide.length;
var $btnPrev = $('.nav__btn_prev');
var $btnNext = $('.nav__btn_next');
var paginatorIndex = 0;
var $paginatorBtn = $('.paginator__item');

/**
 * Функция переключения слайдов вперед
 */
function nextSlide() {
    // Сначала проверяем, не находимся ли мы сейчас на последнем слайде
    // или не уехал ли слайдер за границы диапазаона слайдов.
    // Если эти условия сработают - перемещаемся на первый слайд и обновляем значение slideCurrent = 1;
    // Если не сработают, то слайд сместится влево на ширину слайда * номер слайда.
    // После перехода на следующий слайд скажем slideCurrent,
    // чтобы он переключился на следующий по счету слайд slideCurrent++.

    if (slideCurrent <= 0 || slideCurrent >= slideCount) {
        $slide.css('transform', 'translate(0, 0)');

        slideCurrent = 1;
    } else {
        translateWidth = -$slide.width() * slideCurrent;
        $slide.css('transform', 'translate(' + translateWidth + 'px, 0)');
        slideCurrent++;
    }

    $('[data-slide="' + slideCurrent + '"]')
        .addClass('paginator__item_current')
        .siblings()
        .removeClass('paginator__item_current');
}

/**
 * Функция переключения слайдов назад
 */
function prevSlide() {
    // Делаем проверку на то, находимся ли мы на 1-ом слайде
    // или не уехал ли слайдер за границы диапазаона слайдов
    // и, в случае, если какое-то из условий сработает, перместимся на последний слайд
    // (сместится влево на ширину слайда * (кол-во слайдов - 1)).
    // Значение текущего слайда = Кол-ву слайдов.
    // Если мы не находимся на первом слайде, то нам нужно сместиться на 1 назад, для этого
    // ширину слайда * (номер текущего слайда – 2));
    // Затем пишем slideCurrent--, указывая на то, чтобы переключится на предыдущий слайд.
    if (slideCurrent == 1 || slideCurrent <= 0 || slideCurrent > slideCount) {
        translateWidth = -$slide.width() * (slideCount - 1);
        $slide.css('transform', 'translate(' + translateWidth + 'px, 0)');
        slideCurrent = slideCount;
    } else {
        translateWidth = -$slide.width() * (slideCurrent - 2);
        $slide.css('transform', 'translate(' + translateWidth + 'px, 0)');
        slideCurrent--;
    }

    $('[data-slide="' + slideCurrent + '"]')
        .addClass('paginator__item_current')
        .siblings()
        .removeClass('paginator__item_current');
}


// запуск перелистывания слайдера и его поведение при наведении мыши

var switchInterval = setInterval(nextSlide, slideInterval);

$slide.mouseenter(function() {
    clearInterval(switchInterval);
});

$slide.mouseleave(function() {
    switchInterval = setInterval(nextSlide, slideInterval);
});

/**
 * Кнопки переключения вправо и влево
 */
$btnNext.on('click', function() {
    nextSlide();
});

$btnNext.mouseenter(function() {
    clearInterval(switchInterval);
});

$btnNext.mouseleave(function() {
    switchInterval = setInterval(nextSlide, slideInterval);
});

$btnPrev.on('click', function() {
    prevSlide();
});

$btnPrev.mouseenter(function() {
    clearInterval(switchInterval);
});

$btnPrev.mouseleave(function() {
    switchInterval = setInterval(nextSlide, slideInterval);
});

/**
 * Кнопки переключения слайдов по номеру
 */
$paginatorBtn.on('click', function() {
    paginatorIndex = $(this).index();
    $(this).addClass('paginator__item_current')
    .siblings().removeClass('paginator__item_current');

    if (paginatorIndex + 1 != slideCurrent) {
        translateWidth = -$slide.width() * paginatorIndex;
        $slide.css('transform', 'translate(' + translateWidth + 'px, 0)');

        slideCurrent = paginatorIndex + 1;
    }
});

$paginatorBtn.mouseenter(function() {
    clearInterval(switchInterval);
});

$paginatorBtn.mouseleave(function() {
    switchInterval = setInterval(nextSlide, slideInterval);
});


