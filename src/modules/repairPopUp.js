const repairPopUp = () => {
    const popUpRepair = document.querySelector('.popup-repair-types'),
        linksOpenPopUp = document.querySelectorAll('.open-list-repair.link-list');
    const style = document.createElement('style');
    style.id = 'popUpRepair-style';
    style.textContent = `
        .nav-list-popup-repair .active {
            border: 2px solid #FFB015 !important;
        }
    `;
    document.head.append(style);

    const outputData = data => {
        //блок со всеми кнопками навигации
        const navListPopupRepair = document.querySelector('.nav-list-popup-repair');

        //добавляю кнопки в блок
        const getNavItems = () => {
            for (let i = 0; i < data.length - 1; i++) {
                if (i === 0) {
                    navListPopupRepair.innerHTML =
                            `<button class="button_o popup-repair-types-nav__item active">${data[i].title}</button>`;
                } else {
                    navListPopupRepair.innerHTML +=
                            `<button class="button_o popup-repair-types-nav__item">${data[i].title}</button>`;
                }
            }
        };

        getNavItems();

        //отображение контента
        const toggleContent = (index = 0) => {
            const contentBlock = popUpRepair.querySelector('.popup-repair-types-content-table'),
                contentTable = contentBlock.querySelector('table'),
                contentHeadTitle = popUpRepair.querySelector('.popup-repair-types-content__head-title');

            //добавляю название
            contentHeadTitle.innerHTML = data[index].title;

            //до тег <table>
            contentTable.innerHTML = '';
            for (let i = 0; i < data[index].priceList.length; i++) {
                contentTable.innerHTML += `<tr class="mobile-row showHide">
                            <td class="repair-types-name">${data[index].priceList[i].typeService}</td>
                            <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
                            <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
                            <td class="repair-types-value units">${data[index].priceList[i].units}</td>
                            <td class="repair-types-value">${data[index].priceList[i].cost}</td>
                        </tr>`;
            }

            //м2, чтоб двойка сверху была
            const unit = contentTable.querySelectorAll('.units');
            unit.forEach(elem => {
                elem.innerHTML = elem.innerHTML.replace(/(\d)/g, '<sup>$1</sup>');
            });
        };

        toggleContent();

        let activeItem = 0;

        const tabs = () => {
            //нахожу все кнопки
            const items = navListPopupRepair.querySelectorAll('.button_o');

            const toggleTab = index => {
                for (let i = 0; i < items.length; i++) {
                    if (index === i) {
                        items[i].classList.add('active');
                    } else {
                        items[i].classList.remove('active');
                    }
                }
            };

            navListPopupRepair.addEventListener('click', e => {
                const target = e.target;

                if (target.closest('.button_o')) {
                    items.forEach((item, i) => {
                        if (item === target) {
                            toggleTab(i);
                            toggleContent(i);
                            activeItem = i;
                        }
                    });
                }
            });
        };

        tabs();

        const slider = () => {
            const slides = popUpRepair.querySelectorAll('.popup-repair-types-nav__item');

            const prevSlide = (item, i, strClass) => {
                item[i].classList.remove(strClass);
                if (screen.width < 1024) {
                    const itemWidth = parseFloat(getComputedStyle(item[i]).width);
                    item[i].parentNode.style.transform = `translateX(-${i * (itemWidth + 50)}px)`;
                }
            };

            const nextSlide = (item, i, strClass) => {
                item[i].classList.add(strClass);
                if (screen.width < 1024) {
                    const itemWidth = parseFloat(getComputedStyle(item[i]).width);
                    item[i].parentNode.style.transform = `translateX(-${i * (itemWidth + 250)}px)`;
                }
                toggleContent(i);
            };

            popUpRepair.addEventListener('click', e => {
                const target = e.target;

                prevSlide(slides, activeItem, 'active');

                if (target.closest('#nav-arrow-popup-repair_right')) {
                    activeItem++;
                } else if (target.closest('#nav-arrow-popup-repair_left')) {
                    activeItem--;
                }

                if (activeItem >= slides.length) {
                    activeItem = 0;
                }

                if (activeItem < 0) {
                    activeItem = slides.length - 1;
                }

                nextSlide(slides, activeItem, 'active');
            });
        };

        slider();

    };

    //получение данных
    const getData = () => {
        let data;

        //перевожу данные в массив и отправляю на вывод
        const parse = obj => {
            data = JSON.parse(obj);
            outputData(data);
        };
        //обращаюсь к файлу, получаю данные
        const getFile = file => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    parse(request.responseText);
                }
            });

            request.open('GET', file);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send();
        };

        //получаю данные с файла
        getFile('./db/db.json');
    };


    //открываю модальное окно при клике, и получаю данные с файла
    linksOpenPopUp.forEach(item => {
        item.addEventListener('click', e => {
            if (e.target.closest('.open-list-repair')) {
                popUpRepair.classList.add('openPopUp');
                popUpRepair.style.visibility = 'visible';
                getData();
            }
        });
    });
};

export default repairPopUp;
