/**
 * Filtros de entrada.
 *
 * Restringen lo que se puede teclear; no validan. Que un campo sólo acepte
 * dígitos no dice nada de si tiene los cinco que hacen falta: eso es asunto de
 * `forms.js`. Los dos hacen falta y no se sustituyen.
 *
 * El hook se declara desde el mixin `field` con la opción `filter`.
 */
import IMask from 'imask';

const mascaras = {
    'js-only-letters': { mask: /^(?!\s)[\p{L}\s']*$/u },
    'js-only-numbers': { mask: /^[0-9]*$/ },
    'js-only-alphanumeric': { mask: /^(?!\s)[\p{L}\p{Nd}][\p{L}\p{Nd} ]*$/u },
    'js-only-phone': { mask: '000-000-0000' },
    'js-no-leading-space': { mask: /^(?!\s).*/ },
    'js-only-date': {
        mask: Date,
        lazy: true,
        pattern: 'm{/}d{/}Y',
        format: (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');

            return [month, day, date.getFullYear()].join('/');
        },
        parse: (str) => {
            const [month, day, year] = str.split('/');

            return new Date(year, month - 1, day);
        },
    },
};

for (const [hook, opciones] of Object.entries(mascaras)) {
    document.querySelectorAll(`.${hook}`).forEach((campo) => IMask(campo, opciones));
}

// El correo no lleva máscara —cualquier regla razonable rechaza una dirección
// válida rara—, pero sí conviene impedir el espacio, que es el error real.
document.querySelectorAll('input[type="email"]').forEach((campo) => {
    campo.addEventListener('keydown', (evento) => {
        if (evento.key === ' ') evento.preventDefault();
    });
});
