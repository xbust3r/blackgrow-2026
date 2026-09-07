class InteractiveLinkShowcase {
    constructor(container) {
        this.container = container;
        this.links = container.querySelectorAll('[data-showcase-index]');
        this.images = container.querySelectorAll('[data-showcase-target]');

        if (!this.links.length || !this.images.length) return;

        this.links.forEach((link) => {
            const index = link.dataset.showcaseIndex;
            link.addEventListener('mouseenter', () => this.show(index));
            link.addEventListener('focus', () => this.show(index));
        });
    }

    show(targetIndex) {
        this.images.forEach((img) => {
            const isMatch = img.dataset.showcaseTarget === String(targetIndex);
            if (isMatch) {
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100', 'js-showcase-active');
            } else {
                img.classList.remove('opacity-100', 'js-showcase-active');
                img.classList.add('opacity-0');
            }
        });
    }
}

const initShowcases = () => {
    document
        .querySelectorAll('.js-link-showcase')
        .forEach((container) => new InteractiveLinkShowcase(container));
};

initShowcases();

export default InteractiveLinkShowcase;
