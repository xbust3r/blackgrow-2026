document.querySelectorAll('.js-newsletter').forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.querySelector('.js-newsletter-status').textContent = 'Preview only. Newsletter registration is not connected yet.';
    });
});
