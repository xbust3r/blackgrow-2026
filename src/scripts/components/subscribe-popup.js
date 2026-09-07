import focus from '../tools/trap-focus.js';

const subscribePopup = {
    init() {
        this.trigger = document.querySelector('.js-subscribe-popup');
        this.dialog = document.querySelector('.js-subscribe-dialog');
        if (!this.trigger || !this.dialog) return;

        this.closeButton = this.dialog.querySelector('.js-subscribe-close');

        this.trigger.addEventListener('click', () => this.open());

        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.close());
        }

        this.dialog.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') this.close();
        });

        // Click outside dialog content closes modal
        this.dialog.addEventListener('click', (event) => {
            if (event.target === this.dialog) this.close();
        });
    },

    open() {
        this.dialog.hidden = false;
        this.trigger.setAttribute('aria-expanded', 'true');
        this.background = [...document.body.children].filter(
            (element) => !element.contains(this.dialog),
        );
        this.background.forEach((element) => {
            element.inert = true;
        });
        focus.trap(this.dialog);
    },

    close() {
        if (this.dialog.hidden) return;
        this.dialog.hidden = true;
        this.trigger.setAttribute('aria-expanded', 'false');
        if (this.background) {
            this.background.forEach((element) => {
                element.inert = false;
            });
        }
        focus.untrap(this.dialog);
    },
};

subscribePopup.init();

export default subscribePopup;
