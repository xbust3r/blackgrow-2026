const userNavigation = {
    keyboard(event) {
        if (event.key !== 'Tab') return;
        document.documentElement.classList.add('is-using-keyboard');
        document.removeEventListener('keydown', this.keyboard);
        document.addEventListener('mousedown', this.mouse);
    },
    mouse() {
        document.documentElement.classList.remove('is-using-keyboard');
        document.removeEventListener('mousedown', this.mouse);
        document.addEventListener('keydown', this.keyboard);
    },
    init() {
        this.keyboard = this.keyboard.bind(this);
        this.mouse = this.mouse.bind(this);
        document.addEventListener('keydown', this.keyboard);
    },
};

userNavigation.init();