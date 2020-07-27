const portfolio = () => {
    const portfolio = document.getElementById('portfolio'),
        portfolioWrap = portfolio.querySelector('.portfolio-slider-wrap'),
        customSlider = portfolioWrap.querySelector('.portfolioSlider'),
        customMobileSlider = portfolioWrap.querySelector('.portfolioMobileSlider'),
        sliderItem = [...customSlider.querySelectorAll('.portfolio-slider__slide')],
        sliderMobileItem = [...customMobileSlider.querySelectorAll('.portfolio-slider__slide-frame')],
        currentCount = portfolioWrap.querySelector('.slider-counter-content__current');

    const style = document.createElement('style');
    style.id = 'portfolioSlider-style';
    style.textContent = `
        .portfolioSlider {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            transition: transform 0.5s !important;
        }
        .portfolioMobileSlider {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.5s !important;
        }
    `;
    document.head.append(style);

    let currentSlide = 0,
        necessaryCount,
        winWidth = screen.width;

    //в самом начале левые кнопки слайдера скрыты
    portfolioWrap.querySelector('#portfolio-arrow-mobile_left').style.display = 'none';
    portfolioWrap.querySelector('#portfolio-arrow_left').style.display = 'none';


    //изменяю ширину элементов при изменении ширины экрана
    const changeWidthItem = (width, count) => {
        sliderItem.forEach(item => {
            item.style.cssText = `min-width: ${width / count}px;`;
        });
    };

    //изменяю необхомое число кликов, что б достичь правой стороны
    const changeWindowWidth = () => {
        winWidth = screen.width;
        if (screen.width > 1140) {
            necessaryCount = 2;
            changeWidthItem(parseFloat(getComputedStyle(customSlider).width), 3);
        } else if (screen.width > 900) {
            necessaryCount = 3;
            changeWidthItem(parseFloat(getComputedStyle(customSlider).width), 2);
        } else if (screen.width >= 576) {
            necessaryCount = 4;
            changeWidthItem(parseFloat(getComputedStyle(customSlider).width), 1);
        } else if (screen.width < 576) {
            necessaryCount = 9;
        }

        //на маленьком экране, включаем кнопку
        if (winWidth < 576) {
            portfolioWrap.querySelector('#portfolio-arrow-mobile_right').removeAttribute('disabled');
            portfolioWrap.querySelector('#portfolio-arrow-mobile_right').style.cssText = `z-index: 1000;`;
        } else {
            portfolioWrap.querySelector('#portfolio-arrow-mobile_right').setAttribute("disabled", "disabled");
        }

        return necessaryCount;
    };

    window.addEventListener('resize', () => {
        currentSlide = 0;
        customSlider.style.transform = `translateX(-0px)`;
        if (screen.width >= 576) {
            portfolioWrap.querySelector('#portfolio-arrow_right').style.display = 'flex';
            portfolioWrap.querySelector('#portfolio-arrow_left').style.display = 'none';
        } else {
            portfolioWrap.querySelector('#portfolio-arrow_right').style.display = 'none';
            portfolioWrap.querySelector('#portfolio-arrow_left').style.display = 'none';
        }
        currentCount.textContent = currentSlide + 1;
        changeWindowWidth();
    });

    portfolioWrap.addEventListener('click', e => {
        const target = e.target,
            itemWidth = parseFloat(getComputedStyle(sliderItem[0]).width),
            itemHeight = parseFloat(getComputedStyle(sliderMobileItem[0]).height);

        //нажатие на кнопки в компьютерной версии
        if (target.closest('#portfolio-arrow_left')) {
            if (currentSlide > 0) {
                currentSlide--;
                customSlider.style.transform = `translateX(-${currentSlide * itemWidth}px)`;
            }
        } else if (target.closest('#portfolio-arrow_right')) {
            if (currentSlide < changeWindowWidth()) {
                currentSlide++;
                customSlider.style.transform = `translateX(-${currentSlide * itemWidth}px)`;
            }
        //нажатие на кнопки в мобиле
        } else if (target.closest('#portfolio-arrow-mobile_left')) {
            if (currentSlide > 0) {
                currentSlide--;
                customMobileSlider.style.transform = `translateY(-${currentSlide * itemHeight}px)`;
            }
        } else if (target.closest('#portfolio-arrow-mobile_right')) {
            if (currentSlide < 9) {
                currentSlide++;
                customMobileSlider.style.transform = `translateY(-${currentSlide * itemHeight}px)`;
            }
        }
        currentCount.textContent = currentSlide + 1;

        if (winWidth >= 576) {
            //скрываю левую кнопку в десктомном слайдере, если 0 элемент активен
            if (currentSlide === 0) {
                portfolioWrap.querySelector('#portfolio-arrow_left').style.display = 'none';
            } else {
                portfolioWrap.querySelector('#portfolio-arrow_left').style.display = 'flex';
            }
            //скрываю правую кнопку в дескотоном слайдере
            if (currentSlide === changeWindowWidth()) {
                portfolioWrap.querySelector('#portfolio-arrow_right').style.display = 'none';
            } else {
                portfolioWrap.querySelector('#portfolio-arrow_right').style.display = 'flex';
            }

        } else {
            //скрываю правую кнопку в мобильном слайдере
            if (currentSlide === 9) {
                portfolioWrap.querySelector('#portfolio-arrow-mobile_right').style.display = 'none';
            } else {
                portfolioWrap.querySelector('#portfolio-arrow-mobile_right').style.display = 'flex';
            }
            //скрываю правую кнопку в mobile слайдере
            if (currentSlide === 0) {
                portfolioWrap.querySelector('#portfolio-arrow-mobile_left').style.display = 'none';
            } else {
                portfolioWrap.querySelector('#portfolio-arrow-mobile_left').style.display = 'flex';
            }

        }


    });

};

export default portfolio;
