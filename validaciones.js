document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const comentarios = document.getElementById("comentarios");
    const contador = document.getElementById("contador");

    form.addEventListener("submit", (event) => {
        let isValid = true;
        let errorCount = 0;

        // Sección A - Datos del Viaje
        const destino = document.getElementById("destino");
        if (!destino.value || (destino.value === "otro" && !document.getElementById("otro-destino").value.trim())) {
            isValid = false;
            errorCount++;
            showError(destino, "Debe seleccionar un destino válido.");
        }

        const paquete = form.querySelector("input[name='paquete']:checked");
        if (!paquete) {
            isValid = false;
            errorCount++;
            showError(document.querySelector("input[name='paquete']"), "Seleccione un paquete.");
        }

        const fechaSalida = document.getElementById("fecha-salida");
        const fechaRegreso = document.getElementById("fecha-regreso");
        const hoy = new Date();
        const fechaSalidaDate = new Date(fechaSalida.value);
        const fechaRegresoDate = new Date(fechaRegreso.value);

        if (!fechaSalida.value || fechaSalidaDate <= hoy || fechaSalidaDate < new Date(hoy.setDate(hoy.getDate() + 7))) {
            isValid = false;
            errorCount++;
            showError(fechaSalida, "La fecha de salida debe ser al menos 7 días a partir de hoy.");
        }

        if (!fechaRegreso.value || fechaRegresoDate <= fechaSalidaDate) {
            isValid = false;
            errorCount++;
            showError(fechaRegreso, "La fecha de regreso debe ser posterior a la fecha de salida.");
        }

        const duracion = document.getElementById("duracion");
        if (!duracion.value) {
            isValid = false;
            errorCount++;
            showError(duracion, "Debe seleccionar una duración.");
        }

        const puertoSalida = document.getElementById("puerto-salida");
        const otroPuerto = document.getElementById("otro-puerto");
        if (puertoSalida.value === "otro" && !otroPuerto.value.trim()) {
            isValid = false;
            errorCount++;
            showError(otroPuerto, "Debe especificar la ciudad de salida.");
        }

        // Sección B - Datos de los Pasajeros
        const adultos = document.getElementById("adultos");
        const menores = document.getElementById("menores");
        if (adultos.value < 1 || adultos.value > 10) {
            isValid = false;
            errorCount++;
            showError(adultos, "La cantidad de adultos debe ser entre 1 y 10.");
        }

        if (menores.value < 0 || menores.value > 8 || parseInt(menores.value) > parseInt(adultos.value) * 2) {
            isValid = false;
            errorCount++;
            showError(menores, "La cantidad de menores no puede superar el doble de adultos.");
        }

        const nombre = document.getElementById("nombre");
        if (!/^[a-zA-Z\s]{5,80}$/.test(nombre.value)) {
            isValid = false;
            errorCount++;
            showError(nombre, "El nombre debe contener solo letras y espacios (5-80 caracteres).");
        }

        const documento = document.getElementById("documento");
        if (!/^[a-zA-Z0-9]{7,12}$/.test(documento.value)) {
            isValid = false;
            errorCount++;
            showError(documento, "El número de pasaporte o DNI debe ser alfanumérico (7-12 caracteres).");
        }

        const fechaNacimiento = document.getElementById("fecha-nacimiento");
        const nacimientoDate = new Date(fechaNacimiento.value);
        if (!fechaNacimiento.value || new Date().getFullYear() - nacimientoDate.getFullYear() < 18) {
            isValid = false;
            errorCount++;
            showError(fechaNacimiento, "El pasajero principal debe ser mayor de 18 años.");
        }

        const email = document.getElementById("email");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            isValid = false;
            errorCount++;
            showError(email, "Debe ingresar un correo electrónico válido.");
        }

        const telefono = document.getElementById("telefono");
        if (!/^[\d\s\-\+]{8,}$/.test(telefono.value)) {
            isValid = false;
            errorCount++;
            showError(telefono, "El teléfono debe contener al menos 8 dígitos y puede incluir +, -, o espacios.");
        }

        const necesidadesEspeciales = document.querySelector("input[name='necesidades-especiales']");
        const detallesNecesidades = document.getElementById("detalles-necesidades");
        if (necesidadesEspeciales.checked && !detallesNecesidades.value.trim()) {
            isValid = false;
            errorCount++;
            showError(detallesNecesidades, "Debe detallar las necesidades especiales.");
        }

        // Sección C - Preferencias
        const habitacion = form.querySelector("input[name='habitacion']:checked");
        if (!habitacion) {
            isValid = false;
            errorCount++;
            showError(document.querySelector("input[name='habitacion']"), "Debe seleccionar un tipo de habitación.");
        }

        const regimenComidas = document.getElementById("regimen-comidas");
        if (!regimenComidas.value) {
            isValid = false;
            errorCount++;
            showError(regimenComidas, "Debe seleccionar un régimen de comidas.");
        }

        const presupuesto = document.getElementById("presupuesto");
        if (!presupuesto.value) {
            isValid = false;
            errorCount++;
            showError(presupuesto, "Debe seleccionar un presupuesto estimado.");
        }

        // Sección D - Confirmación
        if (comentarios.value.length > 300) {
            isValid = false;
            errorCount++;
            showError(comentarios, "Los comentarios no pueden superar los 300 caracteres.");
        }

        const terminos = document.querySelector("input[name='terminos']");
        const privacidad = document.querySelector("input[name='privacidad']");
        if (!terminos.checked) {
            isValid = false;
            errorCount++;
            showError(terminos, "Debe aceptar los términos y condiciones.");
        }
        if (!privacidad.checked) {
            isValid = false;
            errorCount++;
            showError(privacidad, "Debe aceptar la política de privacidad.");
        }

        // Mostrar resumen de errores
        if (!isValid) {
            event.preventDefault();
            alert(`Se encontraron ${errorCount} campos con errores. Por favor, corríjalos antes de continuar.`);
            document.querySelector(".campo-error").scrollIntoView({ behavior: "smooth" });
        } else {
            event.preventDefault();
            mostrarConfirmacion();
        }
    });

    // Mostrar mensaje de confirmación
    function mostrarConfirmacion() {
        const nombre = document.getElementById("nombre").value;
        const destino = document.getElementById("destino").value;
        const fechaSalida = document.getElementById("fecha-salida").value;
        const fechaRegreso = document.getElementById("fecha-regreso").value;
        const adultos = document.getElementById("adultos").value;
        const menores = document.getElementById("menores").value;
        const paquete = form.querySelector("input[name='paquete']:checked").value;

        form.style.display = "none";
        const confirmacion = document.createElement("div");
        confirmacion.innerHTML = `
            <h2>Reserva Confirmada</h2>
            <p>Gracias, ${nombre}. Su reserva para ${destino} ha sido confirmada.</p>
            <p>Fechas: ${fechaSalida} a ${fechaRegreso}</p>
            <p>Pasajeros: ${adultos} adultos, ${menores} menores</p>
            <p>Paquete: ${paquete}</p>
            <p>Número de solicitud: ${Math.floor(Math.random() * 100000)}</p>
            <button onclick="location.reload()">Hacer otra reserva</button>
            <a href="index.html">Volver al inicio</a>
        `;
        document.body.appendChild(confirmacion);
    }

    // Mostrar/ocultar campo de ciudad de salida
    document.getElementById("puerto-salida").addEventListener("change", (event) => {
        const otroPuerto = document.getElementById("otro-puerto");
        otroPuerto.style.display = event.target.value === "otro" ? "block" : "none";
    });

    // Contador de caracteres en tiempo real
    comentarios.addEventListener("input", () => {
        const length = comentarios.value.length;
        contador.textContent = `${length} / 300 caracteres`;
        if (length > 240) {
            contador.style.color = "red";
        } else if (length > 180) {
            contador.style.color = "orange";
        } else {
            contador.style.color = "black";
        }
    });

    // Función para mostrar errores
    function showError(element, message) {
        element.classList.add("campo-error");
        element.classList.remove("campo-ok");
        let error = element.nextElementSibling;
        if (!error || !error.classList.contains("error-message")) {
            error = document.createElement("span");
            error.className = "error-message";
            error.style.color = "red";
            error.textContent = message;
            element.parentNode.insertBefore(error, element.nextSibling);
        }
    }

    // Función para limpiar errores al corregir
    form.addEventListener("input", (event) => {
        const element = event.target;
        if (element.classList.contains("campo-error")) {
            element.classList.remove("campo-error");
            element.classList.add("campo-ok");
            const error = element.nextElementSibling;
            if (error && error.classList.contains("error-message")) {
                error.remove();
            }
        }
    });
});