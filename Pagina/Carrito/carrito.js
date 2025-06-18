let mesActual = new Date().getMonth();
let anioActual = new Date().getFullYear();

const hoy = new Date();
hoy.setHours(0, 0, 0, 0); 

function obtenerPrecioBase(mes) {
  const mesesVerano = [5, 6, 7];
  const precioBase = 119.46;
  return mesesVerano.includes(mes)
    ? (precioBase * 1.3).toFixed(2)
    : precioBase.toFixed(2);
}

function generarCalendario(mes, anio) {
  const calendario = document.getElementById("calendario");
  const nombreMes = document.getElementById("mes-actual");

  const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const primerDia = new Date(anio, mes, 1);
  const ultimoDia = new Date(anio, mes + 1, 0);
  const diasMes = ultimoDia.getDate();

  let diaInicio = primerDia.getDay(); // 0 (Dom) a 6 (Sáb)
  diaInicio = (diaInicio + 6) % 7; // Ajuste para que lunes sea 0, domingo 6

  nombreMes.textContent = `${nombresMeses[mes]} ${anio}`;
  calendario.innerHTML = "";

  // Espacios vacíos antes del primer día
  for (let i = 0; i < diaInicio; i++) {
    calendario.innerHTML += "<div></div>";
  }

  const precioPorDia = obtenerPrecioBase(mes);

  for (let dia = 1; dia <= diasMes; dia++) {
    const fecha = new Date(anio, mes, dia);
    fecha.setHours(0, 0, 0, 0);

    let clase = "";
    let contenido = "";

    if (fecha < hoy) {
      clase = "pasado";
      contenido = `${dia}`;
    } else {
      clase = "activo";
      contenido = `${dia}<br>$${precioPorDia}`;
    }

    calendario.innerHTML += `<div class="${clase}">${contenido}</div>`;
  }
}

// Botones de navegación
document.getElementById("btn-anterior").addEventListener("click", () => {
  mesActual--;
  if (mesActual < 0) {
    mesActual = 11;
    anioActual--;
  }
  generarCalendario(mesActual, anioActual);
});

document.getElementById("btn-siguiente").addEventListener("click", () => {
  mesActual++;
  if (mesActual > 11) {
    mesActual = 0;
    anioActual++;
  }
  generarCalendario(mesActual, anioActual);
});

function validarFormulario(event) {
    event.preventDefault(); // Evita la acción predeterminada

    const nombre = document.getElementById("nombre").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const email = document.getElementById("email").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const codigo = document.getElementById("codigo").value.trim();

    // Expresiones regulares para validaciones
    const nombreRegex = /^[A-Za-z\s]+$/; // Solo letras y espacios
    const dniRegex = /^\d{7,8}$/; // Entre 7 y 8 dígitos numéricos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email válido
    const tarjetaRegex = /^\d{16}$/; // 16 dígitos
    const fechaRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/AA (01-12)
    const cvvRegex = /^\d{3,4}$/; // 3 o 4 dígitos

    // Validaciones
    if (!nombre.match(nombreRegex)) {
        alert("Error: El nombre solo debe contener letras y espacios.");
        window.location.href = "error-de-pago.html";
        return;
    }

    if (!dni.match(dniRegex)) {
        alert("Error: El DNI debe tener entre 7 y 8 dígitos numéricos.");
        window.location.href = "error-de-pago.html";
        return;
    }

    if (!email.match(emailRegex)) {
        alert("Error: El email ingresado no es válido.");
        window.location.href = "error-de-pago.html";
        return;
    }

    if (!numero.match(tarjetaRegex)) {
        alert("Error: El número de tarjeta debe contener exactamente 16 dígitos.");
        window.location.href = "error-de-pago.html";
        return;
    }

    if (!fecha.match(fechaRegex)) {
        alert("Error: La fecha de vencimiento debe estar en formato MM/AA.");
        window.location.href = "error-de-pago.html";
        return;
    }

    if (!codigo.match(cvvRegex)) {
        alert("Error: El CVV debe contener 3 o 4 dígitos.");
        window.location.href = "error-de-pago.html";
        return;
    }

    // Si pasa todas las validaciones
    alert("Pago procesado con éxito.");
    window.location.href = "confirmacion-pago.html";
}

// Generar calendario inicial
generarCalendario(mesActual, anioActual);

// funcion para aceptar o denegar una oferta 
function aceptarOferta() {
  const oferta = document.getElementById("oferta");
  if (oferta) {
    oferta.classList.remove("oculto");
    oferta.classList.add("visible");
  }
}

// Selección de un solo día activo
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("activo")) {
    // Desmarcar cualquier otro día previamente seleccionado
    document.querySelectorAll(".activo.seleccionado").forEach(el => {
      el.classList.remove("seleccionado");
    });

    // Marcar el día clickeado
    e.target.classList.add("seleccionado");
  }
});