/**
 * Validación de formularios con la API nativa.
 *
 * El navegador ya sabe si un campo cumple `required`, `type`, `minlength` y
 * `pattern`. Lo que no hace bien es el mensaje —lo pinta en una burbuja que se
 * cierra sola, no se puede estilar y no la anuncia un lector de pantalla—, así
 * que se le quita esa parte con `novalidate` y se conserva todo lo demás.
 *
 * Se apoya en el marcado que genera el mixin `field`: cada control tiene un
 * `aria-describedby` que apunta a su párrafo de error.
 */

const MENSAJES = {
    'en-US': {
        valueMissing: 'This field is required.',
        typeMismatch: 'Please check the format.',
        tooShort: 'This value is too short.',
        patternMismatch: 'Please check the format.',
        email: 'Please enter a valid email address.',
        tel: 'Please enter a 10-digit phone number.',
        resumen: 'Please review the highlighted fields.',
    },
    'es-US': {
        valueMissing: 'Este campo es obligatorio.',
        typeMismatch: 'Revisa el formato.',
        tooShort: 'El valor es demasiado corto.',
        patternMismatch: 'Revisa el formato.',
        email: 'Introduce un correo electrónico válido.',
        tel: 'Introduce un teléfono de 10 dígitos.',
        resumen: 'Revisa los campos marcados.',
    },
};

const idioma = document.documentElement.lang in MENSAJES ? document.documentElement.lang : 'en-US';
const textos = MENSAJES[idioma];

class Formulario {
    constructor(formulario) {
        this.formulario = formulario;
        this.campos = [...formulario.elements].filter((campo) => campo.willValidate);
        this.boton = formulario.querySelector('[type="submit"]');
        this.enviando = false;
        this.intentado = false;

        // Sólo ahora, desde JavaScript: sin él el navegador debe seguir
        // validando por su cuenta.
        formulario.noValidate = true;

        formulario.addEventListener('submit', (evento) => this.alEnviar(evento));

        for (const campo of this.campos) {
            // Antes del primer intento no se corrige a nadie: marcar en rojo un
            // campo que todavía se está escribiendo es la forma más rápida de
            // que alguien abandone el formulario.
            campo.addEventListener('blur', () => this.intentado && this.revisar(campo));
            campo.addEventListener('input', () => this.intentado && this.revisar(campo));
        }
    }

    mensaje(campo) {
        const { validity } = campo;

        if (validity.valid) return '';
        if (validity.valueMissing) return textos.valueMissing;
        if (validity.typeMismatch) return textos[campo.type] || textos.typeMismatch;
        if (validity.tooShort) return textos[campo.type] || textos.tooShort;
        if (validity.patternMismatch) return textos.patternMismatch;

        return campo.validationMessage;
    }

    revisar(campo) {
        const texto = this.mensaje(campo);
        const error = document.getElementById(campo.getAttribute('aria-describedby'));

        campo.setAttribute('aria-invalid', texto ? 'true' : 'false');

        if (error) {
            error.textContent = texto;
            error.hidden = !texto;
            error.classList.toggle('hidden', !texto);
        }

        return !texto;
    }

    alEnviar(evento) {
        this.intentado = true;

        // Doble envío: el guardia va antes que la validación, porque el segundo
        // clic llega con el formulario ya correcto.
        if (this.enviando) {
            evento.preventDefault();

            return;
        }

        const invalidos = this.campos.filter((campo) => !this.revisar(campo));

        if (invalidos.length) {
            evento.preventDefault();
            invalidos[0].focus();

            return;
        }

        // El `action` vacío es el estado de partida del core: no hay destino
        // todavía. Enviar a la propia página simula un éxito que no existe.
        if (!this.formulario.getAttribute('action')) {
            evento.preventDefault();

            // La consola es el único sitio donde señalar esto sin mentirle a
            // quien está rellenando el formulario.
            // eslint-disable-next-line no-console
            console.warn('El formulario no tiene `action`: falta el destino real en `config.pug`.');

            return;
        }

        this.enviando = true;
        this.boton?.setAttribute('disabled', '');
        this.boton?.querySelector('.js-button-loader')?.classList.remove('hidden');
    }
}

document.querySelectorAll('.js-form').forEach((formulario) => new Formulario(formulario));
