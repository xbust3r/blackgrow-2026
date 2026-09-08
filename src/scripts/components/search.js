import focus from '../tools/trap-focus.js';

const search = {
    init() {
        this.triggers = document.querySelectorAll('.js-search-toggle');
        this.panel = document.querySelector('.js-search-overlay');
        if (!this.triggers.length || !this.panel) return;

        this.closeButton = this.panel.querySelector('.js-search-close');

        this.triggers.forEach((btn) => {
            btn.addEventListener('click', () => this.open(btn));
        });

        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.close());
        }

        this.panel.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') this.close();
        });

        this.panel.addEventListener('click', (event) => {
            if (event.target === this.panel) this.close();
        });
    },

    open(trigger) {
        this.panel.hidden = false;
        this.activeTrigger = trigger;
        this.triggers.forEach((btn) => btn.setAttribute('aria-expanded', 'true'));

        const topElements = [...document.body.children].filter((el) => !el.contains(this.panel));
        const parentSiblings = this.panel.parentElement && this.panel.parentElement !== document.body
            ? [...this.panel.parentElement.children].filter((el) => el !== this.panel)
            : [];
        this.background = [...topElements, ...parentSiblings];
        this.background.forEach((el) => { el.inert = true; });

        focus.trap(this.panel);
    },

    close() {
        if (this.panel.hidden) return;
        this.panel.hidden = true;
        this.triggers.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));

        if (this.background) {
            this.background.forEach((el) => { el.inert = false; });
        }

        focus.untrap(this.panel);

        if (this.activeTrigger) {
            this.activeTrigger.focus();
        }
    },
};

search.init();

export default search;
