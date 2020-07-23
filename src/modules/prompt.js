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
            e.target.parentNode.parentNode.classList.add('active-item');

            const infoBlock = e.target.previousSibling.previousSibling.previousSibling.previousSibling;
            infoBlock.parentNode.parentNode.style.cssText = `z-index: 1;`;

            if (infoBlock.getBoundingClientRect().top < 5) {
                infoBlock.classList.add('formula-item-popup-Rotated');
            }
        });

        item.addEventListener('mouseout', e => {
            e.target.parentNode.parentNode.classList.remove('active-item');
            const infoBlock = e.target.previousSibling.previousSibling.previousSibling.previousSibling;
            infoBlock.classList.remove('formula-item-popup-Rotated');
            infoBlock.parentNode.parentNode.removeAttribute('style');
        });

    });

};

export default prompt;
