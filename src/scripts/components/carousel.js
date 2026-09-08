class Carousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.js-carousel-track');
        this.prevBtn = container.querySelector('.js-carousel-prev');
        this.nextBtn = container.querySelector('.js-carousel-next');

        if (!this.track) return;

        this.scrollRaf = null;

        this.onScroll = this.onScroll.bind(this);
        this.onPrevClick = this.onPrevClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onResize = this.onResize.bind(this);

        this.bindEvents();
        this.updateButtons();
    }

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', this.onPrevClick);
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', this.onNextClick);
        }

        this.track.addEventListener('scroll', this.onScroll, { passive: true });
        window.addEventListener('resize', this.onResize, { passive: true });
    }

    getScrollAmount() {
        const firstItem = this.track.querySelector('.snap-start');
        if (firstItem) {
            const itemWidth = firstItem.getBoundingClientRect().width;
            return Math.max(itemWidth, this.track.clientWidth * 0.75);
        }
        return this.track.clientWidth * 0.75;
    }

    scroll(direction) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const behavior = prefersReducedMotion ? 'auto' : 'smooth';
        const amount = this.getScrollAmount() * direction;

        this.track.scrollBy({ left: amount, behavior });
    }

    onPrevClick() {
        this.scroll(-1);
    }

    onNextClick() {
        this.scroll(1);
    }

    onScroll() {
        if (this.scrollRaf) cancelAnimationFrame(this.scrollRaf);
        this.scrollRaf = requestAnimationFrame(() => this.updateButtons());
    }

    onResize() {
        this.updateButtons();
    }

    updateButtons() {
        if (!this.prevBtn && !this.nextBtn) return;

        const maxScrollLeft = this.track.scrollWidth - this.track.clientWidth;
        const currentScroll = this.track.scrollLeft;
        const tolerance = 2;

        if (this.prevBtn) {
            this.prevBtn.disabled = currentScroll <= tolerance;
        }

        if (this.nextBtn) {
            this.nextBtn.disabled = maxScrollLeft <= 0 || currentScroll >= maxScrollLeft - tolerance;
        }
    }
}

const initCarousels = () => {
    document
        .querySelectorAll('.js-carousel')
        .forEach((container) => new Carousel(container));
};

initCarousels();

export default Carousel;
