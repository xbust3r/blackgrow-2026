class ProductGallery {
    constructor(container) {
        this.container = container;
        this.mainImage = container.querySelector('.js-product-main');
        this.thumbs = container.querySelectorAll('.js-product-thumb');

        if (!this.mainImage || !this.thumbs.length) return;

        this.thumbs.forEach((thumb) => {
            thumb.addEventListener('click', (event) => {
                event.preventDefault();
                this.setActive(thumb);
            });
        });
    }

    setActive(selectedThumb) {
        const newSrc =
            selectedThumb.dataset.fullSrc ||
            selectedThumb.querySelector('img')?.getAttribute('src') ||
            selectedThumb.getAttribute('src');
        if (!newSrc) return;

        this.mainImage.src = newSrc;

        this.thumbs.forEach((thumb) => {
            const isActive = thumb === selectedThumb;
            thumb.setAttribute('aria-current', isActive ? 'true' : 'false');
            if (isActive) {
                thumb.classList.add('border-brand');
                thumb.classList.remove('border-transparent');
            } else {
                thumb.classList.remove('border-brand');
                thumb.classList.add('border-transparent');
            }
        });
    }
}

const initProductGalleries = () => {
    document
        .querySelectorAll('.js-product-gallery')
        .forEach((container) => new ProductGallery(container));
};

initProductGalleries();

export default ProductGallery;
