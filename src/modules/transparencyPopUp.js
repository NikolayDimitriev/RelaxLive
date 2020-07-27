const transparencyPopUp = () => {
    const popUp = document.querySelector('.popup-transparency'),
        slider = document.querySelector('.transparency-slider'),
        sliderItem = [...slider.children],
        popUpSlider = popUp.querySelector('.popup-transparency-slider'),
        popUpSliderItem = [...popUpSlider.children],
        currentCount = popUp.querySelector('.slider-counter-content__current'),
        leftBtn = popUp.querySelector('#transparency_left'),
        rightBtn = popUp.querySelector('#transparency_right');

    //стили для слайдера
    const style = document.createElement('style');
    style.id = 'popUpTransparencySlider-style';
    style.textContent = `
        .popupTransparencySingle-slide {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            transition: transform 0.5s !important;
        }
        .popupTransparencySingle-slide .popup-transparency-slider__slide {
            min-width: 100% !important;
        }
    `;
    document.head.append(style);


    const toggleSlide = i => {
        const itemWidth = parseFloat(getComputedStyle(popUpSliderItem[0]).width);
        currentCount.textContent = i + 1;
        popUpSlider.querySelector('.popupTransparencySingle-slide').style.transform = `translateX(-${i * itemWidth}px)`;
    };

    let currentSlide = 0;
    //открытие модального окна
    slider.addEventListener('click', e => {
        const target = e.target;

        if (target.closest('.transparency-item__img')) {
            popUp.style.visibility = 'visible';
        }
        sliderItem.forEach((item, index) => {
            if (target.parentNode === item) {
                currentSlide = index;
                toggleSlide(index);
            }
        });
        //появление/скрытие кнопок
        if (currentSlide === 0) {
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'flex';
        } else if (currentSlide === 2) {
            leftBtn.style.display = 'flex';
            rightBtn.style.display = 'none';
        } else if (currentSlide === 1) {
            leftBtn.style.display = 'flex';
            rightBtn.style.display = 'flex';
        }
    });

    popUp.addEventListener('click', e => {
        const target = e.target;

        //смена слайда при клике по
        if (target.closest('#transparency_left')) {
            if (currentSlide > 0) {
                currentSlide--;
                toggleSlide(currentSlide);
            }
        } else if (target.closest('#transparency_right')) {
            if (currentSlide < 2) {
                currentSlide++;
                toggleSlide(currentSlide);
            }
        //закртые окна "договоры"
        } else if (target.closest('.close') && target.closest('.popup-transparency')) {
            popUp.style.visibility = 'hidden';
            currentSlide = 0;
        }

        //появление/скрытие кнопок
        if (currentSlide === 0) {
            leftBtn.style.display = 'none';
        } else {
            leftBtn.style.display = 'flex';
        }

        if (currentSlide === 2) {
            rightBtn.style.display = 'none';
        } else {
            rightBtn.style.display = 'flex';
        }
    });
};
export default transparencyPopUp;
