import focus from '../tools/trap-focus.js';

const menu = {
    init() {
        this.trigger = document.querySelector('.js-menu-toggle');
        this.panel = document.querySelector('.js-mobile-menu');
        if (!this.trigger || !this.panel) return;
        this.trigger.addEventListener('click', () => this.open());
        this.panel.querySelector('.js-menu-close').addEventListener('click', () => this.close());
        this.panel.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') this.close();
        });
        this.panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => this.close()));
        window.matchMedia('(min-width: 43.75rem)').addEventListener('change', (event) => {
            if (event.matches && !this.panel.hidden) this.close();
        });
    },
    open() {
        this.panel.hidden = false;
        this.trigger.setAttribute('aria-expanded', 'true');
        this.background = [...document.body.children].filter((element) => !element.contains(this.panel));
        this.background.forEach((element) => { element.inert = true; });
        focus.trap(this.panel);
    },
    close() {
        if (this.panel.hidden) return;
        this.panel.hidden = true;
        this.trigger.setAttribute('aria-expanded', 'false');
        this.background.forEach((element) => { element.inert = false; });
        focus.untrap(this.panel);
    },
};
menu.init();
