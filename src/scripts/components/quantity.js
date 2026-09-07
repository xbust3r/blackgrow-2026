class QuantityStepper {
    constructor(container) {
        this.container = container;
        this.input = container.querySelector('input[type="number"]');
        this.btnDown = container.querySelector('.js-quantity-down');
        this.btnUp = container.querySelector('.js-quantity-up');

        if (!this.input || !this.btnDown || !this.btnUp) return;

        this.btnDown.addEventListener('click', () => this.stepDown());
        this.btnUp.addEventListener('click', () => this.stepUp());
    }

    stepDown() {
        const min = this.input.min !== '' ? parseFloat(this.input.min) : 1;
        const step = this.input.step !== '' ? parseFloat(this.input.step) : 1;
        const current = parseFloat(this.input.value) || min;

        if (current - step >= min) {
            this.input.value = current - step;
            this.dispatchEvents();
        }
    }

    stepUp() {
        const max = this.input.max !== '' ? parseFloat(this.input.max) : Infinity;
        const step = this.input.step !== '' ? parseFloat(this.input.step) : 1;
        const current = parseFloat(this.input.value) || 0;

        if (current + step <= max) {
            this.input.value = current + step;
            this.dispatchEvents();
        }
    }

    dispatchEvents() {
        this.input.dispatchEvent(new Event('input', { bubbles: true }));
        this.input.dispatchEvent(new Event('change', { bubbles: true }));
    }
}

const initQuantitySteppers = () => {
    document
        .querySelectorAll('.js-quantity')
        .forEach((container) => new QuantityStepper(container));
};

initQuantitySteppers();

export default QuantityStepper;
