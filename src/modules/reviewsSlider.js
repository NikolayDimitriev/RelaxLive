const reviewsSlider = () => {
    const reviews = document.getElementById('reviews'),
        slides = reviews.querySelectorAll('.reviews-slider__slide');

    const style = document.createElement('style');
    style.id = 'reviewsSlider-style';
    style.textContent = `
        .reviewsSingle-slider {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            transition: transform 0.5s !important;
        }
    `;
    document.head.append(style);

    let currentSlide = 0;

    reviews.querySelector('#reviews-arrow_left').style.display = 'none';

    reviews.addEventListener('click', e => {
        const target = e.target;

        if (target.closest('#reviews-arrow_right')) {
            currentSlide++;
            reviews.querySelector('.reviewsSingle-slider').style.transform = `translateX(-${currentSlide * 494}px)`;
        } else if (target.closest('#reviews-arrow_left')) {
            currentSlide--;
            reviews.querySelector('.reviewsSingle-slider').style.transform = `translateX(-${currentSlide * 494}px)`;
        }

        if (currentSlide === slides.length - 1) {
            reviews.querySelector('#reviews-arrow_right').style.display = 'none';
        } else {
            reviews.querySelector('#reviews-arrow_right').style.display = 'flex';
        }

        if (currentSlide === 0) {
            reviews.querySelector('#reviews-arrow_left').style.display = 'none';
        } else {
            reviews.querySelector('#reviews-arrow_left').style.display = 'flex';
        }

    });
};

export default reviewsSlider;
