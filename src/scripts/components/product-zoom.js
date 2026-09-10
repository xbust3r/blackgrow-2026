/**
 * Zoom de la imagen principal en la ficha de producto.
 *
 * Al pasar el cursor sobre la imagen, se amplía siguiendo la posición
 * del puntero (transform-origin).
 *
 * Restricciones:
 * - Sólo con puntero fino (@media (pointer: fine)); en táctil no aplica.
 * - Respeta prefers-reduced-motion.
 * - No interfiere con el disparador del lightbox.
 */
class ProductZoom {
    constructor(container) {
        this.container = container;
        this.image = container.querySelector('.js-product-main');

        if (!this.image) return;

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        this.bindEvents();
    }

    bindEvents() {
        this.container.addEventListener('mouseenter', this.onMouseEnter);
        this.container.addEventListener('mousemove', this.onMouseMove);
        this.container.addEventListener('mouseleave', this.onMouseLeave);
    }

    isAllowed() {
        if (!window.matchMedia('(pointer: fine)').matches) return false;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
        return true;
    }

    onMouseEnter() {
        if (!this.isAllowed()) return;

        this.container.style.cursor = 'zoom-in';
        this.image.style.willChange = 'transform, transform-origin';
        this.image.style.transition = 'transform 0.2s ease-out';
        this.image.style.transform = 'scale(1.75)';
    }

    onMouseMove(event) {
        if (!this.isAllowed()) return;

        const rect = this.container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));

        this.image.style.transformOrigin = `${x}% ${y}%`;
    }

    onMouseLeave() {
        this.container.style.cursor = '';
        this.image.style.transition = 'transform 0.2s ease-out';
        this.image.style.transform = '';
        this.image.style.transformOrigin = '';
    }
}

const initProductZoom = () => {
    document
        .querySelectorAll('.js-product-zoom')
        .forEach((container) => new ProductZoom(container));
};

initProductZoom();

export default ProductZoom;
