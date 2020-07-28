const problems = () => {
    const problems = document.getElementById('problems'),
        problemsItems = [...problems.querySelectorAll('.problems-item')];

    const style = document.createElement('style');
    style.id = 'problems-style';
    style.textContent = `
        .problems-item-popup-Rotated {
            transform: translateY(5px);
            padding-top: 35px;
            top: 155px;
        }
        .problems-item-popup-Rotated::before {
            transform: rotateZ(180deg);
        }
        .active-item .problems-item__icon {
            width: 80px;
            height: 80px;
            box-shadow: 0 8px 40px rgba(254, 171, 23, .2);
        }
        .active-item .problems-item-popup {
            visibility: visible;
            opacity: 1;
            margin-top: 20px !important;
        }
        .active-item .problems-item__icon-inner {
            background: linear-gradient(90deg, #F48922 0%, #FFB015 100%);
            color: #FFF;
            opacity: 1;
        }
    `;
    document.head.append(style);

    problemsItems.forEach(item => {
        item.addEventListener('mouseover', e => {
            const target = e.target;

            if (target.closest('.problems-item__icon')) {
                const parent = target.closest('.problems-item');
                parent.classList.add('active-item');

                const infoBlock = parent.querySelector('.problems-item-popup');
                infoBlock.style.cssText = `z-index: 1;`;

                if (infoBlock.getBoundingClientRect().top < 5) {
                    infoBlock.classList.add('problems-item-popup-Rotated');
                }
            }
        });

        item.addEventListener('mouseout', e => {
            const target = e.target;
            if (target.closest('.problems-item__icon')) {
                const parent = target.closest('.problems-item');
                parent.classList.remove('active-item');

                const infoBlock = parent.querySelector('.problems-item-popup');
                infoBlock.classList.remove('problems-item-popup-Rotated');
                infoBlock.removeAttribute('style');
            }

        });

    });
};

export default problems;
