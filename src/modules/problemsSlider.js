const problemsSlider = () => {
    const minWidth = parseFloat(getComputedStyle(document.querySelector('.problems-slider')).width);

    const style = document.createElement('style');
    style.id = 'problems-singleSlider';
    style.textContent = `
        .problems-singleSlider__wrap {
            overflow: hidden !important;
        }
        .problems-singleSlider {
            transform: translateX(-${minWidth}px);
            display: flex !important;
            align-items: flex-start !important;
            transition: transform 0.5s !important;
            will-change: transform !important;
        }
        .problems-singleSlider__item {
            display: flex !important;
            align-items: center;
            justify-content: center;
            min-width: ${minWidth}px !important;
        }
        .problems-slider .problems-item.prev-slide,
        .problems-slider .problems-item.next-slide {
            display: flex;
            opacity: 0.5;
        }
        @media (max-width: 768px) {
            .problems-singleSlider {
                min-width: 420px !important;
            }
        }
        @media (max-width: 568px) {
            .problems-singleSlider__item {
                min-width: 290px !important;
            }
        }
    `;
    document.head.append(style);

    const problemsWrap = document.querySelector('.problems-slider-wrap'),
        problemsSlider = problemsWrap.querySelector('.problems-slider');
    let problemsItem = problemsSlider.querySelectorAll('.problems-item.problems-slider__slide');

    problemsWrap.classList.add('problems-singleSlider__wrap');
    problemsSlider.classList.add('problems-singleSlider');

    problemsItem.forEach(item => {
        item.classList.add('problems-singleSlider__item');
    });

    if (screen.width <= 1024) {
        problemsSlider.insertBefore(problemsItem[problemsItem.length - 1], problemsItem[0]);
        problemsItem = problemsSlider.querySelectorAll('.problems-item.problems-slider__slide');

        problemsItem[0].classList.add('prev-slide');
        problemsItem[1].classList.add('active-item');
        problemsItem[2].classList.add('next-slide');

        const prevSlide = () => {
            problemsItem = problemsSlider.querySelectorAll('.problems-item.problems-slider__slide');
            problemsSlider.insertBefore(problemsItem[problemsItem.length - 1], problemsItem[0]);
            problemsItem = problemsSlider.querySelectorAll('.problems-item.problems-slider__slide');
            problemsItem[0].classList.add('prev-slide');
            problemsItem[1].classList.remove('prev-slide');
            problemsItem[1].classList.add('active-item');
            problemsItem[2].classList.remove('active-item');
            problemsItem[2].classList.add('next-slide');
            problemsItem[3].classList.remove('next-slide');
        };

        const nextSlide = () => {
            problemsItem = problemsSlider.querySelectorAll('.problems-item.problems-slider__slide');
            const carryOver = problemsSlider.removeChild(problemsItem[0]);
            problemsSlider.appendChild(carryOver).classList.remove('prev-slide', 'active');
            problemsItem = problemsSlider.querySelectorAll('.problems-item.problems-slider__slide');
            problemsItem[0].classList.remove('active-item');
            problemsItem[0].classList.add('prev-slide');
            problemsItem[1].classList.remove('next-slide');
            problemsItem[1].classList.add('active-item');
            problemsItem[2].classList.add('next-slide');
        };

        problemsWrap.addEventListener('click', e => {
            const target = e.target;

            if (target.closest('#problems-arrow_left')) {
                prevSlide();
            } else if (target.closest('#problems-arrow_right')) {
                nextSlide();
            }
        });

    }
};

export default problemsSlider;
