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
        //клик в меню по кнопке "полный список услуг"
        } else if (menuDialog.matches('.active-menu') && target.closest('a.no-overflow')) {
            handlerMenu();
            popUpRepair.style.visibility = 'visible';
        //скрытие окна "список услуг"
        } else if (target.matches('.mobile-hide') && target.closest('.popup-repair-types')) {
            popUpRepair.style.visibility = 'hidden';
        //открытие "список услуг" не из меню
        } else if (target.closest('.link-list-repair')) {
            popUpRepair.style.visibility = 'visible';
        //закрытие окна об успешной отправки формы
        } else if (target.matches('.close-thank')) {
            document.querySelector('.popup-thank').style.visibility = 'hidden';
        //закрытие окна "политика конфиденциальности"
        } else if (target.matches('.mobile-hide') && target.closest('.popup-privacy')) {
            document.querySelector('.popup-privacy').style.visibility = 'hidden';
        //открытие окна "политика конфиденциальности"
        } else if (target.closest('span.link-privacy')) {
            document.querySelector('.popup-privacy').style.visibility = 'visible';
        //открытие окна "консультация"
        } else if (target.closest('button.button.button_wide')) {
            document.querySelector('.popup-consultation').style.visibility = 'visible';
        //закрытие окна "консультация"
        } else if (target.closest('.close.close-consultation')) {
            document.querySelector('.popup-consultation').style.visibility = 'hidden';
        }
    });
};

export default toggleMenuAndPopUp;
