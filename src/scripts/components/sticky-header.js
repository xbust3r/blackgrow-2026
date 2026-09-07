const stickyHeader = {
    init() {
        this.element = document.querySelector('.js-sticky-header');
        if (!this.element) return;

        this.threshold = 250;
        this.ticking = false;

        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.onScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });

        this.onScroll();
    },

    onScroll() {
        const scrolled = window.scrollY;
        if (scrolled > this.threshold) {
            this.element.classList.remove('-translate-y-full');
            this.element.classList.add('translate-y-0');
            this.element.inert = false;
        } else {
            this.element.classList.remove('translate-y-0');
            this.element.classList.add('-translate-y-full');
            this.element.inert = true;
        }
    },
};

stickyHeader.init();

export default stickyHeader;
