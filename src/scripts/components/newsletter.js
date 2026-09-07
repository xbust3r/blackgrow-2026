/**
 * El newsletter no tiene destino todavía.
 *
 * La validación la hace `forms.js` a través del hook `js-form`; esto sólo se
 * ocupa del mensaje. Comprueba la validez antes de hablar: anunciar «recibido»
 * sobre un formulario que `forms.js` acaba de marcar en rojo sería mentir.
 */
document.querySelectorAll('.js-newsletter').forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) return;

        form.querySelector('.js-newsletter-status').textContent =
            'Preview only. Newsletter registration is not connected yet.';
    });
});
