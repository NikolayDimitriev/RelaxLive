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
        console.log(target);
        if (target.matches('img.menu__icon')) {
            handlerMenu();
        } else if (target.matches('.close-menu')) {
            handlerMenu();
        } else if (menuDialog.matches('.active-menu') && target.tagName.toLowerCase() === 'a' &&
            target.parentNode.matches('.popup-menu-nav__item')) {
            e.preventDefault();

            const blockId = target.getAttribute('href');
            document.querySelector(blockId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            handlerMenu();
        } else if (target.matches('.button-footer')) {
            const blockId = target.firstChild.getAttribute('href');
            document.querySelector(blockId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } else if (target.matches('a') && target.parentNode.matches('button.button-footer')) {
            e.preventDefault();

            const blockId = target.getAttribute('href');
            document.querySelector(blockId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } else if (menuDialog.matches('.active-menu') &&
            (target.matches('a.no-overflow') || target.parentNode.matches('a.no-overflow') || target.parentNode.parentNode.matches('a.no-overflow'))) {
            handlerMenu();
            popUpRepair.style.visibility = 'hidden';
        } else if (target.matches('.mobile-hide') && target.parentNode.matches('.popup-repair-types')) {
            popUpRepair.style.visibility = 'hidden';
        } else if (target.tagName.toLowerCase() === 'a' && target.parentNode.matches('.link-list-repair')) {
            popUpRepair.style.visibility = 'hidden';
        } else if (target.matches('.close-thank')) {
            document.querySelector('.popup-thank').style.visibility = 'hidden';
        }
    });
};

export default toggleMenuAndPopUp;
