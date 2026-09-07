class Disclosure {
    constructor(container) {
        this.container = container;
        this.trigger = this.container.querySelector('.js-disclosure-trigger');
        this.panel = this.container.querySelector('.js-disclosure-panel');

        if (!this.trigger || !this.panel) return;

        this.toggle = this.toggle.bind(this);
        this.trigger.addEventListener('click', this.toggle);
    }

    toggle() {
        const isExpanded = this.trigger.getAttribute('aria-expanded') === 'true';

        this.trigger.setAttribute('aria-expanded', String(!isExpanded));
        this.panel.hidden = isExpanded;
    }
}

document.querySelectorAll('.js-disclosure').forEach((element) => new Disclosure(element));
