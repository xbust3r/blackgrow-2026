const backToTop = {
    init() {
        this.button = document.querySelector('.js-back-to-top');
        if (!this.button) return;

        this.threshold = 300;
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

        this.button.addEventListener('click', () => this.scrollToTop());
        this.onScroll();
    },

    onScroll() {
        const scrolled = window.scrollY;
        if (scrolled > this.threshold) {
            this.button.classList.remove('opacity-0', 'pointer-events-none');
            this.button.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            this.button.classList.remove('opacity-100', 'pointer-events-auto');
            this.button.classList.add('opacity-0', 'pointer-events-none');
        }
    },

    scrollToTop() {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });

        const target = document.querySelector('#main') || document.body;
        if (target) {
            target.tabIndex = -1;
            target.focus({ preventScroll: true });
        }
    },
};

backToTop.init();

export default backToTop;
