const toggleMenuAndPopUp = () => {
    const menuDialog = document.querySelector('.popup-dialog-menu'),
        popUpRepair = document.querySelector('.popup-repair-types'),
        style = document.createElement('style');

    style.textContent = `
        .active-menu {
            transform: translate3d(0px, 0px, 0px);
        }
    `;
    style.id = 'toggleMenuStyle';
    document.head.append(style);

    const handlerMenu = () => {
        menuDialog.classList.toggle('active-menu');
    };

    document.body.addEventListener('click', e => {
        const target = e.target;

        //открытие меню по картинке
        if (target.matches('img.menu__icon')) {
            handlerMenu();
        //закрытие меню по кнопке
        } else if (target.matches('.close-menu')) {
            handlerMenu();
        //закрытие меню по клику на любую часть страницы
        } else if (menuDialog.matches('.active-menu') && !target.closest('.active-menu')) {
            handlerMenu();
        //переход по ссылка в меню
        } else if (menuDialog.matches('.active-menu') && target.tagName.toLowerCase() === 'a' &&
            target.closest('.popup-menu-nav__item')) {
            e.preventDefault();

            const blockId = target.getAttribute('href');
            document.querySelector(blockId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            handlerMenu();
        //кнопка "Вверх" клик по кнопке
        } else if (target.matches('.button-footer')) {
            const blockId = target.firstChild.getAttribute('href');
            document.querySelector(blockId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        //кнопка "Вверх" клик по ссылке
        } else if (target.matches('a') && target.closest('button.button-footer')) {
            e.preventDefault();

            const blockId = target.getAttribute('href');
            document.querySelector(blockId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        //клик в меню по кнопке "полный список услуг", закрывает меню
        } else if (menuDialog.matches('.active-menu') && target.closest('a.no-overflow')) {
            handlerMenu();
        //скрытие окна "список услуг"
        // eslint-disable-next-line max-len
        } else if ((target.matches('.close') && target.closest('.popup-repair-types')) || (target.closest('.openPopUp') && target.closest('.popup-repair-types') && !target.closest('.popup-dialog.popup-dialog-repair-types'))) {
            popUpRepair.style.visibility = 'hidden';
            popUpRepair.classList.remove('openPopUp');
        //закрытие окна об успешной отправки формы
        // eslint-disable-next-line max-len
        } else if (target.matches('.close-thank') || (target.closest('.popup-thank') && !target.closest('.feedback-wrap.popup-thank-bg') && target.closest('.openPopUp'))) {
            document.querySelector('.popup-thank').style.visibility = 'hidden';
            document.querySelector('.popup-thank').classList.remove('openPopUp');
        //закрытие окна "политика конфиденциальности"
        // eslint-disable-next-line max-len
        } else if ((target.matches('.mobile-hide') && target.closest('.popup-privacy')) || (target.closest('.openPopUp') && target.closest('.popup-privacy') && !target.closest('.popup-dialog.popup-dialog-privacy'))) {
            document.querySelector('.popup-privacy').style.visibility = 'hidden';
            document.querySelector('.popup-privacy').classList.remove('openPopUp');
        //открытие окна "политика конфиденциальности"
        } else if (target.closest('span.link-privacy')) {
            document.querySelector('.popup-privacy').style.visibility = 'visible';
            document.querySelector('.popup-privacy').classList.add('openPopUp');
        //открытие окна "консультация"
        } else if (target.closest('button.button.button_wide')) {
            document.querySelector('.popup-consultation').style.visibility = 'visible';
            document.querySelector('.popup-consultation').classList.add('openPopUp');
        //закрытие окна "консультация"
        // eslint-disable-next-line max-len
        } else if (target.closest('.close.close-consultation') || (target.closest('.openPopUp') && target.closest('.popup-consultation') && !target.closest('.feedback-wrap'))) {
            document.querySelector('.popup-consultation').style.visibility = 'hidden';
            document.querySelector('.popup-consultation').classList.remove('openPopUp');
        // eslint-disable-next-line max-len
        } else if ((target.closest('.close') && target.closest('.popup-design')) || (target.closest('.openPopUp') && target.closest('.popup-design') && !target.closest('.popup-dialog.popup-dialog-design'))) {
            document.querySelector('.popup.popup-design').style.visibility = 'hidden';
            document.querySelector('.popup.popup-design').classList.remove('openPopUp');
        //закрытие мод.окна "портфолео"
        // eslint-disable-next-line max-len
        } else if ((target.closest('.close') && target.closest('.popup-portfolio')) || (target.closest('.openPopUp') && target.closest('.popup-portfolio') && !target.closest('.popup-dialog.popup-dialog-portfolio'))) {
            document.querySelector('.popup-portfolio').style.visibility = 'hidden';
            document.querySelector('.popup-portfolio').classList.remove('openPopUp');
        }
    });
};

export default toggleMenuAndPopUp;
