const focus = {
    trigger: null,
    firstFocusableElement: null,
    lastFocusableElement: null,

    trap(element) {
        document.documentElement.classList.add('overflow-hidden');
        // store element that invoke the trap, usually a button
        this.trigger = document.activeElement;
        const focusable = element.querySelectorAll('select, input, textarea, button, a');

        this.firstFocusableElement = focusable[0];
        this.lastFocusableElement = focusable[focusable.length - 1];

        this.firstFocusableElement?.focus();

        this.checkTab = this.checkTab.bind(this);
        element.addEventListener('keydown', this.checkTab);
    },

    untrap(element) {
        document.documentElement.classList.remove('overflow-hidden');
        element.removeEventListener('keydown', this.checkTab);
        // return focus to the element that invoked the trap
        this.trigger?.focus();
    },

    checkTab(event) {
        if (event.key !== 'Tab') return;

        if (event.shiftKey) {
            // focus on first focusable element and you pressed tab + shift
            if (document.activeElement === this.firstFocusableElement) {
                event.preventDefault();
                this.lastFocusableElement.focus();
            }
        } else {
            // focus on last focusable element and you pressed tab
            if (document.activeElement === this.lastFocusableElement) {
                event.preventDefault();
                this.firstFocusableElement?.focus();
            }
        }
    },
};

export default focus;