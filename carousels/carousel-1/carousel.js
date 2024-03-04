const buttons = document.querySelectorAll('button')

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const offset = button.dataset.carouselBtn === 'next' ? 1 : -1;
        const slides = button.closest('[data-carousel').querySelector('[data-slides]');
        const activeSlide = slides.querySelector('[data-active');
        const index = ( [...slides.children].indexOf(activeSlide) + offset ) % slides.children.length
        if (index !== -1) 
            slides.children[index].dataset.active = true;
        else
            slides.children[slides.children.length-1].dataset.active = true;
        // console.log(slides.children.lastChild)
        delete activeSlide.dataset.active;
    });
});