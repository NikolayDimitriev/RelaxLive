const designsPopUp = () => {
    const designs = document.querySelector('.popup.popup-design'),
        designsList = designs.querySelector('.nav-list-designs'),
        navButtons = [...designsList.querySelectorAll('.designs-nav__item')],
        sliderItem = [...designs.querySelector('.designsPopUpSingle-slider').children],
        previewItem = [...designs.querySelectorAll('.popup-design-text')],
        designsCounter = designs.querySelector('#popup-designs-counter'),
        currentCounter = designsCounter.querySelector('.slider-counter-content__current'),
        totalCounter = designsCounter.querySelector('.slider-counter-content__total');

    // стили для блоков в слайдере
    const style = document.createElement('style');
    style.id = 'designsPopUpSlider-style';
    style.textContent = `
        .designsPopUpSingle-slider {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            transition: transform 0.5s !important;
        }
        .popup-design-slider-wrap {
            overflow: hidden !important;
        }
    `;
    document.head.append(style);
    sliderItem.forEach(item => {
        item.style.cssText = `
            min-width: 100% !important;
            min-height: 100% !important;
            transition: transform 0.5s !important;
        `;
    });

    const toggleTabContent = i => {
        //поменяли активную кнопку
        navButtons.forEach((item, index) => {
            if (index === i) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        //показали описание стиля
        previewItem.forEach((item, index) => {
            if (index === i) {
                item.classList.add('visible-content-block');
            } else {
                item.classList.remove('visible-content-block');
            }
        });
        //выделили отдельным классом активный стиль
        sliderItem.forEach((item, index) => {
            if (index === i) {
                item.classList.add('designsPopUpSingle-slider_active');
                totalCounter.textContent = item.children.length;
            } else {
                item.classList.remove('designsPopUpSingle-slider_active');
            }
        });
        //сделали сдвиг
        const widthSlide = parseFloat(getComputedStyle(sliderItem[0]).width);
        designs.querySelector('.designsPopUpSingle-slider').style.transform = `translateX(-${i * widthSlide}px)`;
    };

    const changeSlide = i => {
        let heightSlide;
        sliderItem.forEach(item => {
            if (item.matches('.designsPopUpSingle-slider_active')) {
                heightSlide = parseFloat(getComputedStyle(item.children[0]).height);
                item.style.transform = `translateY(-${i * heightSlide}px)`;
            }
        });
    };

    //перемененные для слайдера навигации
    let currentCount = 0;
    let necessaryCount;
    if (screen.width > 1024) {
        necessaryCount = 1;
    } else if (screen.width >= 768) {
        necessaryCount = 2;
    } else if (screen.width >= 576) {
        necessaryCount = 3;
    } else {
        necessaryCount = 4;
    }

    //переменные для клика по стрелкам в слайдере
    let currentSlide = 0;

    designs.addEventListener('click', e => {
        const target = e.target,
            widthButton = parseFloat(getComputedStyle(navButtons[0]).width);

        //нажали на кнопку, вызвали функцию поменяли слайдер и превью
        if (target.closest('.designs-nav__item')) {
            currentCounter.textContent = 1;
            currentSlide = 0;
            navButtons.forEach((item, index) => {
                if (target === item) {
                    toggleTabContent(index);
                }
            });
            //обнуляем у всех слайдеров сдвиг
            sliderItem.forEach(item => {
                item.style.transform = `translateY(-0px)`;
            });
        //в навигации клики по стрелкам
        } else if (target.closest('#nav-arrow-popup-designs_left')) {
            if (currentCount > 0) {
                currentCount--;
                designsList.style.transform = `translateX(-${currentCount * widthButton}px)`;
            }
        } else if (target.closest('#nav-arrow-popup-designs_right')) {
            if (currentCount < necessaryCount) {
                currentCount++;
                designsList.style.transform = `translateX(-${currentCount * widthButton}px)`;
            }
        //клики по стрелочка на слайде
        } else if (target.closest('#popup_design_left')) {
            if (currentSlide > 0) {
                currentSlide--;
                currentCounter.textContent = currentSlide + 1;
                changeSlide(currentSlide);
            }
        } else if (target.closest('#popup_design_right')) {
            if (currentSlide < +totalCounter.textContent - 1) {
                currentSlide++;
                currentCounter.textContent = currentSlide + 1;
                changeSlide(currentSlide);
            }
        }
    });

};

export default designsPopUp;
