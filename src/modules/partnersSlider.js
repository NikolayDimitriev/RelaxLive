const partnersSlider = () => {
    const partnersWrap = document.querySelector('.partners-wrap');

    let currentCount = 0, necessaryCount;

    partnersWrap.querySelector('#partners-arrow_left').style.display = 'none';

    if (screen.width > 768) {
        necessaryCount = 2;
    } else if (screen.width > 576) {
        necessaryCount = 3;
    } else {
        necessaryCount = 4;
    }

    partnersWrap.addEventListener('click', e => {
        const target = e.target;

        if (target.closest('#partners-arrow_left')) {
            currentCount--;
        } else if (target.closest('#partners-arrow_right')) {
            currentCount++;
        }

        if (currentCount === necessaryCount) {
            partnersWrap.querySelector('#partners-arrow_right').style.display = 'none';
        } else {
            partnersWrap.querySelector('#partners-arrow_right').style.display = 'flex';
        }

        if (currentCount === 0) {
            partnersWrap.querySelector('#partners-arrow_left').style.display = 'none';
        } else {
            partnersWrap.querySelector('#partners-arrow_left').style.display = 'flex';
        }
    });
};

export default partnersSlider;
