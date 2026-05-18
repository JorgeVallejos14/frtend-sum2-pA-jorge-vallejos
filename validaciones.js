document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        let isValid = true;

        // Sección A - Datos del Viaje
        const destino = document.getElementById("destino");
        if (!destino.value || (destino.value === "otro" && !document.getElementById("otro-destino").value.trim())) {
            isValid = false;
            showError(destino, "Debe seleccionar un destino válido.");
        }

        const paquete = form.querySelector("input[name='paquete']:checked");
        if (!paquete) {
            isValid = false;
            showError(document.querySelector("input[name='paquete']"), "Seleccione un paquete.");
        }

        const fechaSalida = document.getElementById("fecha-salida");
        const fechaRegreso = document.getElementById("fecha-regreso");
        const hoy = new Date();
        const fechaSalidaDate = new Date(fechaSalida.value);
        const fechaRegresoDate = new Date(fechaRegreso.value);

        if (!fechaSalida.value || fechaSalidaDate <= hoy || fechaSalidaDate < new Date(hoy.setDate(hoy.getDate() + 7))) {
            isValid = false;
            showError(fechaSalida, "La fecha de salida debe ser al menos 7 días a partir de hoy.");
        }

        if (!fechaRegreso.value || fechaRegresoDate <= fechaSalidaDate) {
            isValid = false;
            showError(fechaRegreso, "La fecha de regreso debe ser posterior a la fecha de salida.");
        }

        const duracion = document.getElementById("duracion");
        if (!duracion.value) {
            isValid = false;
            showError(duracion, "Debe seleccionar una duración.");
        }

        const puertoSalida = document.getElementById("puerto-salida");
        const otroPuerto = document.getElementById("otro-puerto");
        if (puertoSalida.value === "otro" && !otroPuerto.value.trim()) {
            isValid = false;
            showError(otroPuerto, "Debe especificar la ciudad de salida.");
        }

        // Sección B - Datos de los Pasajeros
        const adultos = document.getElementById("adultos");
        const menores = document.getElementById("menores");
        if (adultos.value < 1 || adultos.value > 10) {
            isValid = false;
            showError(adultos, "La cantidad de adultos debe ser entre 1 y 10.");
        }

        if (menores.value < 0 || menores.value > 8 || parseInt(menores.value) > parseInt(adultos.value) * 2) {
            isValid = false;
            showError(menores, "La cantidad de menores no puede superar el doble de adultos.");
        }

        const nombre = document.getElementById("nombre");
        if (!/^[a-zA-Z\s]{5,80}$/.test(nombre.value)) {
            isValid = false;
            showError(nombre, "El nombre debe contener solo letras y espacios (5-80 caracteres).");
        }

        const documento = document.getElementById("documento");
        if (!/^[a-zA-Z0-9]{7,12}$/.test(documento.value)) {
            isValid = false;
            showError(documento, "El número de pasaporte o DNI debe ser alfanumérico (7-12 caracteres).");
        }

        const fechaNacimiento = document.getElementById("fecha-nacimiento");
        const nacimientoDate = new Date(fechaNacimiento.value);
        if (!fechaNacimiento.value || new Date().getFullYear() - nacimientoDate.getFullYear() < 18) {
            isValid = false;
            showError(fechaNacimiento, "El pasajero principal debe ser mayor de 18 años.");
        }

        const email = document.getElementById("email");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            isValid = false;
            showError(email, "Debe ingresar un correo electrónico válido.");
        }

        const telefono = document.getElementById("telefono");
        if (!/^[\d\s\-\+]{8,}$/.test(telefono.value)) {
            isValid = false;
            showError(telefono, "El teléfono debe contener al menos 8 dígitos y puede incluir +, -, o espacios.");
        }

        const necesidadesEspeciales = document.querySelector("input[name='necesidades-especiales']");
        const detallesNecesidades = document.getElementById("detalles-necesidades");
        if (necesidadesEspeciales.checked && !detallesNecesidades.value.trim()) {
            isValid = false;
            showError(detallesNecesidades, "Debe detallar las necesidades especiales.");
        }

        // Sección C - Preferencias
        const habitacion = form.querySelector("input[name='habitacion']:checked");
        if (!habitacion) {
            isValid = false;
            showError(document.querySelector("input[name='habitacion']"), "Debe seleccionar un tipo de habitación.");
        }

        const regimenComidas = document.getElementById("regimen-comidas");
        if (!regimenComidas.value) {
            isValid = false;
            showError(regimenComidas, "Debe seleccionar un régimen de comidas.");
        }

        const presupuesto = document.getElementById("presupuesto");
        if (!presupuesto.value) {
            isValid = false;
            showError(presupuesto, "Debe seleccionar un presupuesto estimado.");
        }

        // Sección D - Confirmación
        const comentarios = document.getElementById("comentarios");
        if (comentarios.value.length > 300) {
            isValid = false;
            showError(comentarios, "Los comentarios no pueden superar los 300 caracteres.");
        }

        const terminos = document.querySelector("input[name='terminos']");
        const privacidad = document.querySelector("input[name='privacidad']");
        if (!terminos.checked) {
            isValid = false;
            showError(terminos, "Debe aceptar los términos y condiciones.");
        }
        if (!privacidad.checked) {
            isValid = false;
            showError(privacidad, "Debe aceptar la política de privacidad.");
        }

        // Evitar el envío si hay errores
        if (!isValid) {
            event.preventDefault();
        }
    });

    function showError(element, message) {
        element.classList.add("campo-error");
        element.classList.remove("campo-ok");
        alert(message); // Puedes reemplazar esto con un mensaje más elegante en el DOM
    }
});