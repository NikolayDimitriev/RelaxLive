const repair = () => {
    const repair = document.getElementById('repair-types'),
        repairNavList = repair.querySelector('.nav-list-repair'),
        buttonsNav = [...repairNavList.querySelectorAll('.repair-types-nav__item')],
        sliderItem = [...repair.querySelector('.repairSingle-slider').children],
        currentCounter = repair.querySelector('.slider-counter-content__current'),
        totalCounter = repair.querySelector('.slider-counter-content__total');

    //стили для блоков в слайдере
    const style = document.createElement('style');
    style.id = 'repairSlider-style';
    style.textContent = `
        .repairSingle-slider {
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
        buttonsNav.forEach((item, index) => {
            if (index === i) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        sliderItem.forEach((item, index) => {
            if (index === i) {
                item.classList.add('repairSignle-slider_active');
                totalCounter.textContent = item.children.length;
            } else {
                item.classList.remove('repairSignle-slider_active');
            }
        });

        const widthSlide = parseFloat(getComputedStyle(sliderItem[0]).width);
        repair.querySelector('.repairSingle-slider').style.transform = `translateX(-${i * widthSlide}px)`;
    };

    const changeSlide = i => {
        let heightSlide;
        sliderItem.forEach(item => {
            if (item.matches('.repairSignle-slider_active')) {
                heightSlide = parseFloat(getComputedStyle(item.children[0]).height);
                item.style.transform = `translateY(-${i * heightSlide}px)`;
            }
        });
    };

    //перемененные для слайдера навигации
    let currentCount = 0;
    let necessaryCount;
    if (screen.width >= 1024) {
        necessaryCount = 3;
    } else if (screen.width >= 768) {
        necessaryCount = 4;
    } else if (screen.width >= 576) {
        necessaryCount = 4;
    } else {
        necessaryCount = 5;
    }

    //переменные для клика по стрелкам в слайдере
    let currentSlide = 0;

    repair.addEventListener('click', e => {
        const target = e.target,
            widthButton = parseFloat(getComputedStyle(buttonsNav[0]).width);

        //клик по табам
        if (target.closest('.repair-types-nav__item')) {
            currentCounter.textContent = 1;
            currentSlide = 0;
            buttonsNav.forEach((item, index) => {
                if (target === item) {
                    toggleTabContent(index);
                }
            });
            //обнуляем у всех слайдеров сдвиг
            sliderItem.forEach(item => {
                item.style.transform = `translateY(-0px)`;
            });
        //клик в слайдере по стрелочкам
        } else if (target.closest('#repair-types-arrow_left')) {
            if (currentSlide > 0) {
                currentSlide--;
                currentCounter.textContent = currentSlide + 1;
                changeSlide(currentSlide);
            }
        } else if (target.closest('#repair-types-arrow_right')) {
            if (currentSlide < +totalCounter.textContent - 1) {
                currentSlide++;
                currentCounter.textContent = currentSlide + 1;
                changeSlide(currentSlide);
            }
        //клик по стрелкам в навигации при адаптиве
        } else if (target.closest('#nav-arrow-repair-left_base')) {
            if (currentCount > 0) {
                currentCount--;
                repairNavList.style.transform = `translateX(-${currentCount * widthButton}px)`;
            }
        } else if (target.closest('#nav-arrow-repair-right_base')) {
            if (currentCount < necessaryCount) {
                currentCount++;
                repairNavList.style.transform = `translateX(-${currentCount * widthButton}px)`;
            }
        }
    });
};

export default repair;
