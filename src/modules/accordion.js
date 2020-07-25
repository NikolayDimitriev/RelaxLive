const accordion = () => {
    const accordion = document.querySelector('.accordion'),
        itemAccordion = [...accordion.querySelectorAll('.title_block')];

    const toggleAccordion = i => {
        itemAccordion.forEach((item, index) => {
            if (index === i) {
                item.classList.toggle('msg-active');
            } else {
                item.classList.remove('msg-active');
            }
        });
    };

    accordion.addEventListener('click', e => {
        const target = e.target;

        if (target.closest('h2.title_block')) {
            itemAccordion.forEach((item, index) => {
                if (item === target) {
                    toggleAccordion(index);
                }
            });
        }
    });
};

export default accordion;
