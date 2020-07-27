const designs = () => {
    const designs = document.getElementById('designs'),
        designsList = designs.querySelector('.nav-list-designs'),
        navButtons = [...designsList.querySelectorAll('.designs-nav__item')],
        sliderItem = [...designs.querySelector('.designsSingle-slider').children],
        previewItem = [...designs.querySelectorAll('.preview-block')],
        designsCounter = designs.querySelector('#designs-counter'),
        currentCounter = designsCounter.querySelector('.slider-counter-content__current'),
        totalCounter = designsCounter.querySelector('.slider-counter-content__total');

    //стили для блоков в слайдере
    const style = document.createElement('style');
    style.id = 'designsSlider-style';
    style.textContent = `
        .designsSingle-slider {
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
            min-height: 100% !important;
            transition: transform 0.5s !important;
        `;
    });

    const toggleTabContent = i => {
        navButtons.forEach((item, index) => {
            if (index === i) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        previewItem.forEach((item, index) => {
            if (index === i) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
            }
        });
        sliderItem.forEach((item, index) => {
            if (index === i) {
                item.classList.add('designsSignle-slider_active');
                totalCounter.textContent = item.children.length;
            } else {
                item.classList.remove('designsSignle-slider_active');
            }
        });

        const widthSlide = parseFloat(getComputedStyle(sliderItem[0]).width);
        designs.querySelector('.designsSingle-slider').style.transform = `translateX(-${i * widthSlide}px)`;
    };

    const changeSlide = i => {
        let heightSlide;
        sliderItem.forEach(item => {
            if (item.matches('.designsSignle-slider_active')) {
                heightSlide = parseFloat(getComputedStyle(item.children[0]).height);
                item.style.transform = `translateY(-${i * heightSlide}px)`;
            }
        });
    };

    const toggleSlide = (i, array) => {
        array.forEach((item, index) => {
            if (index === i) {
                item.classList.add('preview_active');
            } else {
                item.classList.remove('preview_active');
            }
        });
        changeSlide(i);
    };

    //перемененные для слайдера навигации
    let currentCount = 0;
    const calcNecessartCount = () => {
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
        return necessaryCount;
    };

    document.addEventListener('resize', calcNecessartCount);

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
        //по клике на превью, меняем слайд
        } else if (target.closest('.preview-block')) {
            const parent = target.parentNode.parentNode;
            const parentItem = [...parent.children];
            parentItem.forEach((item, index) => {
                if (target.parentNode === item) {
                    toggleSlide(index, parentItem);
                }
            });
        //в навигации клики по стрелкам
        } else if (target.closest('#nav-arrow-designs_left')) {
            if (currentCount > 0) {
                currentCount--;
                designsList.style.transform = `translateX(-${currentCount * widthButton}px)`;
            }
        } else if (target.closest('#nav-arrow-designs_right')) {
            if (currentCount < calcNecessartCount()) {
                currentCount++;
                designsList.style.transform = `translateX(-${currentCount * widthButton}px)`;
            }
        //клики по стрелочка на слайде
        } else if (target.closest('#design_left')) {
            if (currentSlide > 0) {
                currentSlide--;
                currentCounter.textContent = currentSlide + 1;
                changeSlide(currentSlide);
            }
        } else if (target.closest('#design_right')) {
            if (currentSlide < +totalCounter.textContent - 1) {
                currentSlide++;
                currentCounter.textContent = currentSlide + 1;
                changeSlide(currentSlide);
            }
        //открытие модального окна
        } else if (target.closest('.link-list-designs')) {
            document.querySelector('.popup.popup-design').style.visibility = 'visible';
        }
    });

};

export default designs;
