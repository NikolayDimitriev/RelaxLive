//function

const toggleNumber = () => {

    //при клике на стрелоку открывается второй номер телефона
    //создаю дополнительные классы
    const style = document.createElement('style');
    style.textContent = `
        .header-contacts__click {
            position: relative;
            opacity: 1 !important;
        }
        .header-contacts__arrow-transform {
            transform: rotate(180deg);
        }
    `;
    style.id = 'phoneNumbers';
    //добавляю их в документ
    document.head.append(style);

    //отлавливаю событие клика
    document.querySelector('.header-contacts__arrow').addEventListener('click', () => {
        document.querySelector('.header-contacts__phone-number-accord').classList.toggle('header-contacts__click');

        document.querySelector('.header-contacts__phone-number-accord>.header-contacts__phone-number')
            .classList.toggle('header-contacts__click');

        document.querySelector('.header-contacts__arrow > img').classList.toggle('header-contacts__arrow-transform');
    });

};

export default toggleNumber;
