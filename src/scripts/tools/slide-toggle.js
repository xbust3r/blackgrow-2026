const slide = {
    toggle(trigger, element, ms) {
        // stop excecution if animation is running
        if (element.dataset.animating === 'true') return;

        // check if element is open by default (I'm looking at you stupid first child of accordeon)
        const open = element.classList.contains('is-visible');
        element.dataset.animating = 'true';

        open ? this.close(trigger, element, ms) : this.open(trigger, element, ms);
    },
    open(trigger, element, ms) {
        trigger.classList.add('is-active');
        trigger.ariaExpanded = 'true';
        element.style.display = 'block';
        const height = window.getComputedStyle(element).getPropertyValue('height');
        let animation = element.animate(
            { height: [0, height] },
            { duration: ms },
        );
        animation.addEventListener('finish', () => {
            element.classList.add('is-visible');
            element.dataset.animating = 'false';
            animation = null;
        }, { once: true });
    },
    close(trigger, element, ms) {
        trigger.classList.remove('is-active');
        trigger.ariaExpanded = 'false';
        const height = window.getComputedStyle(element).getPropertyValue('height');
        let animation = element.animate(
            { height: [height, 0] },
            { duration: ms },
        );
        // set to once cuz the finish will trigger only once per animation
        animation.addEventListener('finish', () => {
            element.style.display = 'none';
            element.classList.remove('is-visible');
            element.dataset.animating = 'false';
            animation = null;
        }, { once: true });
    },
};

export default slide;