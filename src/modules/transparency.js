const transparency = () => {
    const transparency = document.getElementById('transparency'),
        sliderWrap = transparency.querySelector('.transparency-slider-wrap'),
        slider = transparency.querySelector('.transparency-slider'),
        sliderItem = [...slider.children];

    transparency.querySelector('#transparency-arrow_left').style.display = 'none';

    const style = document.createElement('style');
    style.id = 'transparencySlider-style';
    style.textContent = `
        @media (max-width: 1100px) {
            .transparency-slider {
                display: flex !important;
                flex-wrap: nowrap !important;
                transition: transform 0.5s !important;
            }
            .transparency-slider .transparency-item {
                min-width: 100% !important;
            }
            .transparency-slider-wrap {
                overflow: hidden !important;
            }
        }
    `;
    document.head.append(style);

    let currentSlide = 0;

    sliderWrap.addEventListener('click', e => {
        const target = e.target,
            itemWidth = parseFloat(getComputedStyle(sliderItem[0]).width);

        //событие нажатия на кнопку
        if (target.closest('#transparency-arrow_left')) {
            if (currentSlide > 0) {
                currentSlide--;
                slider.style.transform = `translateX(-${currentSlide * itemWidth}px)`;
            }
        } else if (target.closest('#transparency-arrow_right')) {
            if (currentSlide < 2) {
                currentSlide++;
                slider.style.transform = `translateX(-${currentSlide * itemWidth}px)`;
            }
        }

        //выключение кнопок
        if (currentSlide === 0) {
            transparency.querySelector('#transparency-arrow_left').style.display = 'none';
        } else {
            transparency.querySelector('#transparency-arrow_left').style.display = 'flex';
        }

        if (currentSlide === 2) {
            transparency.querySelector('#transparency-arrow_right').style.display = 'none';
        } else {
            transparency.querySelector('#transparency-arrow_right').style.display = 'flex';
        }
    });
};

export default transparency;
