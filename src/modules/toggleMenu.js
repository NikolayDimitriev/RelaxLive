const toggleMenu = () => {
    const menuDialog = document.querySelector('.popup-dialog-menu'),
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

        if (target.matches('img.menu__icon')) {
            handlerMenu();
        } else if (target.matches('.close-menu')) {
            handlerMenu();
        } else if (menuDialog.matches('.active-menu') && target.tagName.toLowerCase() === 'a') {
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
        }
    });
};

export default toggleMenu;
