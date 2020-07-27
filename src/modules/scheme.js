const scheme = () => {
    const scheme = document.getElementById('scheme'),
        schemeNav = scheme.querySelector('.nav-wrap'),
        schemeList = scheme.querySelector('#scheme-list'),
        buttonsNav = [...scheme.querySelectorAll('.scheme-nav__item')],
        sliderItem = [...scheme.querySelectorAll('.scheme-slider__slide')],
        sliderDescription = [...scheme.querySelectorAll('.scheme-description-block')];

    //стили для блоков в слайдере
    const style = document.createElement('style');
    style.id = 'schemeSlider-style';
    style.textContent = `
        .schemeSingle-slider {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            transition: transform 0.5s !important;
        }
    `;
    document.head.append(style);
    sliderItem.forEach(item => {
        item.style.cssText = `
            min-width: 100% !important;
        `;
    });

    //функция меняющая активную кнопку в навигации
    //так же меняющая описание и слайд
    const toggleTabContent = i => {
        buttonsNav.forEach((item, index) => {
            if (index === i) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        sliderDescription.forEach((item, index) => {
            if (index === i) {
                item.classList.add('visible-content-block');
            } else {
                item.classList.remove('visible-content-block');
            }
        });
        const widthSlide = parseFloat(getComputedStyle(sliderItem[0]).width);
        scheme.querySelector('.schemeSingle-slider').style.transform = `translateX(-${i * widthSlide}px)`;
    };

    let currentCount = 0;
    const calcNecessartCount = () => {
        let necessaryCount;
        if (screen.width > 1024) {
            necessaryCount = 1;
        } else if (screen.width >= 768) {
            necessaryCount = 3;
        } else if (screen.width >= 576) {
            necessaryCount = 5;
        } else {
            necessaryCount = 7;
        }

        return necessaryCount;
    };

    document.addEventListener('resize', calcNecessartCount);

    schemeNav.addEventListener('click', e => {
        const target = e.target,
            widthButton = parseFloat(getComputedStyle(buttonsNav[0]).width);


        if (target.closest('.scheme-nav__item')) {
            buttonsNav.forEach((item, index) => {
                if (target === item) {
                    toggleTabContent(index);
                }
            });
        } else if (target.closest('#nav-arrow-scheme_right')) {
            if (currentCount < calcNecessartCount()) {
                currentCount++;
                schemeList.style.transform = `translateX(-${currentCount * widthButton}px)`;
            }
        } else if (target.closest('#nav-arrow-scheme_left')) {
            if (currentCount > 0) {
                currentCount--;
                schemeList.style.transform = `translateX(-${currentCount * widthButton}px)`;
            }
        }
    });



};

export default scheme;
