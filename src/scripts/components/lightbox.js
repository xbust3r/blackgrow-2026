import focus from '../tools/trap-focus.js';

const lightbox = {
    init() {
        const triggers = document.querySelectorAll('.js-lightbox');
        if (!triggers.length) return;

        this.createModal();
        this.items = [];
        this.currentIndex = 0;

        triggers.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                this.open(trigger);
            });
        });
    },

    createModal() {
        if (this.modal) return;

        this.modal = document.createElement('div');
        this.modal.className =
            'js-lightbox-modal fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4';
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-modal', 'true');
        this.modal.setAttribute('aria-label', 'Image preview');
        this.modal.hidden = true;

        this.modal.innerHTML = `
            <button class="js-lightbox-close absolute top-5 right-5 inline-flex size-11 items-center justify-center text-white hover:text-brand" type="button" aria-label="Close preview">
                <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <button class="js-lightbox-prev absolute left-5 inline-flex size-11 items-center justify-center text-white hover:text-brand" type="button" aria-label="Previous image">
                <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div class="flex max-h-[90vh] max-w-[90vw] items-center justify-center">
                <img class="js-lightbox-image max-h-[85vh] max-w-[85vw] object-contain rounded-card" src="" alt="">
            </div>
            <button class="js-lightbox-next absolute right-5 inline-flex size-11 items-center justify-center text-white hover:text-brand" type="button" aria-label="Next image">
                <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        `;

        document.body.appendChild(this.modal);

        this.imageElement = this.modal.querySelector('.js-lightbox-image');
        this.closeBtn = this.modal.querySelector('.js-lightbox-close');
        this.prevBtn = this.modal.querySelector('.js-lightbox-prev');
        this.nextBtn = this.modal.querySelector('.js-lightbox-next');

        this.closeBtn.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) this.close();
        });

        this.modal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') this.close();
            if (event.key === 'ArrowLeft') this.prev();
            if (event.key === 'ArrowRight') this.next();
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
        this.prevBtn.hidden = !hasMultiple;
        this.nextBtn.hidden = !hasMultiple;

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
