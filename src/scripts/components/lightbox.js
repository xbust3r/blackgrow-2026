import focus from '../tools/trap-focus.js';

const lightbox = {
    init() {
        const triggers = document.querySelectorAll('.js-lightbox');
        this.modal = document.querySelector('.js-lightbox-modal');
        if (!triggers.length || !this.modal) return;

        this.items = [];
        this.currentIndex = 0;

        this.imageElement = this.modal.querySelector('.js-lightbox-image');
        this.closeBtn = this.modal.querySelector('.js-lightbox-close');
        this.prevBtn = this.modal.querySelector('.js-lightbox-prev');
        this.nextBtn = this.modal.querySelector('.js-lightbox-next');

        this.closeBtn?.addEventListener('click', () => this.close());
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) this.close();
        });

        this.modal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') this.close();
            if (event.key === 'ArrowLeft') this.prev();
            if (event.key === 'ArrowRight') this.next();
        });

        triggers.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                this.open(trigger);
            });
        });
    },

    open(trigger) {
        const galleryName = trigger.dataset.lightboxGallery;
        if (galleryName) {
            this.items = Array.from(
                document.querySelectorAll(
                    `.js-lightbox[data-lightbox-gallery="${galleryName}"]`,
                ),
            );
        } else {
            this.items = [trigger];
        }

        this.currentIndex = this.items.indexOf(trigger);
        if (this.currentIndex === -1) this.currentIndex = 0;

        this.updateImage();

        const hasMultiple = this.items.length > 1;
        if (this.prevBtn) this.prevBtn.hidden = !hasMultiple;
        if (this.nextBtn) this.nextBtn.hidden = !hasMultiple;

        this.modal.hidden = false;
        this.background = [...document.body.children].filter(
            (element) => element !== this.modal,
        );
        this.background.forEach((element) => {
            element.inert = true;
        });
        focus.trap(this.modal);
    },

    updateImage() {
        const currentItem = this.items[this.currentIndex];
        if (!currentItem) return;

        const src = currentItem.getAttribute('href') || currentItem.dataset.lightboxSrc;
        const alt = currentItem.querySelector('img')?.alt || currentItem.getAttribute('aria-label') || '';

        this.imageElement.src = src;
        this.imageElement.alt = alt;
    },

    prev() {
        if (this.items.length <= 1) return;
        this.currentIndex =
            (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateImage();
    },

    next() {
        if (this.items.length <= 1) return;
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateImage();
    },

    close() {
        if (this.modal.hidden) return;
        this.modal.hidden = true;
        this.imageElement.src = '';
        if (this.background) {
            this.background.forEach((element) => {
                element.inert = false;
            });
        }
        focus.untrap(this.modal);
    },
};

lightbox.init();

export default lightbox;
