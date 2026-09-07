const transitions = {
    resizeTimer: null,
    onResize() {
        document.documentElement.classList.add('is-resizing');
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            document.documentElement.classList.remove('is-resizing');
        }, 400);
    },
    init() {
        this.onResize = this.onResize.bind(this);
        document.documentElement.classList.remove('is-loading');
        window.addEventListener('resize', this.onResize, { passive: true });
    },
};

transitions.init();