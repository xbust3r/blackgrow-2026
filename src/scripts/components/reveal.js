const reveal = {
    init() {
        const elements = document.querySelectorAll('.js-reveal');
        if (!elements.length) return;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (prefersReducedMotion) return;

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('opacity-0', 'translate-y-6');
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            },
        );

        elements.forEach((element) => {
            element.classList.add(
                'transition-all',
                'duration-700',
                'ease-out',
                'opacity-0',
                'translate-y-6',
            );
            observer.observe(element);
        });
    },
};

reveal.init();

export default reveal;
