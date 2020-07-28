const prompt = () => {
    const style = document.createElement('style');
    style.id = 'prompt';
    style.textContent = `
        .formula-item-popup-Rotated {
            transform: translateY(5px);
            padding-top: 35px;
            top: 155px;
        }
        .formula-item-popup-Rotated::before {
            transform: rotateZ(180deg)
        }
    `;
    document.head.append(style);
    document.querySelectorAll('.formula-item__icon').forEach(item => {
        item.addEventListener('mouseover', e => {
            const target = e.target;
            const parent = target.closest('.formula-item');
            parent.classList.add('active-item');

            const infoBlock = parent.querySelector('.formula-item-popup');
            parent.style.cssText = `z-index: 1;`;

            if (infoBlock.getBoundingClientRect().top < 5) {
                infoBlock.classList.add('formula-item-popup-Rotated');
            }
        });

        item.addEventListener('mouseout', e => {
            const target = e.target;
            const parent = target.closest('.formula-item');
            parent.classList.remove('active-item');

            const infoBlock = parent.querySelector('.formula-item-popup');
            infoBlock.classList.remove('formula-item-popup-Rotated');
            parent.removeAttribute('style');
        });

    });

};

export default prompt;
