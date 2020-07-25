const promptSlider = () => {

    const style = document.createElement('style');
    style.id = 'formula-singleSlider';
    style.textContent = `
        .formula-singleSlider__wrap {
            overflow: hidden !important;
        }
        .formula-singleSlider {
            display: flex !important;
            align-items: flex-start !important;
            transition: transform 0.5s !important;
            will-change: transform !important;
        }
        .formula-singleSlider__item {
            display: flex !important;
            align-items: center;
            justify-content: center;
            flex: 0 0 33% !important;
        }
        .formula-slider .formula-item.prev-slide,
        .formula-slider .formula-item.next-slide {
            display: flex;
            opacity: 0.5;
        }
        @media (max-width: 850px) {
            .formula-singleSlider__item {
                flex: 0 0 100% !important;
            }
        }
    `;
    document.head.append(style);

    const formulaWrap = document.querySelector('.formula-slider-wrap'),
        formulaSlider = formulaWrap.querySelector('.formula-slider');
    let formulaItem = formulaSlider.querySelectorAll('.formula-item.formula-slider__slide');

    formulaWrap.classList.add('formula-singleSlider__wrap');
    formulaSlider.classList.add('formula-singleSlider');

    formulaItem.forEach(item => {
        item.classList.add('formula-singleSlider__item');
    });

    if (screen.width <= 1024) {
        if (screen.width < 768) {
            formulaSlider.style.transform = `translateX(-100%)`;
        }
        formulaSlider.insertBefore(formulaItem[formulaItem.length - 1], formulaItem[0]);
        formulaItem = formulaSlider.querySelectorAll('.formula-item.formula-slider__slide');

        formulaItem[0].classList.add('prev-slide');
        formulaItem[1].classList.add('active-item');
        formulaItem[2].classList.add('next-slide');

        const prevSlide = () => {
            formulaItem = formulaSlider.querySelectorAll('.formula-item.formula-slider__slide');
            formulaSlider.insertBefore(formulaItem[formulaItem.length - 1], formulaItem[0]);
            formulaItem = formulaSlider.querySelectorAll('.formula-item.formula-slider__slide');
            formulaItem[0].classList.add('prev-slide');
            formulaItem[1].classList.remove('prev-slide');
            formulaItem[1].classList.add('active-item');
            formulaItem[2].classList.remove('active-item');
            formulaItem[2].classList.add('next-slide');
            formulaItem[3].classList.remove('next-slide');
        };

        const nextSlide = () => {
            formulaItem = formulaSlider.querySelectorAll('.formula-item.formula-slider__slide');
            const carryOver = formulaSlider.removeChild(formulaItem[0]);
            formulaSlider.appendChild(carryOver).classList.remove('prev-slide', 'active');
            formulaItem = formulaSlider.querySelectorAll('.formula-item.formula-slider__slide');
            formulaItem[0].classList.remove('active-item');
            formulaItem[0].classList.add('prev-slide');
            formulaItem[1].classList.remove('next-slide');
            formulaItem[1].classList.add('active-item');
            formulaItem[2].classList.add('next-slide');
        };

        formulaWrap.addEventListener('click', e => {
            const target = e.target;

            if (target.closest('#formula-arrow_left')) {
                prevSlide();
            } else if (target.closest('#formula-arrow_right')) {
                nextSlide();
            }
        });

    }

};

export default promptSlider;
