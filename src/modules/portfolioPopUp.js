const portfolioPopUp = () => {
    const portfolio = document.getElementById('portfolio'),
        portfolioSlider = portfolio.querySelector('.portfolioSlider'),
        sliders = [...portfolioSlider.querySelectorAll('.portfolio-slider__slide-frame')],
        portfolioPopUp = document.querySelector('.popup-portfolio'),
        sliderPopUp = portfolioPopUp.querySelector('.popup-portfolio-slider'),
        slidesPopUp = [...sliderPopUp.children],
        currentCount = portfolioPopUp.querySelector('.slider-counter-content__current'),
        portfolioText = [...portfolioPopUp.querySelectorAll('.popup-portfolio-text')],
        leftBtn = portfolioPopUp.querySelector('#popup_portfolio_left'),
        rightBtn = portfolioPopUp.querySelector('#popup_portfolio_right');

    const style = document.createElement('style');
    style.id = 'portfolioSliderPopUp-style';
    style.textContent = `
        .popup-portfolio-text {
            margin-right: 80px !important;
        }
        .popup-portfolio-slider {
            transition: transform 0.5s !important;
        }
    `;
    document.head.append(style);

    sliderPopUp.parentNode.style.position = 'absolute';
    const togglePopUp = i => {
        const itemHeight = parseFloat(getComputedStyle(slidesPopUp[0]).height);

        portfolioPopUp.style.visibility = 'visible';
        currentCount.textContent = i + 1;
        portfolioText.forEach((item, index) => {
            if (index === i) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        sliderPopUp.style.transform = `translateY(-${i * itemHeight}px)`;
        if (i === 0) {
            leftBtn.style.display = 'none';
        } else if (i === 9) {
            rightBtn.style.display = 'none';
        }
    };

    let currentSlide = 0;
    portfolio.addEventListener('click', e => {
        const target = e.target;

        if (target.closest('.portfolio-slider__slide-frame')) {
            sliders.forEach((item, index) => {
                if (target === item) {
                    currentSlide = index;
                    togglePopUp(index);
                }
            });
        }
    });

    sliderPopUp.parentNode.addEventListener('click', e => {
        const target = e.target,
            itemHeight = parseFloat(getComputedStyle(slidesPopUp[0]).height);

        if (target.closest('#popup_portfolio_left')) {
            if (currentSlide > 0) {
                currentSlide--;
                sliderPopUp.style.transform = `translateY(-${currentSlide * itemHeight}px)`;
            }
        } else if (target.closest('#popup_portfolio_right')) {
            if (currentSlide < 9) {
                currentSlide++;
                sliderPopUp.style.transform = `translateY(-${currentSlide * itemHeight}px)`;
            }
        }
        portfolioText.forEach((item, index) => {
            if (index === currentSlide) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        currentCount.textContent = currentSlide + 1;

        if (currentSlide === 0) {
            leftBtn.style.display = 'none';
        } else {
            leftBtn.style.display = 'flex';
        }

        if (currentSlide === 9) {
            rightBtn.style.display = 'none';
        } else {
            rightBtn.style.display = 'flex';
        }
    });
};

export default portfolioPopUp;
